/**
 * Google Apps Script code to handle security alerts subscriptions
 * This script connects a form submission to a Google Sheet
 * 
 * To use this:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Deploy as a web app (Publish > Deploy as web app)
 *    - Set "Who has access" to "Anyone, even anonymous"
 *    - Set "Execute the app as" to "Me"
 * 5. Copy the web app URL and use it in your application
 */

// Sheet names
const SHEET_NAME = "Subscribers";

// Initialize and setup the spreadsheet when the web app is first deployed
function doGet() {
  return HtmlService.createHtmlOutput(
    "The security alerts subscription service is running. This URL endpoint accepts POST requests."
  );
}

/**
 * Process the subscription form submission
 * @param {Object} e - The event object from the form submission
 * @return {Object} - Response object with success status and message
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = new Date();
    
    // Validate email format
    if (!validateEmail(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Invalid email format"
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    if (emailExists(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: true,
          message: "Email already subscribed"
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the subscription to the spreadsheet
    addSubscription(email, timestamp);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Subscription successful"
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error("Error processing subscription: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error processing your request"
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Validate email format using regex
 * @param {string} email - The email to validate
 * @return {boolean} - Whether the email is valid
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Check if the email already exists in the spreadsheet
 * @param {string} email - The email to check
 * @return {boolean} - Whether the email exists
 */
function emailExists(email) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return true;
    }
  }
  
  return false;
}

/**
 * Add a new subscription to the spreadsheet
 * @param {string} email - The subscriber's email
 * @param {Date} timestamp - The subscription timestamp
 */
function addSubscription(email, timestamp) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    email,
    timestamp,
    "Active", // Subscription status
    "Web Form" // Source
  ]);
}

/**
 * Get the subscribers sheet or create it if it doesn't exist
 * @return {GoogleAppsScript.Spreadsheet.Sheet} - The sheet object
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Create the sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // Add header row
    sheet.appendRow([
      "Email",
      "Subscription Date",
      "Status",
      "Source"
    ]);
    
    // Format header row
    sheet.getRange(1, 1, 1, 4)
      .setFontWeight("bold")
      .setBackground("#4285F4")
      .setFontColor("white");
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Adjust column widths
    sheet.setColumnWidth(1, 250); // Email
    sheet.setColumnWidth(2, 180); // Date
    sheet.setColumnWidth(3, 120); // Status
    sheet.setColumnWidth(4, 150); // Source
  }
  
  return sheet;
}

/**
 * Send security alert to all active subscribers
 * Can be triggered manually or via time-based trigger
 * @param {string} subject - The email subject
 * @param {string} message - The email message body
 */
function sendSecurityAlert(subject, message) {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const email = data[i][0];
    const status = data[i][2];
    
    // Only send to active subscribers
    if (status === "Active") {
      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: message
        });
        
        // Log the sent email
        sheet.getRange(i + 1, 5).setValue(new Date()); // Last email sent date
      } catch (error) {
        console.error("Error sending email to " + email + ": " + error.toString());
      }
    }
  }
}

/**
 * Create a time-triggered function to check for security alerts
 * Set this up to run daily or weekly
 */
function setupTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "checkForSecurityAlerts") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create a new trigger to run daily
  ScriptApp.newTrigger("checkForSecurityAlerts")
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
}

/**
 * Example function to check for security alerts
 * In a real system, this would query an API or database
 */
function checkForSecurityAlerts() {
  // This is a placeholder function
  // In a real implementation, you would:
  // 1. Check an API for new security alerts/breaches
  // 2. Format the alerts into an email
  // 3. Call sendSecurityAlert() with the relevant information
  
  // Example implementation:
  const subject = "NeoSafe Security Alert: New Data Breach Detected";
  const message = `
    <h1>Security Alert: New Data Breach</h1>
    <p>Dear subscriber,</p>
    <p>A data breach has been detected that may affect you. A popular service has reported unauthorized access to user data.</p>
    <h2>What You Should Do:</h2>
    <ul>
      <li>Change your passwords on affected services</li>
      <li>Enable two-factor authentication where available</li>
      <li>Monitor your accounts for suspicious activity</li>
    </ul>
    <p>For more information, visit <a href="https://neosafe.com/security-news">our security news page</a>.</p>
    <p>Stay safe,<br>The NeoSafe Team</p>
    <p style="font-size: 12px; color: #666;">
      To unsubscribe from these alerts, <a href="https://neosafe.com/unsubscribe?email={email}">click here</a>.
    </p>
  `;
  
  // Uncomment to actually send alerts
  // sendSecurityAlert(subject, message);
}
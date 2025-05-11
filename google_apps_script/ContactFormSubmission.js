/**
 * Google Apps Script code to handle Contact form submissions
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
const SHEET_NAME = "Contact Form Submissions";

// Initialize and setup the spreadsheet when the web app is first deployed
function doGet() {
  return HtmlService.createHtmlOutput(
    "The contact form submission service is running. This URL endpoint accepts POST requests."
  );
}

/**
 * Process the contact form submission
 * @param {Object} e - The event object from the form submission
 * @return {Object} - Response object with success status and message
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const { name, email, subject, message } = data;
    const timestamp = new Date();
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "All fields are required"
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Validate email format
    if (!validateEmail(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Invalid email format"
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the submission to the spreadsheet
    addSubmission(name, email, subject, message, timestamp);
    
    // Send email notification to admin (optional)
    sendNotificationEmail(name, email, subject, message);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Form submitted successfully"
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error and return error response
    console.error("Error processing form submission: " + error.toString());
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
 * Add a new submission to the spreadsheet
 * @param {string} name - The submitter's name
 * @param {string} email - The submitter's email
 * @param {string} subject - The subject of the message
 * @param {string} message - The message content
 * @param {Date} timestamp - The submission timestamp
 */
function addSubmission(name, email, subject, message, timestamp) {
  const sheet = getOrCreateSheet();
  sheet.appendRow([
    timestamp,
    name,
    email,
    subject,
    message,
    "New" // Status (New, In Progress, Resolved, etc.)
  ]);
}

/**
 * Get the submissions sheet or create it if it doesn't exist
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
      "Timestamp",
      "Name",
      "Email",
      "Subject",
      "Message",
      "Status"
    ]);
    
    // Format header row
    sheet.getRange(1, 1, 1, 6)
      .setFontWeight("bold")
      .setBackground("#4285F4")
      .setFontColor("white");
    
    // Freeze header row
    sheet.setFrozenRows(1);
    
    // Adjust column widths
    sheet.setColumnWidth(1, 180); // Timestamp
    sheet.setColumnWidth(2, 150); // Name
    sheet.setColumnWidth(3, 200); // Email
    sheet.setColumnWidth(4, 200); // Subject
    sheet.setColumnWidth(5, 400); // Message
    sheet.setColumnWidth(6, 120); // Status
    
    // Set text wrapping for message column
    sheet.getRange("E2:E").setWrap(true);
  }
  
  return sheet;
}

/**
 * Send an email notification to the admin
 * @param {string} name - The submitter's name
 * @param {string} email - The submitter's email
 * @param {string} subject - The subject of the message
 * @param {string} message - The message content
 */
function sendNotificationEmail(name, email, subject, message) {
  // Replace with your admin email
  const adminEmail = "admin@neosafe.com";
  
  const emailSubject = "New Contact Form Submission: " + subject;
  const emailBody = `
    <h2>New Contact Form Submission</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <div style="padding: 10px; border-left: 3px solid #ccc; margin-bottom: 15px;">
      ${message.replace(/\n/g, '<br/>')}
    </div>
    <p>You can view all submissions in the <a href="${SpreadsheetApp.getActiveSpreadsheet().getUrl()}">Google Sheet</a>.</p>
  `;
  
  try {
    MailApp.sendEmail({
      to: adminEmail,
      subject: emailSubject,
      htmlBody: emailBody,
      replyTo: email
    });
  } catch (error) {
    console.error("Error sending notification email: " + error.toString());
    // Continue processing even if email fails - the data is still saved to the sheet
  }
}

/**
 * Create a function to export submissions as CSV
 * Can be run manually from the script editor
 */
function exportSubmissionsAsCsv() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  let csvContent = "";
  
  // Add each row to CSV content
  data.forEach(row => {
    // Format message content for CSV (escape quotes, remove newlines)
    const formattedRow = row.map(cell => {
      if (typeof cell === 'string') {
        // Replace double quotes with two double quotes (CSV standard)
        return `"${cell.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
      } else if (cell instanceof Date) {
        return `"${cell.toISOString()}"`;
      } else {
        return `"${cell}"`;
      }
    });
    
    csvContent += formattedRow.join(',') + '\n';
  });
  
  // Create a file in Google Drive
  const fileName = `Contact_Form_Submissions_${new Date().toISOString().slice(0, 10)}.csv`;
  const file = DriveApp.createFile(fileName, csvContent, MimeType.CSV);
  
  // Get the URL to download the file
  const fileUrl = file.getUrl();
  
  // Log the URL (you can access this from the script execution log)
  console.log(`CSV export created: ${fileUrl}`);
  
  return fileUrl;
}

/**
 * Set up a trigger to run exportSubmissionsAsCsv weekly
 * This can be useful for automatic backups
 */
function setupWeeklyExportTrigger() {
  // Delete any existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "exportSubmissionsAsCsv") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Create a new trigger to run weekly
  ScriptApp.newTrigger("exportSubmissionsAsCsv")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(1)
    .create();
}
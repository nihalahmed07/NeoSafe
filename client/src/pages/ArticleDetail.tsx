import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';

// Article type definition
interface Article {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: string;
  content: string;
}

export default function ArticleDetail() {
  const [location] = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Extract article ID from URL path
    const articleId = location.split('/').pop();
    
    // In a real app, fetch the article from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      // This simulates API data - in a real app you would fetch this
      const mockArticle: Article = {
        id: Number(articleId),
        title: getMockTitle(Number(articleId)),
        date: getMockDate(Number(articleId)),
        category: getMockCategory(Number(articleId)),
        summary: getMockSummary(Number(articleId)),
        content: getMockContent(Number(articleId))
      };
      
      setArticle(mockArticle);
      setLoading(false);
    }, 500);
  }, [location]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article not found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the article you're looking for.
          </p>
          <Link href="/security-news">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer">
              Back to News
            </span>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/security-news">
          <span className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 cursor-pointer">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to News
          </span>
        </Link>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                article.category === 'Breach Alert' ? 'bg-red-100 text-red-800' :
                article.category === 'Threat Warning' ? 'bg-yellow-100 text-yellow-800' :
                article.category === 'Security Update' ? 'bg-blue-100 text-blue-800' :
                article.category === 'Research' ? 'bg-purple-100 text-purple-800' :
                article.category === 'Regulation' ? 'bg-gray-100 text-gray-800' :
                'bg-green-100 text-green-800'
              }`}>
                {article.category}
              </span>
              <span className="text-gray-500 text-sm">{article.date}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h1>
            
            <div className="border-b border-gray-200 mb-6 pb-6">
              <p className="text-gray-700 font-medium">{article.summary}</p>
            </div>
            
            <div className="prose max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Share this article</h3>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800">
                  Twitter
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  LinkedIn
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  Facebook
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-800 mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-4">
            Subscribe to our security alert service to receive timely notifications about data breaches and security threats.
          </p>
          <Link href="/security-news">
            <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer">
              Subscribe to Alerts
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper functions to generate mock data based on article ID
function getMockTitle(id: number): string {
  const titles = [
    "Major Data Breach Affects 500,000 Users",
    "New Phishing Campaign Targets Banking Customers",
    "Critical Security Update Released for Popular Browser",
    "Study Shows Rise in Ransomware Attacks Against Small Businesses",
    "Government Issues New Data Protection Guidelines",
    "Password Manager Service Strengthens Security Features"
  ];
  return titles[id - 1] || "Article Title";
}

function getMockDate(id: number): string {
  const dates = [
    "May 8, 2025",
    "May 5, 2025",
    "April 30, 2025",
    "April 28, 2025",
    "April 25, 2025",
    "April 20, 2025"
  ];
  return dates[id - 1] || "May 10, 2025";
}

function getMockCategory(id: number): string {
  const categories = [
    "Breach Alert",
    "Threat Warning",
    "Security Update",
    "Research",
    "Regulation",
    "Product News"
  ];
  return categories[id - 1] || "News";
}

function getMockSummary(id: number): string {
  const summaries = [
    "A popular social media platform disclosed a data breach affecting approximately 500,000 users. Exposed information includes email addresses and hashed passwords.",
    "Security researchers have identified a sophisticated phishing campaign targeting customers of major banks. The emails mimic legitimate bank communications and attempt to steal login credentials.",
    "Developers have released an urgent security patch for a widely used web browser, fixing a vulnerability that could allow remote code execution. Users are advised to update immediately.",
    "A new cybersecurity report reveals a 40% increase in ransomware attacks targeting small businesses in the first quarter of 2025. The report highlights the importance of regular backups and security training.",
    "Federal agencies have released updated guidelines for data protection and privacy. The new framework includes stricter requirements for organizations handling sensitive personal information.",
    "A leading password manager service has announced enhanced security features, including improved encryption standards and additional authentication options for users."
  ];
  return summaries[id - 1] || "Article summary";
}

function getMockContent(id: number): string {
  // Extended content for each article
  const contents = [
    // Article 1: Major Data Breach
    `A major social media platform has disclosed a significant data breach affecting approximately 500,000 users worldwide. The company announced yesterday that unauthorized access to their user database occurred between March 15 and April 2, 2025.

According to the official statement, the exposed information includes email addresses, usernames, and hashed passwords. The company has stated that no financial information or private messages were compromised in the breach.

The breach was discovered during a routine security audit when the security team identified unusual access patterns to their user database. The company has since patched the vulnerability that allowed the unauthorized access and has reset passwords for all affected accounts.

"We take the security and privacy of our users very seriously," said the company's Chief Security Officer in a statement. "We have immediately implemented additional security measures and are working with law enforcement agencies to investigate this incident."

Security experts recommend that users of the platform change their passwords immediately, not only on the affected platform but also on any other sites where they may have used the same or similar passwords. Users should also be vigilant about potential phishing attempts that might leverage the stolen information.

The incident has been reported to relevant data protection authorities, and the company is offering free identity theft protection services to all affected users for one year.

This breach follows a string of similar incidents in the tech industry, highlighting the ongoing challenges companies face in protecting user data against increasingly sophisticated cyber attacks.`,

    // Article 2: Phishing Campaign
    `Cybersecurity researchers have uncovered a sophisticated phishing campaign targeting customers of major banks across North America and Europe. The campaign, which began approximately two weeks ago, uses highly convincing emails that mimic legitimate bank communications.

The phishing emails contain urgent messages about "security updates" or "suspicious activities" on the recipients' accounts, prompting them to click on links that lead to fraudulent websites designed to steal login credentials and personal information.

What makes this campaign particularly dangerous is the level of sophistication in the fake websites, which closely replicate the actual banking websites, including security certificates that can make them appear legitimate at first glance.

"This is one of the most convincing phishing campaigns we've seen in recent months," said Dr. Eleanor Chen, head of threat intelligence at CyberShield Research. "The attackers have invested significant resources in creating authentic-looking websites and communications that could fool even tech-savvy users."

The researchers have identified several indicators that can help users spot these fraudulent emails:

1. The sender's email address, while appearing legitimate at first glance, contains subtle misspellings or unusual domains
2. The emails create a false sense of urgency, pushing recipients to act immediately
3. Hovering over links in the emails reveals suspicious URLs that don't match the official bank domains
4. The messages often contain minor grammatical errors or unusual phrasing

Banking institutions are working with cybersecurity firms to take down these fraudulent websites and are warning customers about the campaign. Users are advised never to click on links in unexpected emails claiming to be from their banks, and instead to access their accounts directly through the official banking website or mobile app.

If you suspect you may have fallen victim to this phishing campaign, experts recommend immediately changing your banking passwords and contacting your financial institution to report potential fraud.`,

    // Article 3: Browser Security Update
    `Developers of one of the world's most popular web browsers have released an urgent security patch addressing a critical vulnerability that could allow attackers to execute malicious code remotely on users' devices.

The security flaw, identified as CVE-2025-3842, affects all versions of the browser released in the past 18 months across Windows, macOS, and Linux operating systems. The vulnerability was discovered by security researcher Marcus Wong, who reported it through the browser's bug bounty program.

According to the security advisory released yesterday, the vulnerability is a use-after-free error in the browser's JavaScript engine that could be exploited to execute arbitrary code on a victim's computer. The flaw is particularly concerning because it could be triggered simply by visiting a malicious website, without requiring any additional user interaction.

"This type of vulnerability is especially dangerous because it requires minimal user action to exploit," explained Wong. "An attacker only needs to lure a victim to visit a specially crafted webpage to potentially take control of their device."

The browser's development team has classified the vulnerability as "critical" — their highest severity rating — and is strongly urging all users to update their browsers immediately.

Users can update their browsers by navigating to the settings menu and selecting "About [Browser Name]," which will automatically check for and install the latest version. Alternatively, users can download the updated version directly from the browser's official website.

Enterprise IT administrators are encouraged to push this update to all managed devices as soon as possible. The browser developers have confirmed that there is evidence this vulnerability is already being exploited in the wild in targeted attacks.

This security update also includes fixes for several other less severe vulnerabilities, making it even more important for users to update promptly.`,

    // Article 4: Ransomware Report
    `A comprehensive cybersecurity report released today reveals a troubling 40% increase in ransomware attacks targeting small businesses during the first quarter of 2025 compared to the same period last year.

The report, published by DataGuard Analytics, analyzed data from over 3,000 security incidents affecting businesses with fewer than 500 employees across various sectors. Small businesses in healthcare, professional services, and retail were identified as the most frequently targeted.

According to the findings, the average ransom demand has also increased significantly, now standing at approximately $150,000 — up from $80,000 in early 2024. Even more concerning, the report indicates that 68% of small businesses that paid ransoms were unable to recover all of their data despite complying with attackers' demands.

"Small businesses continue to be attractive targets for ransomware operators because they often lack robust security measures and dedicated IT security personnel," said Rebecca Torres, chief analyst at DataGuard. "The misconception that small businesses aren't valuable targets is unfortunately leaving many vulnerable to these attacks."

The report highlights several key factors contributing to the rise in attacks:

1. Increased adoption of remote work arrangements with inadequate security protocols
2. Growing sophistication of ransomware-as-a-service (RaaS) offerings on the dark web, making it easier for less technically skilled criminals to launch attacks
3. Insufficient employee security training and awareness programs
4. Inadequate backup solutions and recovery planning

The analysis also found that businesses that implemented regular data backups, conducted security awareness training, and maintained up-to-date systems were significantly less likely to suffer major operational disruptions from ransomware attacks.

DataGuard recommends that small businesses implement several key protective measures:

- Regular, tested, offline backups of critical data
- Multi-factor authentication for all business accounts
- Security awareness training for all employees
- Endpoint protection solutions
- Incident response planning

"The most effective protection against ransomware is preparation," Torres emphasized. "With proper planning and basic security measures, small businesses can significantly reduce both their risk of being targeted and the potential impact if an attack occurs."`,

    // Article 5: Data Protection Guidelines
    `Federal agencies have jointly released a comprehensive update to data protection guidelines, introducing stricter requirements for organizations that collect, process, or store personal information. The new framework, which takes effect in six months, aims to enhance privacy protections and establish clearer accountability for data security.

The updated guidelines, developed collaboratively by the Federal Trade Commission, the Department of Commerce, and the Cybersecurity and Infrastructure Security Agency (CISA), represent the most significant overhaul of data protection standards in nearly a decade.

"As data collection becomes increasingly complex and pervasive in our digital economy, it's essential that our regulatory framework evolves to address new challenges and technologies," said FTC Commissioner Eleanor Park during the announcement. "These guidelines provide organizations with clear direction while ensuring stronger protections for consumers."

Key provisions of the new guidelines include:

1. Enhanced consent requirements: Organizations must obtain explicit, informed consent before collecting sensitive personal information, with periodic renewal of consent for ongoing data collection.

2. Data minimization principles: Companies are required to limit data collection to information that is necessary and relevant for specified purposes, and must establish clear retention policies with mandatory deletion of data that no longer serves a legitimate business purpose.

3. Security assessment requirements: Organizations handling significant volumes of personal data must conduct regular security risk assessments and implement appropriate safeguards based on the sensitivity and volume of information they handle.

4. Incident response protocols: The guidelines establish standardized notification timelines and procedures in the event of data breaches, with stricter requirements for incidents involving sensitive personal information.

5. Algorithmic transparency: Organizations using automated decision-making systems that affect individuals must be able to explain how these systems work and ensure they don't result in discriminatory outcomes.

Industry response to the new guidelines has been mixed. While privacy advocates have welcomed the stronger protections, some business groups have expressed concerns about implementation costs, particularly for smaller organizations.

To address these concerns, the guidelines include a tiered approach based on organizational size and the volume of personal data processed, with simplified requirements for small businesses. Additionally, the agencies will provide technical assistance, templates, and educational resources to help organizations achieve compliance.

Organizations have six months to align their practices with the new guidelines before enforcement begins. The FTC has indicated that it will initially focus on education and corrective action rather than penalties, but serious or repeated violations will face significant consequences.`,

    // Article 6: Password Manager Update
    `A leading password management service has announced a significant security upgrade to its platform, introducing advanced encryption technologies and additional authentication options for users. The update, which will roll out to all users over the next month, aims to further strengthen protection of sensitive login credentials in an increasingly complex threat landscape.

The password manager's new security features include:

1. Enhanced encryption: The service is transitioning to a more robust encryption algorithm that provides improved protection against brute force attacks while maintaining performance. This update includes an optional feature for users to implement quantum-resistant encryption for critical passwords.

2. Passwordless authentication options: Users can now choose from multiple authentication methods beyond the traditional master password, including biometric verification, hardware security keys, and a new authenticator app developed by the company.

3. Real-time breach monitoring: The platform will now actively scan for compromised credentials across the dark web and provide immediate alerts to users if their stored passwords appear in known data breaches.

4. Secure password sharing: An improved secure sharing feature allows users to share login information with trusted contacts without revealing the actual password. The system now includes time-limited access options and detailed access logs.

5. Advanced security dashboard: The updated user interface includes a comprehensive security dashboard that provides personalized recommendations for improving password hygiene and identifying potential vulnerabilities.

"As cyber threats evolve, so must the tools we use to protect our digital identities," said the password manager's Chief Technology Officer. "These enhancements represent our commitment to staying ahead of emerging threats while ensuring our service remains intuitive and accessible."

The company emphasized that the transition to the new encryption system will be seamless for users, with no need to reset existing passwords. However, users will be encouraged to enable the additional authentication options for maximum security.

Security experts have responded positively to the announcement. "These improvements address several key vulnerabilities that have been concerns in password management systems," noted Dr. Marcus Chen, a cybersecurity researcher at the Digital Privacy Institute. "Particularly important is the move toward passwordless authentication options, which can significantly reduce the risk of credential theft."

The password manager service, which currently has over 15 million users worldwide, is offering free trials of its premium features during the rollout period to encourage users to explore and implement the new security options.`
  ];
  
  return contents[id - 1] || "Detailed article content will appear here.";
}
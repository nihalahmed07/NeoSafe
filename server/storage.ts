import { 
  Breach, 
  InsertBreach, 
  CompromisedData, 
  InsertCompromisedData,
  PasswordPrefix,
  InsertPasswordPrefix,
  BreachSearchResult,
  PasswordCheckResult,
  PhoneSearchResult
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Basic CRUD operations for users (from template)
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Breach-related operations
  findBreachesByEmailHash(emailHash: string): Promise<BreachSearchResult>;
  findBreachesByPhoneHash(phoneHash: string): Promise<PhoneSearchResult>;
  findPasswordHashesByPrefix(prefix: string): Promise<{ suffixes: string[], counts: number[] }>;
  
  getBreach(id: number): Promise<Breach | undefined>;
  getBreaches(): Promise<Breach[]>;
  addBreach(breach: InsertBreach): Promise<Breach>;
  
  // Compromised data operations
  getCompromisedData(id: number): Promise<CompromisedData | undefined>;
  addCompromisedData(data: InsertCompromisedData): Promise<CompromisedData>;
  
  // Password prefix operations
  getPasswordPrefix(prefix: string): Promise<PasswordPrefix | undefined>;
  addPasswordPrefix(data: InsertPasswordPrefix): Promise<PasswordPrefix>;
  
  // Demo data initialization
  initializeDemoData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private breaches: Map<number, Breach>;
  private compromisedData: Map<number, CompromisedData>;
  private passwordPrefixes: Map<string, PasswordPrefix>;
  private emailHashes: Map<string, number[]>; // Email hash -> breach IDs
  private phoneHashes: Map<string, number[]>; // Phone hash -> breach IDs
  
  currentId: number;
  breachId: number;
  compromisedDataId: number;

  constructor() {
    this.users = new Map();
    this.breaches = new Map();
    this.compromisedData = new Map();
    this.passwordPrefixes = new Map();
    this.emailHashes = new Map();
    this.phoneHashes = new Map();
    
    this.currentId = 1;
    this.breachId = 1;
    this.compromisedDataId = 1;
  }

  // User operations (from template)
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Breach operations
  async getBreach(id: number): Promise<Breach | undefined> {
    return this.breaches.get(id);
  }
  
  async getBreaches(): Promise<Breach[]> {
    return Array.from(this.breaches.values());
  }
  
  async addBreach(insertBreach: InsertBreach): Promise<Breach> {
    const id = this.breachId++;
    const breach: Breach = { ...insertBreach, id };
    this.breaches.set(id, breach);
    return breach;
  }
  
  // Search operations
  async findBreachesByEmailHash(emailHash: string): Promise<BreachSearchResult> {
    const breachIds = this.emailHashes.get(emailHash) || [];
    
    if (breachIds.length === 0) {
      return {
        found: false,
        breaches: [],
        count: 0
      };
    }
    
    const breaches = breachIds
      .map(id => this.breaches.get(id))
      .filter(breach => breach !== undefined) as Breach[];
    
    return {
      found: true,
      breaches,
      count: breaches.length
    };
  }
  
  async findBreachesByPhoneHash(phoneHash: string): Promise<PhoneSearchResult> {
    const breachIds = this.phoneHashes.get(phoneHash) || [];
    
    if (breachIds.length === 0) {
      return {
        found: false,
        breaches: [],
        count: 0
      };
    }
    
    const breaches = breachIds
      .map(id => this.breaches.get(id))
      .filter(breach => breach !== undefined) as Breach[];
    
    return {
      found: true,
      breaches,
      count: breaches.length
    };
  }
  
  async findPasswordHashesByPrefix(prefix: string): Promise<{ suffixes: string[], counts: number[] }> {
    const passwordPrefix = this.passwordPrefixes.get(prefix);
    
    if (!passwordPrefix) {
      return {
        suffixes: [],
        counts: []
      };
    }
    
    return {
      suffixes: passwordPrefix.suffixes,
      counts: passwordPrefix.counts
    };
  }
  
  // Compromised data operations
  async getCompromisedData(id: number): Promise<CompromisedData | undefined> {
    return this.compromisedData.get(id);
  }
  
  async addCompromisedData(insertData: InsertCompromisedData): Promise<CompromisedData> {
    const id = this.compromisedDataId++;
    const data: CompromisedData = { ...insertData, id };
    this.compromisedData.set(id, data);
    
    // Update indexes based on data type
    if (insertData.dataType === 'email') {
      this.emailHashes.set(insertData.dataHash, insertData.breachIds);
    } else if (insertData.dataType === 'phone') {
      this.phoneHashes.set(insertData.dataHash, insertData.breachIds);
    }
    
    return data;
  }
  
  // Password prefix operations
  async getPasswordPrefix(prefix: string): Promise<PasswordPrefix | undefined> {
    return this.passwordPrefixes.get(prefix);
  }
  
  async addPasswordPrefix(insertData: InsertPasswordPrefix): Promise<PasswordPrefix> {
    const data: PasswordPrefix = { ...insertData, id: 0 }; // ID is not used for lookups
    this.passwordPrefixes.set(insertData.prefix, data);
    return data;
  }
  
  // Initialize demo data for testing
  async initializeDemoData(): Promise<void> {
    // Only initialize if no data exists
    if (this.breaches.size > 0) {
      return;
    }
    
    // Add some demo breaches
    const adobeBreach = await this.addBreach({
      name: "Adobe",
      title: "Adobe",
      domain: "adobe.com",
      breachDate: "2013-10",
      addedDate: "2013-12-04",
      modifiedDate: "2022-05-15",
      pwnCount: 153000000,
      description: "In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text.",
      logoPath: "",
      dataClasses: ["Email addresses", "Password hints", "Passwords", "Usernames"],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false
    });
    
    const linkedinBreach = await this.addBreach({
      name: "LinkedIn",
      title: "LinkedIn",
      domain: "linkedin.com",
      breachDate: "2012-05",
      addedDate: "2016-05-21",
      modifiedDate: "2020-12-10",
      pwnCount: 164611595,
      description: "In May 2016, LinkedIn had 164 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later.",
      logoPath: "",
      dataClasses: ["Email addresses", "Passwords"],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false
    });
    
    const myfitnesspalBreach = await this.addBreach({
      name: "MyFitnessPal",
      title: "MyFitnessPal",
      domain: "myfitnesspal.com",
      breachDate: "2018-02",
      addedDate: "2018-03-29",
      modifiedDate: "2019-10-04",
      pwnCount: 143606147,
      description: "In February 2018, the diet and exercise service MyFitnessPal suffered a data breach. The incident exposed 144 million unique email addresses alongside usernames, IP addresses and passwords stored as SHA-1 and bcrypt hashes.",
      logoPath: "",
      dataClasses: ["Email addresses", "IP addresses", "Passwords", "Usernames"],
      isVerified: true,
      isFabricated: false,
      isSensitive: false,
      isRetired: false,
      isSpamList: false
    });
    
    const targetBreach = await this.addBreach({
      name: "Target",
      title: "Target",
      domain: "target.com",
      breachDate: "2013-11",
      addedDate: "2013-12-19",
      modifiedDate: "2014-02-12",
      pwnCount: 40000000,
      description: "In November 2013, Target suffered a data breach that exposed 40 million customer credit card accounts. The breach involved malware on the point-of-sale system and led to the exposure of customer names, card numbers, expiration dates, and CVV codes.",
      logoPath: "",
      dataClasses: ["Credit cards", "Customer names", "Phone numbers"],
      isVerified: true,
      isFabricated: false,
      isSensitive: true,
      isRetired: false,
      isSpamList: false
    });
    
    // Add example compromised data (with real data, these would be properly hashed values)
    
    // Example email hashes (in a real system these would be SHA-1 hashes of actual emails)
    await this.addCompromisedData({
      dataType: "email",
      dataHash: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8", // hash of "password"
      breachIds: [adobeBreach.id, linkedinBreach.id]
    });
    
    await this.addCompromisedData({
      dataType: "email",
      dataHash: "5f4dcc3b5aa765d61d8327deb882cf99", // hash of "password"
      breachIds: [myfitnesspalBreach.id]
    });
    
    // Example phone hashes
    await this.addCompromisedData({
      dataType: "phone",
      dataHash: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3", // hash of "test"
      breachIds: [targetBreach.id]
    });
    
    // Example password prefixes for k-anonymity
    await this.addPasswordPrefix({
      prefix: "5BAA6", // First 5 chars of SHA-1 hash of "password"
      suffixes: ["1E4C9B93F3F0682250B6CF8331B7EE68FD8", "1E4C9B93F3F0682250B6CF8331B7EE68FD9"],
      counts: [3730471, 5]
    });
    
    await this.addPasswordPrefix({
      prefix: "5F4DC", // First 5 chars of MD5 hash of "password"
      suffixes: ["C3B5AA765D61D8327DEB882CF99", "C3B5AA765D61D8327DEB882CF98"],
      counts: [2538984, 12]
    });
    
    await this.addPasswordPrefix({
      prefix: "D033E", // First 5 chars of SHA-1 hash of "admin"
      suffixes: ["22AE348AEB5660FC2140AEC35850C4DA997", "22AE348AEB5660FC2140AEC35850C4DA998"],
      counts: [1523537, 8]
    });
    
    await this.addPasswordPrefix({
      prefix: "7C222", // First 5 chars of SHA-1 hash of "12345678"
      suffixes: ["FB2927D828AF22F592134E8932480637C0D"], // Rest of the hash
      counts: [2938728]
    });
    
    console.log(`Demo data initialized with ${this.breaches.size} breaches`);
  }
}

export const storage = new MemStorage();

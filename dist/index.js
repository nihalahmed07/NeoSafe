// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  breaches;
  compromisedData;
  passwordPrefixes;
  emailHashes;
  // Email hash -> breach IDs
  phoneHashes;
  // Phone hash -> breach IDs
  currentId;
  breachId;
  compromisedDataId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.breaches = /* @__PURE__ */ new Map();
    this.compromisedData = /* @__PURE__ */ new Map();
    this.passwordPrefixes = /* @__PURE__ */ new Map();
    this.emailHashes = /* @__PURE__ */ new Map();
    this.phoneHashes = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.breachId = 1;
    this.compromisedDataId = 1;
  }
  // User operations (from template)
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Breach operations
  async getBreach(id) {
    return this.breaches.get(id);
  }
  async getBreaches() {
    return Array.from(this.breaches.values());
  }
  async addBreach(insertBreach) {
    const id = this.breachId++;
    const breach = { ...insertBreach, id };
    this.breaches.set(id, breach);
    return breach;
  }
  // Search operations
  async findBreachesByEmailHash(emailHash) {
    const breachIds = this.emailHashes.get(emailHash) || [];
    if (breachIds.length === 0) {
      return {
        found: false,
        breaches: [],
        count: 0
      };
    }
    const breaches = breachIds.map((id) => this.breaches.get(id)).filter((breach) => breach !== void 0);
    return {
      found: true,
      breaches,
      count: breaches.length
    };
  }
  async findBreachesByPhoneHash(phoneHash) {
    const breachIds = this.phoneHashes.get(phoneHash) || [];
    if (breachIds.length === 0) {
      return {
        found: false,
        breaches: [],
        count: 0
      };
    }
    const breaches = breachIds.map((id) => this.breaches.get(id)).filter((breach) => breach !== void 0);
    return {
      found: true,
      breaches,
      count: breaches.length
    };
  }
  async findPasswordHashesByPrefix(prefix) {
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
  async getCompromisedData(id) {
    return this.compromisedData.get(id);
  }
  async addCompromisedData(insertData) {
    const id = this.compromisedDataId++;
    const data = { ...insertData, id };
    this.compromisedData.set(id, data);
    if (insertData.dataType === "email") {
      this.emailHashes.set(insertData.dataHash, insertData.breachIds);
    } else if (insertData.dataType === "phone") {
      this.phoneHashes.set(insertData.dataHash, insertData.breachIds);
    }
    return data;
  }
  // Password prefix operations
  async getPasswordPrefix(prefix) {
    return this.passwordPrefixes.get(prefix);
  }
  async addPasswordPrefix(insertData) {
    const data = { ...insertData, id: 0 };
    this.passwordPrefixes.set(insertData.prefix, data);
    return data;
  }
  // Initialize demo data for testing
  async initializeDemoData() {
    if (this.breaches.size > 0) {
      return;
    }
    const adobeBreach = await this.addBreach({
      name: "Adobe",
      title: "Adobe",
      domain: "adobe.com",
      breachDate: "2013-10",
      addedDate: "2013-12-04",
      modifiedDate: "2022-05-15",
      pwnCount: 153e6,
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
      pwnCount: 4e7,
      description: "In November 2013, Target suffered a data breach that exposed 40 million customer credit card accounts. The breach involved malware on the point-of-sale system and led to the exposure of customer names, card numbers, expiration dates, and CVV codes.",
      logoPath: "",
      dataClasses: ["Credit cards", "Customer names", "Phone numbers"],
      isVerified: true,
      isFabricated: false,
      isSensitive: true,
      isRetired: false,
      isSpamList: false
    });
    await this.addCompromisedData({
      dataType: "email",
      dataHash: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
      // hash of "password"
      breachIds: [adobeBreach.id, linkedinBreach.id]
    });
    await this.addCompromisedData({
      dataType: "email",
      dataHash: "5f4dcc3b5aa765d61d8327deb882cf99",
      // hash of "password"
      breachIds: [myfitnesspalBreach.id]
    });
    await this.addCompromisedData({
      dataType: "phone",
      dataHash: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
      // hash of "test"
      breachIds: [targetBreach.id]
    });
    await this.addPasswordPrefix({
      prefix: "5BAA6",
      // First 5 chars of SHA-1 hash of "password"
      suffixes: ["1E4C9B93F3F0682250B6CF8331B7EE68FD8", "1E4C9B93F3F0682250B6CF8331B7EE68FD9"],
      counts: [3730471, 5]
    });
    await this.addPasswordPrefix({
      prefix: "5F4DC",
      // First 5 chars of MD5 hash of "password"
      suffixes: ["C3B5AA765D61D8327DEB882CF99", "C3B5AA765D61D8327DEB882CF98"],
      counts: [2538984, 12]
    });
    await this.addPasswordPrefix({
      prefix: "D033E",
      // First 5 chars of SHA-1 hash of "admin"
      suffixes: ["22AE348AEB5660FC2140AEC35850C4DA997", "22AE348AEB5660FC2140AEC35850C4DA998"],
      counts: [1523537, 8]
    });
    await this.addPasswordPrefix({
      prefix: "7C222",
      // First 5 chars of SHA-1 hash of "12345678"
      suffixes: ["FB2927D828AF22F592134E8932480637C0D"],
      // Rest of the hash
      counts: [2938728]
    });
    console.log(`Demo data initialized with ${this.breaches.size} breaches`);
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  const apiRouter = app2;
  apiRouter.get("/api/breach/email/:emailHash", async (req, res) => {
    try {
      const emailHash = req.params.emailHash;
      if (!emailHash || typeof emailHash !== "string") {
        return res.status(400).json({ message: "Invalid email hash format" });
      }
      const result = await storage.findBreachesByEmailHash(emailHash);
      return res.json(result);
    } catch (error) {
      console.error("Error checking email breaches:", error);
      return res.status(500).json({ message: "Failed to check email breaches" });
    }
  });
  apiRouter.get("/api/breach/phone/:phoneHash", async (req, res) => {
    try {
      const phoneHash = req.params.phoneHash;
      if (!phoneHash || typeof phoneHash !== "string") {
        return res.status(400).json({ message: "Invalid phone hash format" });
      }
      const result = await storage.findBreachesByPhoneHash(phoneHash);
      return res.json(result);
    } catch (error) {
      console.error("Error checking phone breaches:", error);
      return res.status(500).json({ message: "Failed to check phone breaches" });
    }
  });
  apiRouter.get("/api/breach/password/:prefix", async (req, res) => {
    try {
      const prefix = req.params.prefix;
      if (!prefix || !/^[0-9A-F]{5}$/.test(prefix)) {
        return res.status(400).json({ message: "Invalid prefix format" });
      }
      const result = await storage.findPasswordHashesByPrefix(prefix);
      return res.json(result);
    } catch (error) {
      console.error("Error checking password breaches:", error);
      return res.status(500).json({ message: "Failed to check password breaches" });
    }
  });
  apiRouter.post("/api/breach", async (req, res) => {
    try {
      const breach = req.body;
      const result = await storage.addBreach(breach);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding breach:", error);
      return res.status(500).json({ message: "Failed to add breach" });
    }
  });
  apiRouter.post("/api/compromised-data", async (req, res) => {
    try {
      const data = req.body;
      const result = await storage.addCompromisedData(data);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding compromised data:", error);
      return res.status(500).json({ message: "Failed to add compromised data" });
    }
  });
  apiRouter.post("/api/password-prefix", async (req, res) => {
    try {
      const data = req.body;
      const result = await storage.addPasswordPrefix(data);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding password prefix:", error);
      return res.status(500).json({ message: "Failed to add password prefix" });
    }
  });
  apiRouter.post("/api/initialize-demo", async (req, res) => {
    try {
      await storage.initializeDemoData();
      return res.status(200).json({ message: "Demo data initialized" });
    } catch (error) {
      console.error("Error initializing demo data:", error);
      return res.status(500).json({ message: "Failed to initialize demo data" });
    }
  });
  const httpServer = createServer(app2);
  await storage.initializeDemoData();
  console.log("Demo data initialized for breach checking");
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

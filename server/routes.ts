import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import crypto from 'crypto';
import { z } from "zod";
import { BreachSearchResult, PasswordCheckResult, PhoneSearchResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  const apiRouter = app;

  // Email breach check endpoint
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

  // Phone breach check endpoint
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

  // Password breach check endpoint (k-anonymity)
  apiRouter.get("/api/breach/password/:prefix", async (req, res) => {
    try {
      const prefix = req.params.prefix;
      
      // Validate the prefix format (should be 5 hex chars)
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

  // Add breach data (admin function)
  apiRouter.post("/api/breach", async (req, res) => {
    try {
      const breach = req.body;
      
      // In a real application, this would be protected by authentication
      const result = await storage.addBreach(breach);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding breach:", error);
      return res.status(500).json({ message: "Failed to add breach" });
    }
  });

  // Add compromised data (admin function)
  apiRouter.post("/api/compromised-data", async (req, res) => {
    try {
      const data = req.body;
      
      // In a real application, this would be protected by authentication
      const result = await storage.addCompromisedData(data);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding compromised data:", error);
      return res.status(500).json({ message: "Failed to add compromised data" });
    }
  });

  // Add password hash prefix (admin function)
  apiRouter.post("/api/password-prefix", async (req, res) => {
    try {
      const data = req.body;
      
      // In a real application, this would be protected by authentication
      const result = await storage.addPasswordPrefix(data);
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error adding password prefix:", error);
      return res.status(500).json({ message: "Failed to add password prefix" });
    }
  });

  // Initialize demo data if needed
  apiRouter.post("/api/initialize-demo", async (req, res) => {
    try {
      await storage.initializeDemoData();
      return res.status(200).json({ message: "Demo data initialized" });
    } catch (error) {
      console.error("Error initializing demo data:", error);
      return res.status(500).json({ message: "Failed to initialize demo data" });
    }
  });

  const httpServer = createServer(app);
  
  // Initialize demo data on server start
  await storage.initializeDemoData();
  console.log("Demo data initialized for breach checking");

  return httpServer;
}

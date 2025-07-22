import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { promises as fs } from "fs";
import { join } from "path";

const emailSchema = z.object({
  email: z.string().email()
});

const CSV_FILE_PATH = join(process.cwd(), "waitlist_emails.csv");

// Initialize CSV file with headers if it doesn't exist
async function initializeCsvFile() {
  try {
    await fs.access(CSV_FILE_PATH);
  } catch {
    await fs.writeFile(CSV_FILE_PATH, "email,timestamp\n");
  }
}

// Check if email already exists in CSV
async function emailExists(email: string): Promise<boolean> {
  try {
    const csvContent = await fs.readFile(CSV_FILE_PATH, "utf-8");
    return csvContent.includes(email);
  } catch {
    return false;
  }
}

// Add email to CSV
async function addEmailToCsv(email: string): Promise<void> {
  const timestamp = new Date().toISOString();
  const csvRow = `"${email}","${timestamp}"\n`;
  await fs.appendFile(CSV_FILE_PATH, csvRow);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Email signup endpoint
  app.post("/api/email-signup", async (req, res) => {
    try {
      await initializeCsvFile();
      
      const validatedData = emailSchema.parse(req.body);
      
      // Check if email already exists
      if (await emailExists(validatedData.email)) {
        return res.status(400).json({ 
          message: "Email already registered for waitlist." 
        });
      }
      
      await addEmailToCsv(validatedData.email);
      
      res.json({ 
        message: "Successfully joined the waitlist!",
        email: validatedData.email 
      });
    } catch (error) {
      console.error("Email signup error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format.",
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: "An error occurred during signup. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

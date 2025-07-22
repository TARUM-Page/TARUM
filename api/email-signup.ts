import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { put, list, del } from '@vercel/blob';

const emailSchema = z.object({
  email: z.string().email()
});

// CSV file name in blob storage
const CSV_FILENAME = 'waitlist_emails.csv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = emailSchema.parse(req.body);
    
    // Get existing emails from blob storage
    let existingEmails: string[] = [];
    let csvContent = 'email,timestamp\n';
    
    try {
      // List existing blobs to find our CSV file
      const { blobs } = await list();
      const csvBlob = blobs.find(blob => blob.pathname === CSV_FILENAME);
      
      if (csvBlob) {
        // Download existing CSV content
        const response = await fetch(csvBlob.url);
        const existingContent = await response.text();
        
        // Parse existing emails (skip header)
        const lines = existingContent.split('\n').filter(line => line.trim());
        if (lines.length > 1) {
          existingEmails = lines.slice(1).map(line => {
            const [email] = line.split(',');
            return email.replace(/"/g, ''); // Remove quotes
          });
        }
        csvContent = existingContent;
      }
    } catch (error) {
      console.log('No existing CSV file found, creating new one');
    }
    
    // Check if email already exists
    if (existingEmails.includes(validatedData.email)) {
      return res.status(400).json({ 
        message: "Email already registered for waitlist." 
      });
    }
    
    // Add new email to CSV content
    const timestamp = new Date().toISOString();
    const newLine = `"${validatedData.email}","${timestamp}"\n`;
    csvContent += newLine;
    
    // Upload updated CSV to blob storage
    const { url } = await put(CSV_FILENAME, csvContent, { 
      access: 'public',
      addRandomSuffix: false // Keep the same filename
    });
    
    console.log('New waitlist signup:', validatedData.email);
    console.log('CSV updated in blob storage:', url);
    
    res.status(200).json({ 
      message: "Successfully joined the waitlist!",
      email: validatedData.email,
      csvUrl: url
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
}
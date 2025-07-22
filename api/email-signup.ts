import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email()
});

// For Vercel deployment, we'll use a simple in-memory store
// In production, you might want to use a database or external service
const waitlistEmails = new Set<string>();

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
    
    // Check if email already exists
    if (waitlistEmails.has(validatedData.email)) {
      return res.status(400).json({ 
        message: "Email already registered for waitlist." 
      });
    }
    
    // Add email to our store
    waitlistEmails.add(validatedData.email);
    
    // In a real deployment, you might want to:
    // - Save to a database
    // - Send to a mailing list service
    // - Log to external service
    console.log('New waitlist signup:', validatedData.email);
    
    res.status(200).json({ 
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
}
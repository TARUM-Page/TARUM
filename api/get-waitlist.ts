import type { VercelRequest, VercelResponse } from '@vercel/node';
import { list } from '@vercel/blob';

const CSV_FILENAME = 'waitlist_emails.csv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // List existing blobs to find our CSV file
    const { blobs } = await list();
    const csvBlob = blobs.find(blob => blob.pathname === CSV_FILENAME);
    
    if (!csvBlob) {
      return res.status(404).json({ 
        message: "No waitlist data found.",
        data: [],
        count: 0
      });
    }
    
    // Download CSV content
    const response = await fetch(csvBlob.url);
    const csvContent = await response.text();
    
    // Parse CSV data
    const lines = csvContent.split('\n').filter(line => line.trim());
    const emails: Array<{email: string, timestamp: string}> = [];
    
    if (lines.length > 1) {
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const [email, timestamp] = line.split(',').map(field => 
          field.replace(/"/g, '').trim()
        );
        
        if (email) {
          emails.push({
            email,
            timestamp: timestamp || new Date().toISOString()
          });
        }
      }
    }
    
    res.status(200).json({ 
      message: "Waitlist data retrieved successfully",
      data: emails,
      count: emails.length,
      csvUrl: csvBlob.url
    });
  } catch (error) {
    console.error("Error retrieving waitlist data:", error);
    
    res.status(500).json({ 
      message: "An error occurred while retrieving waitlist data." 
    });
  }
} 
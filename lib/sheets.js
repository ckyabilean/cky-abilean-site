// lib/sheets.js
import Papa from 'papaparse';

export async function fetchSheetData() {
  // Your published Google Sheet CSV URL
  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfdWsAb5c_064f9Us_-UviOyrqLUUuXZ6EZjetzMRWiELIAVfi5sDTJia6kB9TxddeWD8TGSeHH6c6/pub?gid=0&single=true&output=csv';
  
  try {
    // Fetch the CSV data
    const response = await fetch(SHEET_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Parse CSV to JSON using PapaParse
    const { data, errors } = Papa.parse(csvText, {
      header: true,           // Use first row as headers
      skipEmptyLines: true,   // Skip empty rows
      dynamicTyping: true     // Convert strings to numbers/booleans when possible
    });
    
    if (errors.length > 0) {
      console.error("CSV parsing errors:", errors);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
}

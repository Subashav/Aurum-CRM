/**
 * Shared utility functions for CRM data processing and formatting.
 */

/**
 * Parses CRM value strings like "₹12.4L" or "₹1.2Cr" into numeric values.
 */
export const calculateTotalValue = (value: string): number => {
  if (!value) return 0;
  
  // Normalize by removing currency symbols and commas
  const numericPart = value.replace(/[₹$,]/g, '').trim();
  
  let multiplier = 1;
  if (numericPart.endsWith('L')) {
    multiplier = 100000;
  } else if (numericPart.endsWith('Cr')) {
    multiplier = 10000000;
  }
  
  const amountStr = numericPart.replace(/Cr|L/g, '');
  const amount = parseFloat(amountStr);
  
  return isNaN(amount) ? 0 : amount * multiplier;
};

/**
 * Formats numeric values into CRM-friendly currency strings (₹, L, Cr).
 */
export const formatCurrency = (val: number): string => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
  return `₹${val.toLocaleString('en-IN')}`;
};

/**
 * Ensures follow-up dates are displayed correctly regardless of format.
 */
export const formatFollowUp = (dateStr: string): string => {
  // If it's already a friendly string like "Today 4:30 PM", return it
  if (dateStr.includes('Today') || dateStr.includes('Tomorrow') || dateStr.includes('Yesterday')) {
    return dateStr;
  }
  
  // Otherwise try to parse as date
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return date.toLocaleDateString();
};

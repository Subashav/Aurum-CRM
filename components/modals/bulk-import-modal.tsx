"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileSpreadsheet, Check, AlertCircle, Copy, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLeadsStore } from '@/lib/store/leads';
import { toast } from 'sonner';
import { cn } from '@/lib/cn';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkImportModal({ isOpen, onClose }: BulkImportModalProps) {
  const { createLead } = useLeadsStore();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [pastedData, setPastedData] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<number, string>>({});
  const [step, setStep] = useState<1 | 2>(1); // 1: Paste, 2: Map & Preview

  const leadFields = [
    { key: 'name', label: 'Lead Name' },
    { key: 'company', label: 'Company' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'role', label: 'Role/Designation' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'source', label: 'Lead Source' },
    { key: 'priority', label: 'Priority (High, Medium, Low)' },
    { key: 'stage', label: 'Pipeline Stage' },
  ];

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text) return;
    
    processText(text);
  };

  const processText = (text: string) => {
    const rows = text.split(/\r?\n/).filter(line => line.trim().length > 0).map(line => line.split('\t'));
    if (rows.length === 0) return;

    setParsedRows(rows);
    setHeaders(rows[0]);
    
    // Auto-map based on header names
    const newMapping: Record<number, string> = {};
    rows[0].forEach((header, index) => {
      const normalized = header.toLowerCase().replace(/[^a-z]/g, '');
      const match = leadFields.find(f => 
        normalized.includes(f.key.toLowerCase()) || 
        f.label.toLowerCase().includes(normalized)
      );
      if (match) newMapping[index] = match.key;
    });
    
    setMapping(newMapping);
    setStep(2);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) processText(text);
    };
    reader.readAsText(file);
  };

  React.useEffect(() => {
    if (isOpen && step === 1) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen, step]);

  const handleImport = () => {
    const importData = parsedRows.slice(1); // Skip headers
    let successCount = 0;

    importData.forEach(row => {
      const leadObj: any = {};
      Object.entries(mapping).forEach(([colIndex, fieldKey]) => {
        const val = row[parseInt(colIndex)];
        if (val) leadObj[fieldKey] = val.trim();
      });

      if (leadObj.name) {
        createLead(leadObj);
        successCount++;
      }
    });

    toast.success(`Successfully imported ${successCount} leads!`);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setPastedData('');
    setParsedRows([]);
    setHeaders([]);
    setMapping({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-card border border-border shadow-2xl rounded-3xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl aurum-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Bulk Import Leads</h2>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Step {step}: {step === 1 ? 'Paste Data' : 'Map Columns'}</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Info size={18} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">How it works</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Open your Excel or Google Sheet, select the rows you want to import (including headers), copy them (Ctrl+C), and paste them here (Ctrl+V). We'll automatically parse the columns for you.
                  </p>
                </div>
              </div>

              <div 
                className="relative group min-h-[300px] rounded-2xl border-2 border-dashed border-border hover:border-primary/40 transition-all flex flex-col items-center justify-center bg-muted/20"
                onClick={() => textareaRef.current?.focus()}
              >
                <div className="text-center space-y-4 p-12 group-hover:scale-105 transition-transform">
                  <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Paste your Excel data here</p>
                    <p className="text-xs text-muted-foreground mt-1">Click here and press Ctrl+V to paste, or</p>
                    <div className="mt-4">
                      <input 
                        type="file" 
                        accept=".csv,.txt" 
                        onChange={handleFileUpload} 
                        className="hidden" 
                        id="file-upload" 
                      />
                      <label 
                        htmlFor="file-upload"
                        className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                      >
                        Browse CSV/Text Files
                      </label>
                    </div>
                  </div>
                </div>
                <textarea 
                  ref={textareaRef}
                  className="absolute inset-0 opacity-[0.01] cursor-pointer"
                  onPaste={handlePaste}
                  onChange={(e) => processText(e.target.value)}
                  value={pastedData}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Map Columns to Lead Fields</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {headers.map((header, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase truncate">{header || `Column ${index + 1}`}</p>
                        <p className="text-xs font-semibold truncate opacity-60">Sample: {parsedRows[1]?.[index] || '-'}</p>
                      </div>
                      <select 
                        value={mapping[index] || ''}
                        onChange={(e) => setMapping({ ...mapping, [index]: e.target.value })}
                        className="bg-background border border-border rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-none"
                      >
                        <option value="">Ignore Column</option>
                        {leadFields.map(field => (
                          <option key={field.key} value={field.key}>{field.label}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Preview (First 3 Rows)</h4>
                <div className="border border-border rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-muted border-b border-border">
                        {headers.map((h, i) => (
                          <th key={i} className="px-4 py-3 font-bold text-muted-foreground uppercase">{h || '-'}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {parsedRows.slice(1, 4).map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-muted-foreground truncate max-w-[150px]">{cell || '-'}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
            {step === 2 && (
              <>
                <Check size={14} className="text-emerald-500" />
                {parsedRows.length - 1} leads ready to import
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            {step === 2 && (
              <Button onClick={handleImport} className="aurum-gradient text-white font-bold px-8 shadow-lg shadow-primary/20">
                Confirm Import
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

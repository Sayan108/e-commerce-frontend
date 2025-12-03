'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { SearchBar } from './search-bar';

interface SearchDialogProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ children, open, onOpenChange }: SearchDialogProps) {
  
  return (
    <>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
            <SearchBar onSearch={() => onOpenChange(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

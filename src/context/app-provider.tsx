'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { CartProvider } from './cart-context';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

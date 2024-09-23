"use client"

import React, { createContext, useContext, useTransition } from 'react';

type ProductContextType = {
  isPending: boolean;
  startTransition: (callback: () => void) => void;
};

const ProductAndWordsContext = createContext<ProductContextType | undefined>(undefined);

export const useProductAndWordsContext = () => {
  const context = useContext(ProductAndWordsContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductAndWordsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <ProductAndWordsContext.Provider value={{ isPending, startTransition }}>
      {children}
    </ProductAndWordsContext.Provider>
  );
};

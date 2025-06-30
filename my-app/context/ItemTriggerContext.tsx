// 触发器上下文
"use client"
import { createContext, useContext, useState } from 'react';

const ItemTriggerContext = createContext<{
  trigger: number
  incrementTrigger: () => void
} | null>(null);

export const ItemTriggerProvider = ({ children }: { children: React.ReactNode }) => {
  const [trigger, setTrigger] = useState(0);
  const incrementTrigger = () => {
    setTrigger(trigger + 1);
  };
  return <ItemTriggerContext.Provider
     value={{ trigger, incrementTrigger }}>
    {children}
    </ItemTriggerContext.Provider>;
};

export const useItemTrigger = () => {
  const context = useContext(ItemTriggerContext);
  if (!context) {
    throw new Error('useItemTrigger must be used within a ItemTriggerProvider');
  }
  return context;
};
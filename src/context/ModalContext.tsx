import React, { createContext, useContext, useState } from 'react';
import { FoodItem } from '../types';

interface ModalContextType {
  activeFood: FoodItem | null;
  openFoodModal: (food: FoodItem) => void;
  closeFoodModal: () => void;
  isOrderSuccessModalOpen: boolean;
  openOrderSuccessModal: () => void;
  closeOrderSuccessModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeFood, setActiveFood] = useState<FoodItem | null>(null);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  const openFoodModal = (food: FoodItem) => {
    setActiveFood(food);
  };

  const closeFoodModal = () => {
    setActiveFood(null);
  };

  const openOrderSuccessModal = () => {
    setIsOrderSuccessModalOpen(true);
  };

  const closeOrderSuccessModal = () => {
    setIsOrderSuccessModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        activeFood,
        openFoodModal,
        closeFoodModal,
        isOrderSuccessModalOpen,
        openOrderSuccessModal,
        closeOrderSuccessModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

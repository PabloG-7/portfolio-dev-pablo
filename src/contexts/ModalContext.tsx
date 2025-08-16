import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isCoursesModalOpen: boolean;
  setIsCoursesModalOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isCoursesModalOpen, setIsCoursesModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{
      isCoursesModalOpen,
      setIsCoursesModalOpen
    }}>
      {children}
    </ModalContext.Provider>
  );
};
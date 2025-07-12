import { createContext, useContext, useEffect, useState } from "react";

type LoadingContextType = {
  loading: number;
  setLoading: (value: number) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loading: 0,
  setLoading: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(0);

  // Simula carregamento progressivo
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15);
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setLoading(current);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

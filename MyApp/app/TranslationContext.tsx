import React, { createContext, useState, useEffect, useContext } from "react";

// Replace with your actual backend API URL
const BACKEND_URL = "http://10.0.0.86:3000/api/translation/translate";
//const BACKEND_URL = "https://exercisebackend.duckdns.org/api/translation/translate";

interface TranslationContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (text: string) => Promise<string>;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState("en");

  const translate = async (text: string) => {
    try {
      console.log(`[Translate] POST to ${BACKEND_URL}`, {
        text,
        targetLang: language,
      });

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, targetLang: language }),
      });

      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.error("Translation Error:", error);
      return text;
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom Hook to Use Translation Context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context)
    throw new Error("useTranslation must be used within a TranslationProvider");
  return context;
};

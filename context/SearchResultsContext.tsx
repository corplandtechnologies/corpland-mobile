// SearchResultsContext.tsx
import React, { createContext, useContext, useState } from "react";

interface SearchResultsContextType {
  searchResults: any[] | null;
  setSearchResults: (results: any[]) => void;
}

const SearchResultsContext = createContext<SearchResultsContextType>({
  searchResults: [],
  setSearchResults: () => {},
});

export const SearchResultsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchResults = () => useContext(SearchResultsContext);

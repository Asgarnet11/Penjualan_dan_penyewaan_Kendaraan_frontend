import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/vehicles?search=${encodeURIComponent(searchQuery)}`);
      }
    },
    [searchQuery, router]
  );

  const setQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searchQuery,
    setSearchQuery: setQuery,
    handleSearch,
  };
}

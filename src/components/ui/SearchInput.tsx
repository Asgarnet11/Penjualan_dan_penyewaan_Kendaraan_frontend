import { useCallback } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  placeholder?: string;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  onSearch,
  placeholder = "Cari kendaraan impian Anda...",
}: SearchInputProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSearch();
      }
    },
    [onSearch]
  );

  return (
    <div className="relative group w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/50 to-teal-500/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-6 pr-20 py-5 text-base text-slate-800 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-white/30 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 focus:bg-white focus:border-emerald-200 transition-all duration-300 placeholder:text-slate-500"
        />
        <div className="absolute right-2 flex items-center gap-2">
          <div className="hidden sm:flex text-xs text-slate-400 bg-slate-100/80 px-2 py-1 rounded-md">
            Enter
          </div>
          <button
            onClick={onSearch}
            className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 group-hover:from-emerald-700 group-hover:to-teal-800"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

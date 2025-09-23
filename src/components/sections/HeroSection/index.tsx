import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  onSearch,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      <HeroContent
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
      />
    </section>
  );
}

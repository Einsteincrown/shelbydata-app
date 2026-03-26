import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageWrapper } from "@/components/PageWrapper";
import { DatasetCard } from "@/components/DatasetCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { shelbyClient } from "@/lib/shelby";
import { getFileType } from "@/lib/format";
import { Search } from "lucide-react";

const fileTypes = ["All", "CSV", "JSON", "PDF", "TXT", "Image"];

const Browse = () => {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");

  // TODO: Replace with actual account address discovery
  const { data: blobs = [], isLoading } = useQuery({
    queryKey: ["blobs", "browse"],
    queryFn: () => shelbyClient.getAccountBlobs(""),
  });

  const filtered = blobs.filter((b) => {
    const matchesSearch = b.file_name.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType === "All" || getFileType(b.file_name) === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Browse Datasets</h1>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 glass border-border/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((type) => (
              <Badge
                key={type}
                variant={activeType === type ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  activeType === type ? "gradient-primary border-0" : ""
                }`}
                onClick={() => setActiveType(type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">No datasets found</p>
            <p className="text-sm">Try adjusting your search or upload a new dataset.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((blob) => (
              <DatasetCard key={blob.blob_id} blob={blob} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Browse;

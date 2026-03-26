import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PageWrapper } from "@/components/PageWrapper";
import { DatasetCard } from "@/components/DatasetCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { shelbyClient } from "@/lib/shelby";
import { Upload } from "lucide-react";

const MyUploads = () => {
  // TODO: Get from wallet adapter
  const walletAddress: string | null = null;

  const { data: blobs = [], isLoading } = useQuery({
    queryKey: ["blobs", "my-uploads", walletAddress],
    queryFn: () => shelbyClient.getAccountBlobs(walletAddress!),
    enabled: !!walletAddress,
  });

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Uploads</h1>

        {!walletAddress ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              Connect your wallet to view your uploads.
            </p>
            <Button className="gradient-primary text-primary-foreground border-0 rounded-full px-8">
              Connect Wallet
            </Button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
        ) : blobs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg mb-2">No uploads yet</p>
            <Button asChild className="gradient-primary text-primary-foreground border-0 rounded-full px-8 mt-4">
              <Link to="/upload">Upload Your First Dataset</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blobs.map((blob) => (
              <DatasetCard key={blob.blob_id} blob={blob} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default MyUploads;

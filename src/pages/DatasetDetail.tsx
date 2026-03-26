import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageWrapper } from "@/components/PageWrapper";
import { CopyButton } from "@/components/CopyButton";
import { FileTypeIcon } from "@/components/FileTypeIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { shelbyClient } from "@/lib/shelby";
import { formatAddress, formatFileSize, formatDate, getFileType } from "@/lib/format";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

const DatasetDetail = () => {
  const { accountAddress, fileName } = useParams<{
    accountAddress: string;
    fileName: string;
  }>();
  const [downloading, setDownloading] = useState(false);

  const { data: blob, isLoading } = useQuery({
    queryKey: ["blob", accountAddress, fileName],
    queryFn: () => shelbyClient.getBlob(accountAddress!, fileName!),
    enabled: !!accountAddress && !!fileName,
  });

  const handleDownload = async () => {
    if (!blob) return;
    setDownloading(true);
    try {
      const data = await shelbyClient.downloadBlob(blob.url);
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = blob.file_name;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch {
      toast.error("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </PageWrapper>
    );
  }

  if (!blob) {
    return (
      <PageWrapper>
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-muted-foreground text-lg mb-4">Dataset not found</p>
          <Button asChild variant="outline" className="glass">
            <Link to="/browse">Back to Browse</Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const fileType = getFileType(blob.file_name);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-bold">{blob.file_name}</h1>
          <FileTypeIcon type={fileType} />
        </div>

        {/* Metadata */}
        <Card className="glass mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Uploader</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono">{formatAddress(blob.uploader)}</span>
                  <CopyButton text={blob.uploader} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">File Size</span>
                <p className="mt-1">{formatFileSize(blob.size)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Uploaded</span>
                <p className="mt-1">{formatDate(blob.created_at)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Expires</span>
                <p className="mt-1">{formatDate(blob.expiry)}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-muted-foreground">Merkle Root</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs truncate">{blob.merkle_root}</span>
                  <CopyButton text={blob.merkle_root} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <span className="text-muted-foreground">Shelby URL</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-xs text-primary truncate">{blob.url}</span>
                  <CopyButton text={blob.url} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download */}
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="gradient-primary text-primary-foreground border-0 w-full h-14 text-lg"
          style={{ animation: !downloading ? "pulse-glow 2s ease-in-out infinite" : "none" }}
        >
          {downloading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Downloading...</>
          ) : (
            <><Download className="h-5 w-5" /> Download Dataset</>
          )}
        </Button>
      </div>
    </PageWrapper>
  );
};

export default DatasetDetail;

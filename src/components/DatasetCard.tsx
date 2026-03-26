import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileTypeIcon } from "@/components/FileTypeIcon";
import { formatAddress, formatFileSize, getFileType } from "@/lib/format";
import type { BlobMetadata } from "@/lib/shelby";

export function DatasetCard({ blob }: { blob: BlobMetadata }) {
  const fileType = getFileType(blob.file_name);

  return (
    <Link to={`/dataset/${blob.uploader}/${blob.file_name}`}>
      <Card className="glass hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(330_81%_60%/0.1)] group">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <FileTypeIcon type={fileType} />
            <span className="text-xs text-muted-foreground">
              {formatFileSize(blob.size)}
            </span>
          </div>
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {blob.file_name}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatAddress(blob.uploader)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

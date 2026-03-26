import { FileText, FileJson, FileSpreadsheet, File, Image, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, { icon: typeof File; color: string }> = {
  CSV: { icon: FileSpreadsheet, color: "text-green-400" },
  JSON: { icon: FileJson, color: "text-yellow-400" },
  TXT: { icon: FileText, color: "text-blue-400" },
  PDF: { icon: FileText, color: "text-red-400" },
  Image: { icon: Image, color: "text-purple-400" },
  Excel: { icon: FileSpreadsheet, color: "text-green-500" },
  Parquet: { icon: File, color: "text-cyan-400" },
  Archive: { icon: Archive, color: "text-orange-400" },
  File: { icon: File, color: "text-muted-foreground" },
};

export function FileTypeIcon({ type }: { type: string }) {
  const config = iconMap[type] || iconMap.File;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className="gap-1 text-xs">
      <Icon className={`h-3 w-3 ${config.color}`} />
      {type}
    </Badge>
  );
}

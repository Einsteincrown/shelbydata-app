export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatAddress(address: string): string {
  if (!address) return "";
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getFileType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  const typeMap: Record<string, string> = {
    csv: "CSV",
    json: "JSON",
    txt: "TXT",
    pdf: "PDF",
    png: "Image",
    jpg: "Image",
    jpeg: "Image",
    parquet: "Parquet",
    xlsx: "Excel",
    zip: "Archive",
  };
  return typeMap[ext] || "File";
}

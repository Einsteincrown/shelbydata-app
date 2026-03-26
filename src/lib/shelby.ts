// ShelbyClient placeholder — replace with actual @shelby-protocol/sdk import when available
// For now we define a mock client interface to keep the app buildable

export interface BlobMetadata {
  blob_id: string;
  file_name: string;
  size: number;
  uploader: string;
  created_at: number;
  expiry: number;
  merkle_root: string;
  url: string;
  description?: string;
  tags?: string[];
}

class ShelbyClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getAccountBlobs(accountAddress: string): Promise<BlobMetadata[]> {
    // TODO: Replace with actual SDK call
    // return shelbyClient.coordination.getAccountBlobs(accountAddress)
    console.log("Fetching blobs for", accountAddress, "with key", this.apiKey ? "[set]" : "[not set]");
    return [];
  }

  async getBlob(accountAddress: string, fileName: string): Promise<BlobMetadata | null> {
    const blobs = await this.getAccountBlobs(accountAddress);
    return blobs.find((b) => b.file_name === fileName) || null;
  }

  async downloadBlob(url: string): Promise<Blob> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to download blob");
    return response.blob();
  }
}

const apiKey = import.meta.env.VITE_SHELBY_API_KEY || "";
export const shelbyClient = new ShelbyClient(apiKey);

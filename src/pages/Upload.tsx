import { useState, useCallback } from "react";
import { PageWrapper } from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CopyButton } from "@/components/CopyButton";
import { Upload as UploadIcon, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const steps = ["Select File", "Register On-Chain", "Upload to Shelby"];

const Upload = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);
  const [shelbyUrl, setShelbyUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (!name) setName(droppedFile.name);
    }
  }, [name]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (!name) setName(selected.name);
    }
  };

  const handleRegister = async () => {
    setUploading(true);
    // TODO: Replace with actual on-chain registration
    await new Promise((r) => setTimeout(r, 1500));
    setUploading(false);
    setCurrentStep(2);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      // TODO: Replace with actual Shelby RPC upload
      await new Promise((r) => setTimeout(r, 2000));
      setShelbyUrl("https://shelby.xyz/blob/abc123");
      setCurrentStep(3);
      toast.success("Dataset uploaded successfully! 🎉");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Upload Dataset</h1>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                  i < currentStep
                    ? "gradient-primary text-primary-foreground"
                    : i === currentStep
                    ? "border-2 border-primary text-primary"
                    : "border border-border text-muted-foreground"
                }`}
              >
                {i < currentStep ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block truncate">
                {step}
              </span>
              {i < steps.length - 1 && (
                <div className={`h-px flex-1 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 0: File selection */}
        {currentStep === 0 && (
          <Card className="glass">
            <CardContent className="p-6 space-y-6">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer ${
                  dragOver ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/50"
                }`}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <UploadIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-1">
                  {file ? file.name : "Drag & drop a file or click to browse"}
                </p>
                {file && (
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Dataset Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="my-dataset.csv"
                    className="glass border-border/50 mt-1"
                  />
                </div>
                <div>
                  <Label>Description (optional)</Label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="A short description of your dataset"
                    className="glass border-border/50 mt-1"
                  />
                </div>
                <div>
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="finance, stocks, 2024"
                    className="glass border-border/50 mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={() => setCurrentStep(1)}
                disabled={!file || !name}
                className="gradient-primary text-primary-foreground border-0 w-full"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Register */}
        {currentStep === 1 && (
          <Card className="glass">
            <CardContent className="p-6 text-center space-y-6">
              <p className="text-muted-foreground">
                Register your dataset on-chain via your connected wallet.
              </p>
              <Button
                onClick={handleRegister}
                disabled={uploading}
                className="gradient-primary text-primary-foreground border-0 px-8"
              >
                {uploading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Registering...</>
                ) : (
                  "Register On-Chain"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Upload */}
        {currentStep === 2 && (
          <Card className="glass">
            <CardContent className="p-6 text-center space-y-6">
              <p className="text-muted-foreground">
                Upload your file to Shelby's decentralized storage.
              </p>
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="gradient-primary text-primary-foreground border-0 px-8"
              >
                {uploading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                ) : (
                  "Upload to Shelby"
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Success */}
        {currentStep === 3 && (
          <Card className="glass">
            <CardContent className="p-6 text-center space-y-6">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <h2 className="text-2xl font-bold">Upload Complete!</h2>
              <div className="glass rounded-lg p-4 flex items-center justify-between gap-2">
                <code className="text-sm text-primary truncate">{shelbyUrl}</code>
                <CopyButton text={shelbyUrl} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
};

export default Upload;

import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UploadCardProps {
  onPhotoUploaded: (name: string, photoUrl: string) => void;
}

export const UploadCard = ({ onPhotoUploaded }: UploadCardProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    setShowDialog(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedFile) return;

    setIsUploading(true);

    // Convert file to data URL for immediate display
    const reader = new FileReader();
    reader.onload = (event) => {
      const photoUrl = event.target?.result as string;
      onPhotoUploaded(name.trim(), photoUrl);
      
      // Reset form
      setName("");
      setSelectedFile(null);
      setIsUploading(false);
      setShowDialog(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <Card 
        onClick={handleUploadClick}
        className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
        style={{ aspectRatio: "3/4" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
          <div className="w-28 h-28 rounded-full border-4 border-dashed border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-primary/60 group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg text-foreground">Upload Photo</p>
            <p className="text-sm text-muted-foreground mt-1">Click to add your photo</p>
          </div>
        </div>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-aura bg-clip-text text-transparent">
              Upload Your Photo
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Your Name
              </label>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Select Photo
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full"
                required
              />
            </div>
            {selectedFile && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-primary/20"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedFile.name}
                </p>
              </div>
            )}
            <Button 
              type="submit"
              disabled={!name.trim() || !selectedFile || isUploading}
              className="w-full bg-gradient-aura text-white hover:opacity-90 disabled:opacity-50"
              size="lg"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

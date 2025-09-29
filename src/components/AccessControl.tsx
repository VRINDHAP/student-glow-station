import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Lock } from "lucide-react";

interface AccessControlProps {
  onAccessGranted: () => void;
}

export const AccessControl = ({ onAccessGranted }: AccessControlProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real implementation, this would send an email to admin
    // For demo, we'll just grant access after 2 seconds
    setTimeout(() => {
      onAccessGranted();
    }, 2000);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="bg-card max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-aura flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center bg-gradient-aura bg-clip-text text-transparent">
            Access Restricted
          </DialogTitle>
          <DialogDescription className="text-center">
            This website is exclusively for CSE 77 students
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Your Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-aura text-white hover:opacity-90"
              size="lg"
            >
              Request Access
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Your request will be sent to the admin for approval
            </p>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4" />
            <p className="text-foreground font-medium">
              Access request submitted!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Granting access for demo...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

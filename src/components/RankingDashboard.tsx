import { Trophy, Music, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RankingStudent {
  rank: number;
  name: string;
  aura: number;
  photoUrl: string;
}

const mockRankings: RankingStudent[] = [
  { rank: 1, name: "Alex Johnson", aura: 95, photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  { rank: 2, name: "Sarah Smith", aura: 89, photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { rank: 3, name: "Mike Chen", aura: 85, photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { rank: 4, name: "Emma Davis", aura: 82, photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { rank: 5, name: "John Wilson", aura: 78, photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
];

export const RankingDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitCount] = useState(247);

  const handleMusicToggle = () => {
    setIsPlaying(!isPlaying);
    // In real implementation, this would control audio playback
  };

  return (
    <Card className="h-full bg-gradient-card shadow-card p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-aura bg-clip-text text-transparent">
          AURA Rankings
        </h2>
      </div>

      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Eye className="w-4 h-4" />
        <span>{visitCount} visits</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {mockRankings.map((student) => (
          <div
            key={student.rank}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-aura flex items-center justify-center text-white font-bold text-sm">
              {student.rank}
            </div>
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm">
                {student.name}
              </p>
              <p className="text-xs text-muted-foreground">
                AURA: {student.aura}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <Button
          onClick={handleMusicToggle}
          className={`w-full gap-2 ${
            isPlaying
              ? "bg-gradient-aura text-white shadow-glow"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          size="lg"
        >
          <Music className="w-5 h-5" />
          {isPlaying ? "Stop Music" : "Play Music"}
        </Button>
      </div>
    </Card>
  );
};

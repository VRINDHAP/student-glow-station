import { Trophy, Music, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RankingStudent {
  id: string;
  name: string;
  aura: number;
  photoUrl: string;
}

interface RankingDashboardProps {
  rankings: RankingStudent[];
  totalStudents: number;
}

export const RankingDashboard = ({ rankings, totalStudents }: RankingDashboardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
        <span>{totalStudents} students uploaded</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {rankings.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No students yet</p>
            <p className="text-xs mt-1">Upload photos to see rankings!</p>
          </div>
        ) : (
          rankings.map((student, index) => (
            <div
              key={student.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-aura flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
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
          ))
        )}
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

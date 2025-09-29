import { useState } from "react";
import { Heart, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StudentCardProps {
  id: string;
  name: string;
  photoUrl: string;
  initialLoves: number;
  initialHates: number;
  onVote?: (id: string, type: "love" | "hate") => void;
}

export const StudentCard = ({
  id,
  name,
  photoUrl,
  initialLoves,
  initialHates,
  onVote,
}: StudentCardProps) => {
  const calculateAura = () => {
    const total = initialLoves + initialHates;
    if (total === 0) return 0;
    return Math.round((initialLoves / total) * 100);
  };

  const handleVote = (type: "love" | "hate") => {
    onVote?.(id, type);
  };

  const aura = calculateAura();

  return (
    <Card className="relative overflow-hidden bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 p-6 flex flex-col items-center gap-4">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-aura opacity-10 rounded-full blur-2xl" />
      
      <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center">
        <h3 className="font-bold text-lg text-foreground">{name}</h3>
        <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-aura text-white font-bold text-sm shadow-glow">
          AURA: {aura}%
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <Button
          onClick={() => handleVote("love")}
          className="flex-1 bg-love hover:bg-love/90 text-white gap-2 shadow-md"
          size="lg"
        >
          <Heart className="w-4 h-4 fill-current" />
          {initialLoves}
        </Button>
        <Button
          onClick={() => handleVote("hate")}
          variant="secondary"
          className="flex-1 bg-hate hover:bg-hate/90 text-white gap-2 shadow-md"
          size="lg"
        >
          <ThumbsDown className="w-4 h-4" />
          {initialHates}
        </Button>
      </div>
    </Card>
  );
};

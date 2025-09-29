import { useState } from "react";
import { StudentCard } from "@/components/StudentCard";
import { UploadCard } from "@/components/UploadCard";
import { RankingDashboard } from "@/components/RankingDashboard";
import { AccessControl } from "@/components/AccessControl";

interface Student {
  id: string;
  name: string;
  photoUrl: string;
  loves: number;
  hates: number;
}

const Index = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const handlePhotoUpload = (name: string, photoUrl: string) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      photoUrl,
      loves: 0,
      hates: 0,
    };
    
    setStudents(prev => [...prev, newStudent]);
  };

  const handleVote = (id: string, type: "love" | "hate") => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? {
              ...student,
              loves: type === "love" ? student.loves + 1 : student.loves,
              hates: type === "hate" ? student.hates + 1 : student.hates,
            }
          : student
      )
    );
  };

  // Calculate rankings dynamically
  const rankedStudents = [...students]
    .map(student => ({
      ...student,
      aura: student.loves + student.hates > 0
        ? Math.round((student.loves / (student.loves + student.hates)) * 100)
        : 0,
    }))
    .sort((a, b) => b.aura - a.aura)
    .slice(0, 10);

  return (
    <>
      {!hasAccess && <AccessControl onAccessGranted={() => setHasAccess(true)} />}
      
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <header className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-aura bg-clip-text text-transparent mb-2">
                CSE 77 AURA Check
              </h1>
              <p className="text-muted-foreground">
                Vote for your classmates and check the AURA rankings!
              </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <UploadCard onPhotoUploaded={handlePhotoUpload} />
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  photoUrl={student.photoUrl}
                  initialLoves={student.loves}
                  initialHates={student.hates}
                  onVote={handleVote}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Rankings Dashboard */}
          <div className="w-96 border-l border-border bg-muted/20 p-6 overflow-hidden">
            <RankingDashboard rankings={rankedStudents} totalStudents={students.length} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

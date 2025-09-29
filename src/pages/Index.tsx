import { useState } from "react";
import { StudentCard } from "@/components/StudentCard";
import { UploadCard } from "@/components/UploadCard";
import { RankingDashboard } from "@/components/RankingDashboard";
import { AccessControl } from "@/components/AccessControl";

// Mock data for demonstration
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    loves: 45,
    hates: 5,
  },
  {
    id: "2",
    name: "Sarah Smith",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    loves: 38,
    hates: 6,
  },
  {
    id: "3",
    name: "Mike Chen",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    loves: 35,
    hates: 7,
  },
  {
    id: "4",
    name: "Emma Davis",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    loves: 32,
    hates: 8,
  },
  {
    id: "5",
    name: "John Wilson",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    loves: 28,
    hates: 10,
  },
  {
    id: "6",
    name: "Lisa Brown",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    loves: 25,
    hates: 12,
  },
];

const Index = () => {
  const [hasAccess, setHasAccess] = useState(false);

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
              <UploadCard />
              {mockStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  photoUrl={student.photoUrl}
                  initialLoves={student.loves}
                  initialHates={student.hates}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Rankings Dashboard */}
          <div className="w-96 border-l border-border bg-muted/20 p-6 overflow-hidden">
            <RankingDashboard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

import EncounterParticipant from "./components/ParticipantCard";
import { EncounterTable } from "./components/EncounterTable";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen p-12 sm:p-6 bg-main-bg flex items-center justify-center flex-col">
      <h1 className="text-pf-accent font-display">
        Welcome to Trackfinder!
        <EncounterParticipant />
      </h1>
      <EncounterTable />
    </div>
  );
}

export default App;

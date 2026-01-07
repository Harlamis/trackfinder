import EncounterParticipant from "./components/EncounterParticipant";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen p-12 sm:p-6 bg-main-bg flex items-center justify-center">
      <h1 className="text-pf-accent font-display">
        Welcome to Trackfinder!
        <EncounterParticipant />
      </h1>
    </div>
  );
}

export default App;

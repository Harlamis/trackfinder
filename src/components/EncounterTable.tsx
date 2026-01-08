import "../index.css";

const tableHeaders = [
  "Innitiative",
  "HP",
  "AC",
  "Conditions",
  "Comments",
  "Actions",
];

type Condition = string;
type Comment = string;

interface IParticipant {
  initiative: number;
  hp: number;
  ac: number;
  conditions: Condition[];
  comments: Comment[];
}

const participants: IParticipant[] = [
  {
    initiative: 10,
    hp: 45,
    ac: 20,
    conditions: ["some condition"],
    comments: ["some comment"],
  },
];
export function EncounterTable() {
  return (
    <table className="bg-main-card border border-amber-600">
      <thead>
        <tr className="border-b border-amber-600">
          {tableHeaders.map((header) => (
            <th
              key={header}
              className="text-pf-accent text-left p-4 font-bold uppercase text-sm"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {participants.map(
          ({ initiative, hp, ac, conditions, comments }, index) => (
            <tr key={index} className="border-b border-amber-400">
              <td className="p-4 text-pf-accent font-mono font-bold">
                {initiative}
              </td>
              <td className="p-4 text-pf-red">{hp}</td>
              <td className="p-4 text-">{ac}</td>
              <td className="p-4">{conditions}</td>
              <td className="p-4">{comments}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

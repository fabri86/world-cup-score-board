import { Team } from "@world-cup/common";

function App() {
  const sampleTeam: Team = {
    shortName: "ITA",
    flag: "",
    id: 1,
    name: "Italy",
  };

  return (
    <div className="h-screen p-10 bg-green-200">
      <div className="flex justify-center ">
        <h1 className="text-3xl text-blue-500">
          The Live World Cup Score Board
        </h1>
      </div>

      <div className="flex mt-20 gap-x-3">
        <h2>{sampleTeam.name}</h2>
        <p>({sampleTeam.shortName})</p>
      </div>
    </div>
  );
}

export default App;

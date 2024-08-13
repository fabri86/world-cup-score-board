import { TeamsList } from "./components/teams-list";
import { TeamsProvider } from "./shared/teams-context";

const App = () => (
  <TeamsProvider>
    <div className="h-screen p-10 bg-green-200">
      <div className="flex justify-center ">
        <h1 className="text-3xl text-blue-500">
          The Live World Cup Score Board
        </h1>
      </div>

      <TeamsList />
    </div>
  </TeamsProvider>
);

export default App;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GamesManager } from "./components/games-manager";
import { TeamsProvider } from "./shared/teams-context";

const App = () => (
  <TeamsProvider>
    <>
      <div className="flex flex-col h-screen px-2 py-3 bg-green-200">
        <h1 className="self-center my-4 text-4xl text-blue-500">
          The Live World Cup Score Board
        </h1>
        <GamesManager />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </>
  </TeamsProvider>
);

export default App;

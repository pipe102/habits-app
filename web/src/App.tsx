import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";
import "./styles/global.css";
import "./lib/dayjs";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { useIsAuthenticated } from "react-auth-kit";
import Navbar from "./components/Navbar";

function App() {
  const [newHabitCreated, setNewHabitCreated] = useState(false);
  const [wannaRegister, setWannaRegister] = useState(false);
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isAuthenticated() && (
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header setNewHabitCreated={setNewHabitCreated} />
          <SummaryTable newHabitCreated={newHabitCreated} />
        </div>
      )}
      {!isAuthenticated() && wannaRegister && (
        <Register setWannaRegister={setWannaRegister} />
      )}
      {!isAuthenticated() && !wannaRegister && (
        <Login setWannaRegister={setWannaRegister} />
      )}
    </div>
  );
}

export default App;

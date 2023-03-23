import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";
import "./styles/global.css";
import "./lib/dayjs";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [newHabitCreated, setNewHabitCreated] = useState(false);
  const [wannaRegister, setWannaRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isLoggedIn && (
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header setNewHabitCreated={setNewHabitCreated} />
          <SummaryTable newHabitCreated={newHabitCreated} />
        </div>
      )}
      {wannaRegister && <Register setWannaRegister={setWannaRegister} />}
      {!wannaRegister && !isLoggedIn && (
        <Login
          setWannaRegister={setWannaRegister}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

export default App;

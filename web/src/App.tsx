import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";
import "./styles/global.css";
import "./lib/dayjs";
import { useState } from "react";
import Login from "./components/Login";

//import Habit from "./components/Habit";

function App() {
  const [newHabitCreated, setNewHabitCreated] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header setNewHabitCreated={setNewHabitCreated} />
        <SummaryTable newHabitCreated={newHabitCreated} />
      </div>
      {/* <Login /> */}
    </div>
  );
}

export default App;

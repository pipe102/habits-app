import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import HabitDay from "./HabitDay";
import { useAuthHeader } from "react-auth-kit";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface SummaryTableProps {
  newHabitCreated: boolean;
}

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const SummaryTable = ({ newHabitCreated }: SummaryTableProps) => {
  const [summary, setSummary] = useState<Summary>([]);
  const authHeader = useAuthHeader();
  const token = authHeader();

  const getSummaryInfo = async () => {
    try {
      let response = await api.get("/api/habits/summary", {
        headers: {
          Authorization: token,
        },
      });
      setSummary(response.data);
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    getSummaryInfo();
  }, [newHabitCreated]);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}
        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
};

export default SummaryTable;

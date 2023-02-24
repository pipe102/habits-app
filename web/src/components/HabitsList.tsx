import { useEffect, useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { api } from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface PossibleHabits {
  id: string;
  title: string;
  created_at: string;
}

interface HabitsInfo {
  possibleHabits: PossibleHabits[];
  completedHabits: string[];
}

const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const getDayInfo = async () => {
    try {
      let response = await api.get("day", {
        params: {
          date: date.toISOString(),
        },
      });
      setHabitsInfo(response.data);
    } catch (error) {
      console.error(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    getDayInfo();
  }, []);

  const handleToggleHabit = async (habitId: string) => {
    const isHabitAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );

      setHabitsInfo({
        completedHabits,
        possibleHabits: habitsInfo!.possibleHabits,
      });
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      completedHabits,
      possibleHabits: habitsInfo!.possibleHabits,
    });

    onCompletedChange(completedHabits.length);
  };

  const isDayInPast = dayjs(date).endOf("day").isBefore(new Date());

  return (
    <div className="mt-6 flex flex-col gap-3 transition-colors">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDayInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
};

export default HabitsList;

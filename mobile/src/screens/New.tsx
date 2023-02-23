import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Checkbox from "../components/Checkbox";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const New = () => {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const handleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  };

  const handleCreateHabit = async () => {
    try {
      if (!title.trim() || weekDays.length === 0) {
        return Alert.alert(
          "Novo hábito",
          "Um novo hábito não pode conter uma string vazia e escolha a periodicidade"
        );
      }

      await api.post("habits", { title, weekDays });

      setTitle("");
      setWeekDays([]);

      Alert.alert("Novo hábito", "Hábito criado com sucesso! ✅");
    } catch (err) {
      Alert.alert("Oops", "Não foi possível criar um novo hábito");
    }
  };

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create Habit
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          What's your commitment?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="eg.: Workout, sleep well, etc.."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What's the recurrence?
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleWeekDay(index)}
          />
        ))}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateHabit}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirm
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default New;

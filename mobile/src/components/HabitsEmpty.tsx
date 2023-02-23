import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

const HabitsEmpty = () => {
  const { navigate } = useNavigation();

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorizando nenhum hábito!{" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate("new")}
      >
        Regista primeiro um!
      </Text>
    </Text>
  );
};

export default HabitsEmpty;

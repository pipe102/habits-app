import { Text, View, ScrollView } from "react-native"
import HabitDay, { DAY_SIZE } from "../components/HabitDay"
import Header from "../components/Header"

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSizes = 18 * 6 ;
const amountOfDayToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

const Home = () => {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
        <Header />
        <View className="flex-row mt-6 mb-2">
          {weekDays.map((weekDay, index) => (
            
            <Text 
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
            
          ))}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <View className="flex-row flex-wrap">
            {datesFromYearStart.map(date => (
              <HabitDay key={date.toISOString()} />
            ))}
            {amountOfDayToFill > 0 && Array.from({ length: amountOfDayToFill }).map((_, index) => (
            <View 
              key={index }
              className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
            />
          ))}
          </View>
        </ScrollView>
    </View>
  )
}

export default Home
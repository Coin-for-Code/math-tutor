import { createContext } from "react"
import { View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"

type CrossProductExerciseProps = {

}

export const ExerciseStateContext = createContext(null);

export default function CrossProductExersice() {
    <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
            <ExerciseStateContext.Provider value={null}>
                <View>
                    <Text>
                        Under construction
                    </Text>
                </View>
            </ExerciseStateContext.Provider>
        </SafeAreaView>
    </SafeAreaProvider>
}
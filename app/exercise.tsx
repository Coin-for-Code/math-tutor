import { createContext } from "react"
import {View, Text, TextInput} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import MathViewFallback from 'react-native-math-view/src/fallback';
import {SvgUri} from "react-native-svg";
import CrossProductEquation from "@/components/MathText";

type CrossProductExerciseProps = {

}

export const ExerciseStateContext = createContext(null);

export default function CrossProductExersice() {
    return (
        <SafeAreaProvider>
        <SafeAreaView style={{flex:1}}>
            <ExerciseStateContext.Provider value={null}>
                <CrossProductEquation/>
            </ExerciseStateContext.Provider>
        </SafeAreaView>
    </SafeAreaProvider>
    );
}
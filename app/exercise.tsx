import {createContext, Dispatch, MutableRefObject, useEffect, useReducer, useRef} from "react"
import {View, Text, TextInput, Button, Touchable, Pressable, Keyboard, TouchableWithoutFeedback} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import {SvgUri} from "react-native-svg";
import CrossProductExercise from "@/components/MathText";
import {Vector3D, randomVector, cross, randomInteger} from "@/utils/linear-algebra";


interface CrossProductExerciseState {
    vector1: Vector3D,
    vector2: Vector3D,
    answer: Vector3D,
    userResponse: Vector3D,
    exerciseSolutionStatus: 'unsolved' | 'solved' | 'mistake'
}

type ExerciseStateAction = {
    type: 'user-response-multi-update',
    x_value?: number,
    y_value?: number,
    z_value?: number,
} | {type: 'check-for-solution'} | {type: 'reset-exercise'} | {
    type: 'user-response-update',
    updatedCoordinateName: 'x' | 'y' | 'z',
    newValue: number
}

export const ExerciseStateContext = createContext<Dispatch<ExerciseStateAction> | null>(null);

function onExerciseStateAction(state: CrossProductExerciseState, action: ExerciseStateAction): CrossProductExerciseState{
    if(action.type==='user-response-multi-update'){
        return {
            ...state,
            userResponse: new Vector3D(
                action.x_value && Number.isInteger(action.x_value) ? action.x_value : state.userResponse.x,
                action.y_value && Number.isInteger(action.y_value) ? action.y_value : state.userResponse.y,
                action.z_value && Number.isInteger(action.z_value) ? action.z_value : state.userResponse.z
            )
        }
    } else if (action.type==="user-response-update"){
        return {
            ...state,
            userResponse: new Vector3D(
                action.updatedCoordinateName==='x' ? action.newValue : state.userResponse.x,
                action.updatedCoordinateName==='y' ? action.newValue : state.userResponse.y,
                action.updatedCoordinateName==='z' ? action.newValue : state.userResponse.z,
            )
        }
    } else if (action.type==='check-for-solution'){
        console.log(`The answer is ${state.answer.x}i + ${state.answer.y}j + ${state.answer.z}k`)
        if (state.answer.isEqual(state.userResponse)) {
            console.log(`The user solved the exercise with an answer ${state.userResponse.x}i + ${state.userResponse.y}j + ${state.userResponse.z}k`)
            return {...state, exerciseSolutionStatus: 'solved'}
        } else {
            console.log(`The user didn't solve the exercise with an answer ${state.userResponse.x}i + ${state.userResponse.y}j + ${state.userResponse.z}k`)
            return {...state, exerciseSolutionStatus: 'mistake'}
        }
    } else if (action.type==='reset-exercise'){
        console.log("Reset the exercise")
        const v1 = randomVector();
        const v2 = randomVector();
        const cross_product = cross(v1, v2);
        return {vector1: v1, vector2: v2, answer: cross_product, userResponse: new Vector3D(0,0,0), exerciseSolutionStatus: 'unsolved'}
    }
    return state;
}

function initializeExercise(): CrossProductExerciseState {
    const v1 = randomVector();
    const v2 = randomVector();
    const cross_product = cross(v1, v2);
    return {vector1: v1, vector2: v2, answer: cross_product, userResponse: new Vector3D(0,0,0), exerciseSolutionStatus: 'unsolved'}
}

export default function CrossProductExercisePage() {
    const [exerciseState, dispatch] = useReducer(onExerciseStateAction, initializeExercise())

    // useEffect(()=>{
    //     dispatch({type: 'reset-exercise'})
    //     console.log("Use Effect")
    // },[])

    let responsiveText = "Try to solve the equation!";
    if(exerciseState.exerciseSolutionStatus==='solved'){
        responsiveText = "Congratulation! You've solved the exercise!"
    } else if(exerciseState.exerciseSolutionStatus==='mistake'){
        responsiveText = "You are a such failure."
    }
    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={()=>{console.log("Touch");Keyboard.dismiss()}}>
        <SafeAreaView style={{flex:1}}>
            <ExerciseStateContext.Provider value={dispatch}>
                <Text>{responsiveText}</Text>
                <CrossProductExercise vectors={{v1: exerciseState.vector1, v2: exerciseState.vector2}}/>
                <Button title={"Check the answer"} onPress={()=>{dispatch({type:'check-for-solution'})}}/>
            </ExerciseStateContext.Provider>
        </SafeAreaView>
            </TouchableWithoutFeedback>
    </SafeAreaProvider>
    );
}
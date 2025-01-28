import {
    StyleProp,
    StyleSheet,
    TextInput,
    View,
    ViewProps,
    Text,
    ViewStyle,
    LayoutChangeEvent,
    TextInputChangeEventData,
    NativeSyntheticEvent,
    TouchableWithoutFeedback, Keyboard, TextStyle, TextInputProps
} from "react-native";
import {SvgProps, SvgUri} from "react-native-svg";
import React, {useRef, useState, useContext} from "react";
import {Layout} from "@react-navigation/elements";
import {Vector3D, randomVector, isNumber} from "@/utils/linear-algebra";
import {ExerciseStateContext} from "@/app/exercise";
import {isInteger} from "lodash";

const LaTeXRenderAPI = "https://latex.codecogs.com/svg.image"

    type MathTextProps = {
        math: string,
        // rawDimensions: { width: number, height: number },
        // parentDimensions: { width: number, height: number },
        // isParenthesis?: boolean,
} & ViewProps
/**
 * Math text element.
 * @param math LaTeX text in math mode. Backslashes need to be escaped: `\frac{a}{b}` -> `\\frac{a}{b}`
 * @param otherProps Other props to <Svg /> tag
 */
const MathText: React.FC<MathTextProps> = ({math, ...otherProps}) => {
    return <View style={{justifyContent: 'center', alignItems:'center'}} {...otherProps}><SvgUri width={'100%'} height={'100%'} uri={`${LaTeXRenderAPI}?${math}`}/></View>
}

type NumberInputsProps = {
    coordinateReturnType: 'x' | 'y' | 'z',
} & TextInputProps

const NumberInputs: React.FC<NumberInputsProps> = ({coordinateReturnType ,...otherProps}) => {
    const [text, setText] = useState("")
    const dispatch = useContext(ExerciseStateContext);
    if(dispatch===null){
        console.log("No dispatch function was passed from context to access exerciseState!");
        return <Text style={{color: 'red'}}>Error, no dispatch</Text>
    }
    return <TextInput
        onFocus={()=>{setText("")}}
        onChangeText={(text)=>{
            if (isNumber(text)) {
                console.log(`The input field is ${text}, dispatching ${!isNumber(text) ? Number(text) : 0} value to the state`);
                setText(text);
                dispatch({
                    type: 'user-response-update',
                    updatedCoordinateName: coordinateReturnType,
                    newValue: !isNaN(Number(text)) ? Number(text) : 0
                })
            }
        }}
        maxLength={4}
        enterKeyHint='next'
        autoFocus={false}
        inputMode='text'
        submitBehavior={'blurAndSubmit'}
        value={text}
        {...otherProps} />
}

type CrossProductExerciseProps = {
    vectors: {v1: Vector3D, v2: Vector3D}
} & ViewProps

export default function CrossProductExercise({vectors}: CrossProductExerciseProps) {
    const {v1, v2} = vectors

    return (
        <View style={styles.equationContainer}>
            <MathText style={{flex: 7}} math={`\\begin{pmatrix}${v1.x}\\\\${v1.y}\\\\${v1.z}\\end{pmatrix}
            \\times\\begin{pmatrix}${v2.x}\\\\${v2.y}\\\\${v2.z}\\end{pmatrix}= `}/>
            <MathText style={{flex: 1}} math={`\\Biggl(`}/>
            <View style={styles.inputsContainer}>
                <NumberInputs style={styles.numberInput} coordinateReturnType={'x'}/>
                <NumberInputs style={styles.numberInput} coordinateReturnType={'y'}/>
                <NumberInputs style={styles.numberInput} coordinateReturnType={'z'}/>
            </View>
            <MathText style={{flex: 1}} math={`\\Biggl)`}/>
        </View>
    )
}

const styles = StyleSheet.create({
    equationContainer: {
        flex:1,
        maxHeight: 200,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: "center",
    },
    latexText: {
        flex:1,
    },
    inputsContainer: {
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        rowGap: 10
    },
    numberInput: {
        flex: 1,
        backgroundColor: 'floralwhite',
        borderRadius: 4
    }
})
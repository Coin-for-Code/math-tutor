import {StyleProp, StyleSheet, TextInput, View, ViewProps, Text, ViewStyle, LayoutChangeEvent} from "react-native";
import {SvgProps, SvgUri} from "react-native-svg";
import React, {useRef, useState} from "react";
import {Layout} from "@react-navigation/elements";

const LaTeXRenderAPI = "https://latex.codecogs.com/svg.image"

    type MathTextProps = {
    math: string,
    renderHeight: number,
    parentHeight: number,
    isParenthesis?: boolean,
} & ViewProps
/**
 * Math text element.
 * @param math LaTeX text in math mode. Backslashes need to be escaped: `\frac{a}{b}` -> `\\frac{a}{b}`
 * @param otherProps Other props to <Svg /> tag
 */
const MathText: React.FC<MathTextProps> = ({math, renderHeight, parentHeight, isParenthesis=false, ...otherProps}) => {
    let scale_factor = parentHeight/renderHeight;
    console.log(scale_factor)
    return <View style={{flex:1}}><SvgUri scaleX={scale_factor} scaleY={scale_factor*(isParenthesis ? 1 : 1)} uri={`${LaTeXRenderAPI}?${math}`}/></View>
}

const RawMathText: React.FC<Omit<MathTextProps, 'renderHeight' | 'parentHeight' | 'isParenthesis'>> = ({math}) => {
    return <SvgUri uri={`${LaTeXRenderAPI}?${math}`}/>
}
// const MathText: React.FC<MathTextProps> = ({math}) => {
//
//     return <View {}><SvgUri style={{flex:1}} uri={`${LaTeXRenderAPI}?${math}`}/></View>
// }

export default function CrossProductEquation() {

    const [dimensions, setDimensions] = useState<{width:number, height:number}>({width:0, height:0})

    let v1: number[] = [2,3,4];
    let v2: number[] = [4,4,5];

    const handleDimensions = (event: LayoutChangeEvent )=> {
        const {width, height} = event.nativeEvent.layout;
        setDimensions({width, height});
        console.log(width, height)
    }

    return (
        // <View>
        // <View style={styles.container}>
        //     <RawMathText math={`\\begin{pmatrix}${v1[0]}\\\\${v1[1]}\\\\${v1[2]}\\end{pmatrix}
        //     \\times\\begin{pmatrix}${v2[0]}\\\\${v2[1]}\\\\${v2[2]}\\end{pmatrix}= `}/>
        //     <RawMathText math={`\\Biggl(`}/>
        //     <RawMathText math={`\\Biggl)`}/>
        // </View>
        <View style={[styles.container, {   backgroundColor: 'green'}]} onLayout={handleDimensions}>
            <MathText renderHeight={48} parentHeight={dimensions.height} math={`\\begin{pmatrix}${v1[0]}\\\\${v1[1]}\\\\${v1[2]}\\end{pmatrix}
            \\times\\begin{pmatrix}${v2[0]}\\\\${v2[1]}\\\\${v2[2]}\\end{pmatrix}= `}/>
            <MathText renderHeight={40} parentHeight={dimensions.height} isParenthesis={true} math={`\\Biggl(`}/>
            <MathText renderHeight={40} parentHeight={dimensions.height} isParenthesis={true} math={`\\Biggl)`}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
        height:200,
        width:300,
        backgroundColor: 'aliceblue',
        flexDirection: 'row',
        maxHeight: 200,
        justifyContent:'center',
        alignItems: "center",
    },
    latexText: {
        flex:1,
    },
    valuesView: {
        justifyContent:'space-around',
        // maxWidth: 20
    },
    numberImputs: {
        backgroundColor: 'grey',
        borderRadius: 4
    }
})
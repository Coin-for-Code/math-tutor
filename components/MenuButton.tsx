import { Href, useRouter } from 'expo-router';
import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle, TouchableHighlight, useWindowDimensions, GestureResponderEvent} from 'react-native';

type MenuButtonProps = {
    title: string,
    path: Href,
}

const buttonHeight: number = 50;

const MenuButton: React.FC<MenuButtonProps> = ({title, path}) => {
    const {width} = useWindowDimensions();
    const router = useRouter();

    const onPress = (event: GestureResponderEvent)=>{
        router.push(path);
    }

    return (
        <TouchableOpacity onPressOut={onPress}>
            <View style={[styles.exerciseButton, {width: width*0.75}]}>
                <Text style={[styles.buttonText,{color: 'white'}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: buttonHeight*0.3,
    flex:1,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  exerciseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: buttonHeight,
    borderRadius: 20,
  }
})

export default MenuButton;


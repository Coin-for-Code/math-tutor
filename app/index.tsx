import React from 'react';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LatexRenderer from '@/components/LatexRenderer';
import MenuButton from '@/components/MenuButton';
import { Button, View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ 
        flex: 1 , 
        justifyContent: 'center', 
        alignItems: 'center',
        rowGap: 25
        }}>
        <Text style={[styles.capitalText, ]}>Welcome to <Text style={[styles.capitalText, {fontWeight: 'bold'}]}>math tutor</Text></Text>
        <View style={{
          // flex: 2,
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <MenuButton path='/exercise' title='Cross product exercise' />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// TODO: Add different fonts for title and text
const styles = StyleSheet.create({
  capitalText: {
    fontSize: 50,
    includeFontPadding: false,
  },
  
})

export default App;


import React from 'react';
import { SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LatexRenderer from '@/components/LatexRenderer';
import { Button, View } from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <LatexRenderer text='\begin{pmatrix} a \\ b \end{pmatrix}'/>
        <View style={{flex:1}}><Button title='Solve the goddamn equation' /></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;


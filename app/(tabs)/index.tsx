import React from 'react';
import { SafeAreaView } from 'react-native';
import LatexRenderer from '@/components/LatexRenderer';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LatexRenderer text='\begin{pmatrix} a \\ b \end{pmatrix}' as string />
    </SafeAreaView>
  );
};

export default App;


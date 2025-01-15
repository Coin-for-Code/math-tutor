import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';

type LatexRendererProps = {text: string};

const LatexRenderer: React.FC<LatexRendererProps> = ({text}) => {
 const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MathJax in WebView</title>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #ffffff;
          color: #333;
          text-align: center;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        #id {
          position: static;
        }
      </style>
    </head>
    <body>
         <div id="math">\$$${text}\$$</div>
      <script>
        MathJax.typeset();
      </script>
    </body>
    </html>
  `; 

  return (
    <View>
      <HTML 
      source={{html: '<p>your html</p>'}}/>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LatexRenderer;


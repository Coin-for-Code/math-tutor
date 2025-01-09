import {View, Text, StyleSheet, Image, Button} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {JSX, ReactElement, ReactNode} from "react";
import Latex from "react-native-latex";

const API_URL = "http://sciencesoft.at/image/latexurl/image.png?dpi=200&src=";

function LatexText({children}: {children: string}): JSX.Element {
	return <Image source={{uri: API_URL+children}}></Image>
}

export default function App() {
	return (<SafeAreaProvider>
		<SafeAreaView style={styles.container}>
			<Text style={[styles.baseText]}>
				Math tutor
			</Text>
			<Button title={"Cross product"} />
			<Latex height={60} minHeight={10}>{"\\begin{pmatrix}a b c \\end{pmatrix}"}</Latex>
		</SafeAreaView>
	</SafeAreaProvider>)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	baseText: {
		fontWeight: 'bold',
		textAlign: "center"
	},
	innerText: {
		color: 'red',
	},
});

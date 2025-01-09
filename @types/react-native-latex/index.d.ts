import {Component, JSX} from "react";

declare module "react-native-latex" {

    // Define the props interface
    interface LatexProps {
        children: string; // Assuming children is always a string
        height: number; // Height prop
        minHeight: number; // Minimum height prop
        onLoad?: (event: any) => void; // Optional onLoad function
        style?: ImageStyle | ViewStyle; // Optional style prop
    }

// Define the state interface
    interface LatexState {
        latexURL: string; // URL for the LaTeX image
        gotSize: boolean; // Indicates if the size has been obtained
        width: number; // Width of the image
        height: number; // Height of the image
    }

    export default class Latex extends Component<LatexProps, LatexState> {
        constructor(props: LatexProps);
        componentDidMount(): void;
        onLoad: (event: Event)=>void;
        render(): JSX.Element | null;
    }


}
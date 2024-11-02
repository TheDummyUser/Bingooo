import { Dimensions } from "react-native";

export const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export const fontPixelSize = (fontSize: number) => {
    return fontSize * (screenWidth / 375);
}

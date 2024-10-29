import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const DarkTheme = {
    bg: "#2C3639",
    sBg: "#3F4E4F",
    text: "#D3D3D3",
    sText: "#F9F9F9",
    border: "#6C6C6C",
}


const LightTheme = {
    bg: "#F9F9F9",
    sBg: "#D3D3D3",
    text: "#2C3639",
    sText: "#3F4E4F",
    border: "#6C6C6C",
}

export const useTheme = () => {
    const isDarkMode = useSelector((state : RootState) => state.theme.isDarkTheme);
    return isDarkMode ? DarkTheme : LightTheme
}
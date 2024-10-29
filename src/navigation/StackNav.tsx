import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabNav } from "./BottomTab";
import StoryScreen from "@/screens/StoryScreen"
const Stack = createNativeStackNavigator();


const StackNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTab" component={BottomTabNav} />
            <Stack.Screen name="StoryScreen" component={StoryScreen} />
        </Stack.Navigator>
    );
};

export default StackNav
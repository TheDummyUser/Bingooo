import React from "react";
import { View, Platform, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Saved from "@/screens/Saved";
import TopTabNav from "./TopTabNav";
import { useTheme } from "@/utils/themes/colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const Tab_Nav = [
    { name: "TopTabNav", component: TopTabNav, ActiveIcon: "home", InactiveIcon: "home-outline", label: "Home" },
    { name: "Saved", component: Saved, ActiveIcon: "heart", InactiveIcon: "heart-outline", label: "Saved" },
];

const TabIcon = ({ name, focused, color }) => {
    const theme = useTheme();
    return (
        <View style={{ alignItems: "center", width: 30, height: 30 }}>
            {focused && (
                <View
                    style={{
                        position: 'absolute',
                        width: 60,
                        height: 30,
                        borderRadius: 18,
                        backgroundColor: color,
                        opacity: 0.2,
                    }}
                />
            )}
            <Ionicons 
                name={name} 
                size={20}
                color={focused ? color : theme.base03} 
                style={{ marginTop: 4.5 }}
            />
        </View>
    );
};

export const BottomTabNav = () => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const bottomPadding = Platform.OS === 'ios' ? insets.bottom : 16;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    const item = Tab_Nav.find(tab => tab.name === route.name);
                    if (!item) return null;
                    const iconName = focused ? item.ActiveIcon : item.InactiveIcon;
                    return <TabIcon name={iconName} focused={focused} color={color} />;
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: Platform.select({
                        ios: theme.base00,
                        android: theme.base00
                    }),
                    borderTopWidth: 1,
                    borderTopColor: Platform.select({
                        ios: 'rgba(0, 0, 0, 0.2)',
                        android: theme.base02,
                    }),
                    height: 49 + bottomPadding,
                },
                tabBarActiveTintColor: theme.base05,
                tabBarInactiveTintColor: theme.base07,
            })}
        >
            {Tab_Nav.map((item, index) => (
                <Tab.Screen
                    name={item.name}
                    component={item.component}
                    key={index}
                />
            ))}
        </Tab.Navigator>
    );
};
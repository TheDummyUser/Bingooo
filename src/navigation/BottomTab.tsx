import React, { useRef, useEffect } from "react";
import { Animated, View, Text, Platform, Dimensions } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Saved from "@/screens/Saved";
import TopTabNav from "./TopTabNav";
import { fonts } from "@/utils/themes/fonts";
import { useTheme } from "@/utils/themes/colors";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const Tab_Nav = [
    { name: "TopTabNav", component: TopTabNav, ActiveIcon: "home", InactiveIcon: "home-outline", label: "Home" },
    { name: "Saved", component: Saved, ActiveIcon: "heart", InactiveIcon: "heart-outline", label: "Saved" },
];

const AnimatedIcon = ({ name, focused, size, color } : any) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (focused) {
            Animated.parallel([
                Animated.spring(scaleValue, {
                    toValue: 1.2,
                    friction: 4,
                    tension: 40,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.spring(scaleValue, {
                    toValue: 1,
                    friction: 4,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [focused]);

    return (
        <View style={{ alignItems: "center", width: 60, height: 32 }}>
            <Animated.View
                style={{
                    position: 'absolute',
                    width: 60,
                    height: 32,
                    borderRadius: 18,
                    backgroundColor: color,
                    opacity: opacityValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0.12],
                    }),
                    transform: [{ scale: scaleValue }],
                }}
            />
            <Animated.View
                style={{
                    transform: [{ scale: scaleValue }],
                }}
            >
                <Ionicons 
                    name={name} 
                    size={20} 
                    color={focused ? color : '#8E8E93'} 
                    style={{ marginTop: 4 }}
                />
            </Animated.View>
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
                tabBarIcon: ({ focused, color, size }) => {
                    const item = Tab_Nav.find(tab => tab.name === route.name);
                    if (!item) return null;
                    const iconName = focused ? item.ActiveIcon : item.InactiveIcon;
                    return <AnimatedIcon name={iconName} focused={focused} size={size} color={color} />;
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: Platform.select({
                        ios: theme.sBg,
                        android: theme.bg
                    }),
                    borderTopWidth: 0,
                    borderTopColor: Platform.select({
                        ios: 'rgba(0, 0, 0, 0.2)',
                        android: 'rgba(0, 0, 0, 0.12)',
                    }),
                    height: 49 + bottomPadding,
                    // paddingBottom: bottomPadding,
                    // paddingTop: 8,
                    elevation: 0,
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: -3,
                            },
                            shadowOpacity: 0.05,
                            shadowRadius: 4,
                        },
                    }),
                },
                tabBarActiveTintColor: theme.text,
                tabBarInactiveTintColor: '#8E8E93',
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
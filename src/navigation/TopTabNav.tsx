import Best from "@/screens/Best";
import New from "@/screens/New";
import Top from "@/screens/Top";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { TopTabParamList, TopTabConfig } from '@/utils/types';

const Tab = createMaterialTopTabNavigator<TopTabParamList>();
import CustomTopBar from "@/navigation/CustomTopBar";

const Top_tab: TopTabConfig[] = [
    { name: "Top", component: Top },
    { name: "New", component: New },
    { name: "Best", component: Best },
] as const;

const TopTabNav = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTopBar {...props} />}>
            {Top_tab.map((item) => (
                <Tab.Screen
                    name={item.name}
                    component={item.component}
                    key={item.name}
                />
            ))}
        </Tab.Navigator>
    )
};

export default TopTabNav;
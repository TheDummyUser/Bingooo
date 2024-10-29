import Best from "@/screens/Best";
import New from "@/screens/New";
import Top from "@/screens/Top";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

const Tab = createMaterialTopTabNavigator();
import CustomTopBar from "@/navigation/CustomTopBar";

const Top_tab = [
    {name: "Top", component: Top},
    {name: "New", component: New},
    {name: "Best", component: Best},
]

const TopTabNav = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTopBar {...props} />}>
            {Top_tab.map((item, index) => (
                <Tab.Screen
                    name={item.name}
                    component={item.component}
                    key={index}
                />
            ))}
        </Tab.Navigator>
    )
};

export default TopTabNav
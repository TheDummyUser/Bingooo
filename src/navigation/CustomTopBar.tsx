import { useTheme } from "@/utils/themes/colors";
import { fonts } from "@/utils/themes/fonts";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CustomTopBar = (props: MaterialTopTabBarProps) => {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        justifyContent: "center",
        backgroundColor: theme.bg,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {props.state.routes.map((route, index) => {
          const isActive = props.state.index === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => props.navigation.navigate(route.name)}
              style={{
                backgroundColor: isActive ? theme.sBg : theme.bg,
                // padding: 15,
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 20,
                // Shadow styles for iOS
                shadowColor: isActive ? theme.border : theme.sBg,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: isActive ? 0.25 : 0,
                shadowRadius: 3.84,
                // Elevation for Android
                elevation: isActive ? 5 : 0,
              }}
            >
              <Text
                style={{
                  color: isActive ? theme.sText : theme.text,
                  fontFamily: fonts.regular
                }}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTopBar;
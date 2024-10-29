import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import StackNav from "@/navigation/StackNav";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
          <StackNav />
      </Provider>
    </NavigationContainer>
  );
}
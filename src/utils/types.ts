// types/navigation.ts
import { ComponentType } from 'react';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { NavigationProp, RouteProp } from '@react-navigation/native';

// Define the root stack parameter list
export type RootStackParamList = {
  BottomTab: undefined;
  StoryScreen: {
    id: number;
  };
};

// Define the top tab parameter list
export type TopTabParamList = {
  Top: undefined;
  New: undefined;
  Best: undefined;
};



export type TopTabConfig = {
    name: keyof TopTabParamList;
    component: ComponentType<any>;
  };


  export interface TopScreenProps {
    navigation: NavigationProp<RootStackParamList>;
    route: RouteProp<TopTabParamList, 'Top'>;
  }
  export interface NewScreenProps {
    navigation: NavigationProp<RootStackParamList>;
    route: RouteProp<TopTabParamList, 'New'>;
  }
  
  export interface BestScreenProps {
    navigation: NavigationProp<RootStackParamList>;
    route: RouteProp<TopTabParamList, 'Best'>;
  }
  
// For StoryScreen
export interface StoryScreenProps {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'StoryScreen'>;
}

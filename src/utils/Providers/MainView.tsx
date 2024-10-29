import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native';
import { setTheme } from '@/redux/slices/themeSlice';
import { useDispatch } from 'react-redux';
import { useTheme } from '../themes/colors';

const MainView: React.FC<{ children: React.ReactNode}> = ({children}) => {
    const colorScheme = useColorScheme();
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(setTheme(colorScheme === "dark" ? true : false))
    })

    const theme = useTheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.bg}]}>
      <StatusBar barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} backgroundColor={theme.bg} />
      {children}
    </SafeAreaView>
  )
}

export default MainView

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

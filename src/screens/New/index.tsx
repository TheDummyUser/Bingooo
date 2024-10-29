import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import { fonts, fontSizes } from '@/utils/themes/fonts'
import { useTheme } from '@/utils/themes/colors'

const New = () => {
  const theme = useTheme();
  return (
    <MainView>
      <Text style={[styles.text, {color: theme.text}]}>New</Text>
    </MainView>
  )
}

export default New

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxLarge,
    fontFamily: fonts.regular,
  },
})
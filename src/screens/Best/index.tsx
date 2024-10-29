import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import { fonts, fontSizes } from '@/utils/themes/fonts'
import { useTheme } from '@/utils/themes/colors'

const Best = () => {
  const theme = useTheme()
  return (
    <MainView>
      <Text style={[styles.text, {color: theme.text}]}>Best</Text>
    </MainView>
  )
}

export default Best

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxLarge,
    fontFamily: fonts.regular,
  },
})
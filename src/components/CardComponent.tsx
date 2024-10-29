import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/utils/themes/colors';
import moment from 'moment';
import { EnhancedStory } from '@/redux/services/stories';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { fonts, fontSizes } from '@/utils/themes/fonts';



interface CardProps {
  story: EnhancedStory
  onPress?: () => void
  navigationScreen?: string
}

const CardComponent: React.FC<CardProps> = ({story, onPress}) => {
  const theme = useTheme();

  const time = moment.unix(story.time).fromNow();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      
      <View style={styles.TitleTimeBy}>
        <Text style={[styles.fontFam, {color: theme.text, fontSize: fontSizes.medium}]} numberOfLines={2}>
          {story.title}
        </Text>

        <View style={styles.ByTime}>
          <Text style={[styles.fontFam, {color: theme.text, fontSize: fontSizes.small}]}>
            by {story.by}
          </Text>
          <Text style={[styles.fontFam, {color: theme.text, fontSize: fontSizes.small}]}>
            {time}
          </Text>
        </View>
      </View>

      <View style={styles.BookmarkContainer}>
        <Ionicons
          name="heart-outline"
          size={20}
          color={theme.text}
          onPress={() => console.log('bookmark')}
        />
      </View>

    </TouchableOpacity>
  )
}

export default CardComponent
const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#8b949e',
    paddingVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ByTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  BookmarkContainer: {
    width: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleTimeBy: {
    width: "90%",
    justifyContent: 'space-evenly',
  },
  fontFam: {
    fontFamily: fonts.regular,
  },
})



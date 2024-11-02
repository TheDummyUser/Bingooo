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
  onLongPress?: () => void
}

const CardComponent: React.FC<CardProps> = ({story, onPress, onLongPress}) => {
  const theme = useTheme();

  const time = moment.unix(story.time).fromNow();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} key={story.id} onLongPress={onLongPress}>
      
      <View style={styles.TitleTimeBy}>
        <Text style={[styles.fontFam, {color: theme.base07, fontSize: fontSizes.medium}]} numberOfLines={2}>
          {story.title}
        </Text>

        <View style={styles.ByTime}>
          <BaseTextComponent child={`by ${story.by}`} />
          <BaseTextComponent child={`${story.score} points`} />
          <BaseTextComponent child={time} />
        </View>
      </View>

      {/* <View style={styles.BookmarkContainer}>
        <Ionicons
          name="bookmark-outline"
          size={20}
          color={theme.base07}
          onPress={() => console.log('bookmark')}
        />
      </View> */}

    </TouchableOpacity>
  )
}

const BaseTextComponent: React.FC<{child: string}> = ({child}) => {
  const theme = useTheme();
  return (
    <Text style={[styles.fontFam, {color: theme.base07, fontSize: fontSizes.small}]}>
      {child}
    </Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 10,
    gap: 15
  },
  BookmarkContainer: {
    width: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  TitleTimeBy: {
    // width: "90%",
    justifyContent: 'space-evenly',
  },
  fontFam: {
    fontFamily: fonts.regular,
  },
})



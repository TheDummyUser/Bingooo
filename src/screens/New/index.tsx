import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import { fonts, fontSizes } from '@/utils/themes/fonts'
import { useTheme } from '@/utils/themes/colors'
import { EnhancedStory, useGetStoriesQuery } from '@/redux/services/stories'
import CardComponent from '@/components/CardComponent'

const New = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(1);
  const {data, isLoading, error} = useGetStoriesQuery({type: 'new', page});
  return (
    <MainView>
        <FlatList
        data={data?.posts}
        renderItem={({item} : {item: EnhancedStory}) => <CardComponent story={item} onPress={() => console.log(item.id)} onLongPress={() => console.log(item.id, 'saving this to supabase table')} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <Text>Loading...</Text> : null}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{paddingBottom: 60, paddingHorizontal: 16}}
      />
    </MainView>
  )
}

export default New
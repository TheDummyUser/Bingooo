import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import { EnhancedStory, useGetStoriesQuery } from '@/redux/services/stories'
import CardComponent from '@/components/CardComponent'
import { TopScreenProps } from '@/utils/types'

const Top: React.FC<TopScreenProps> = ({...props}) => {
  const [page, setPage] = React.useState(1);
  const {data, isLoading, error} = useGetStoriesQuery({type: 'top', page});

  return (
    <MainView>
        <FlatList
        data={data?.posts}
        renderItem={({item} : {item: EnhancedStory}) => <CardComponent story={item} onPress={() => props.navigation.navigate('StoryScreen', {id: item.id})} />}
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

export default Top
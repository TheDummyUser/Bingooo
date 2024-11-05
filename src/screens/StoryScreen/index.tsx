import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainView from '@/utils/Providers/MainView'
import { WebView } from 'react-native-webview'
import { useGetSingleStoryQuery } from '@/redux/services/stories'

import Markdown from 'react-native-markdown-display'
import { StoryScreenProps } from '@/utils/types'

const StoryScreen: React.FC<StoryScreenProps> = ({...props}) => {
  const { id } = props.route.params
  const { data, isLoading, error } = useGetSingleStoryQuery(id)

  const adBlockerScript = `
    (function() {
      var styles = document.createElement('style');
      styles.innerHTML = \`
        iframe, [id*="ad"], [class*="ad"], img[src*="ads"], 
        img[src*="doubleclick.net"], img[src*="googleadservices.com"], 
        img[src*="adsafeprotected.com"], div[class*="banner"], 
        div[class*="promo"] { display: none !important; visibility: hidden !important; }
      \`;
      document.head.appendChild(styles);
    })();
  `;

  return (
    <MainView>
      {data && data.url ? (
        <WebView
          source={{ uri: data.url }}
          injectedJavaScript={adBlockerScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : data && data.text ? (
        <Markdown>
          {data.text}
        </Markdown>
      ) : (
        <Text>No content available</Text>
      )}
    </MainView>
  )
}

export default StoryScreen
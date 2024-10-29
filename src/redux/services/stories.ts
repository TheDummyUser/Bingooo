import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_url, urls } from '../apiConfig';
import { Story } from '@/utils/types';

export type EnhancedStory = Story & {
  hasContent: boolean;
  contentType: 'external' | 'self' | 'hybrid';
};

export const hackerNewsApi = createApi({
  reducerPath: 'hackerNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_url }),
  endpoints: builder => ({
    getStories: builder.query<{
      posts: EnhancedStory[];
      totalStories: number;
      currentPage: number;
    }, {
      type: 'top' | 'new' | 'ask' | 'show' | 'job';
      page?: number;
    }>({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const pageSize = 30;
          const page = arg.page || 1;
          
          // Fetch story IDs
          const storyIdsResult = await fetchWithBQ(`${arg.type}stories.json`);
          if (storyIdsResult.error) return { error: storyIdsResult.error };
          
          const allStoryIds = storyIdsResult.data as number[];
          
          // Calculate pagination
          const start = (page - 1) * pageSize;
          const end = start + pageSize;
          const pageIds = allStoryIds.slice(start, end);
          
          // Fetch and enhance stories
          const storiesPromises = pageIds.map(async (id) => {
            const storyResult = await fetchWithBQ(`item/${id}.json`);
            if (storyResult.error) return null;
            
            const story = storyResult.data as Story;
            const enhancedStory: EnhancedStory = {
              ...story,
              hasContent: Boolean(story.text),
              contentType: determineContentType(story)
            };
            
            return enhancedStory;
          });
          
          const stories = await Promise.all(storiesPromises);
          const validStories = stories.filter((story): story is EnhancedStory => story !== null);
          
          return {
            data: {
              posts: validStories,
              totalStories: allStoryIds.length,
              currentPage: page
            }
          };
          
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    
    getSingleStory: builder.query<EnhancedStory, number>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const result = await fetchWithBQ(urls.story(id));
          if (result.error) return { error: result.error };
          
          const story = result.data as Story;
          const enhancedStory: EnhancedStory = {
            ...story,
            hasContent: Boolean(story.text),
            contentType: determineContentType(story)
          };
          
          return { data: enhancedStory };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    }),
    getPostComments: builder.query({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          const result = await fetchWithBQ(urls.postComments(id));
          if (result.error) return { error: result.error };
          
          return { data: result.data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      }
    })
  })
});

// Helper function to determine content type
function determineContentType(story: Story): 'external' | 'self' | 'hybrid' {
  if (story.url && !story.text) {
    return 'external';
  } else if (story.text && !story.url) {
    return 'self';
  } else if (story.text && story.url) {
    return 'hybrid';
  } else {
    return 'external';
  }
}

export const {
  useGetStoriesQuery,
  useGetSingleStoryQuery,
  useGetPostCommentsQuery
} = hackerNewsApi;
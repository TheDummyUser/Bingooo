export const base_url = 'https://hacker-news.firebaseio.com/v0/';

export const urls = {
    topStories: `topstories.json`,
    newStories: `newstories.json`,
    askStories: `askstories.json`,
    showStories: `showstories.json`,
    jobStories: `jobstories.json`,


    //single stories
    story: (id: number) => `item/${id}.json`,
    user: (id: number) => `user/${id}.json`,
    postComments: (id: number) => `item/${id}/comments.json`,
}
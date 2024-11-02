// hacker news stories

export interface Story {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    text?: string;
    time: number;
    title: string;
    type: string;
    url?: string;
}

export interface User {
    about: string
    created: number
    id: string
    karma: number
    submitted: number[]
}

export interface Comments {
    by: string
    id: number
    kids: number[]
    parent: number
    text: string
    time: number
}
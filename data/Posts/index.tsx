import React, { createContext, useContext, useState } from "react";
import { api } from "@/service/axios"
import { GetPostsResponse } from "@/model/get_posts.response"

interface PostsContextProps {
    posts: GetPostsResponse[];
    getPosts: () => void;
}

const PostsContext = createContext<PostsContextProps>({} as PostsContextProps);

export const usePosts = () => {
    return useContext(PostsContext);
};

export function PostsProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<GetPostsResponse[]>([]);

    const getPosts = async () => {
        try {
            const { data } = await api.get("/posts");
            setPosts(data);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    };

    return (
        <PostsContext.Provider value={{ posts, getPosts }}>
            {children}
        </PostsContext.Provider>
    );
}



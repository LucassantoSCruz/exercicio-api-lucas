import React, { createContext, useContext, useState } from "react";
import { api } from "@/service/axios"
import { GetPostsResponse } from "@/model/get_posts.response"
import { CreatePostRequest } from "@/model/create_posts.request";

interface PostsContextProps {
    posts: GetPostsResponse[];
    getPosts: () => void;
    createPostRequest: CreatePostRequest;
    setCreatePostRequest: (data: CreatePostRequest) => void;
    createPost: (data: CreatePostRequest) => void;
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

    const [createPostRequest, setCreatePostRequest] =
        useState<CreatePostRequest>({} as CreatePostRequest);


    const createPost = async (data: CreatePostRequest) => {
        try {
            await api.post('/posts', data)
            console.log("Post cadastrado com sucesso: " + data)
        } catch (error) {
            console.error("Erro ao cadastrar posts:", error);
        }

    }

    return (
        <PostsContext.Provider value={{ posts, getPosts, createPost, createPostRequest, setCreatePostRequest }}>
            {children}
        </PostsContext.Provider>
    );
}



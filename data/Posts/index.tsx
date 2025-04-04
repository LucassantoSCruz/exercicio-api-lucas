import React, { createContext, useContext, useState } from "react";
import { api } from "@/service/axios"
import { GetPostsResponse } from "@/model/get-posts.response"
import { CreatePostRequest } from "@/model/create-posts.request";
import { ChangePostRequest } from "@/model/change-post.request";
import { RequestStatus } from "@/model/request-status";
import { CreatePostResponse } from "@/model/create-posts.response";

interface PostsContextProps {
    posts: GetPostsResponse[];
    getPosts: () => void;
    createPostRequest: CreatePostRequest;
    setCreatePostRequest: (data: CreatePostRequest) => void;
    createPost: (data: CreatePostRequest) => void;
    createPostResponse: CreatePostResponse
    createPostRequestStatus: RequestStatus
    changePost: (data: ChangePostRequest, id: number) => void;
    changePostRequestStatus: RequestStatus
    deletePost: (id: number) => void;
    deletePostRequestStatus: RequestStatus;
    setDeletePostRequestStatus: (status: RequestStatus) => void;
}

const PostsContext = createContext<PostsContextProps>({} as PostsContextProps);

export const usePosts = () => {
    return useContext(PostsContext);
};

export function PostsProvider({ children }: { children: React.ReactNode }) {

    const [posts, setPosts] = useState<GetPostsResponse[]>([]);

    const [createPostRequestStatus, setCreatePostRequestStatus] = useState<RequestStatus>({
        status: 'idle',
    })

    const [changePostRequestStatus, setChangePostRequestStatus] = useState<RequestStatus>({
        status: 'idle',
    })

    const [deletePostRequestStatus, setDeletePostRequestStatus] = useState<RequestStatus>({
        status: 'idle',
    })

    const [createPostRequest, setCreatePostRequest] =
        useState<CreatePostRequest>({} as CreatePostRequest);

    const [changePostRequest, setchangePostRequest] =
        useState<ChangePostRequest>({} as ChangePostRequest);

    // ----------------------------------------------------------------------------

    const getPosts = async () => {

        try {
            const { data } = await api.get("/posts");
            setPosts(data);
        } catch (error) {
            console.error("Erro ao buscar posts:", error);
        }
    }

    // ----------------------------------------------------------------------------

    const createPost = async (data: CreatePostRequest) => {

        setCreatePostRequestStatus({ status: 'pending' })

        try {
            await api.post('/posts', data)
            console.log('Cadastrado com sucesso')
            setCreatePostRequestStatus({ status: 'succeeded' })
        } catch (error) {
            console.error("Erro ao cadastrar posts:", error);
            setCreatePostRequestStatus({ status: 'failed' })
        }
    }

    // ----------------------------------------------------------------------------

    const changePost = async (data: ChangePostRequest, id: number) => {

        setChangePostRequestStatus({ status: 'pending' })

        try {
            await api.patch(`/posts/${id}`, data)
            console.log("Id Post: ", id, " - Dados do post", data)
            console.log('Alterado com sucesso')
            setChangePostRequestStatus({ status: 'succeeded' })
        } catch (error) {
            console.error("Erro ao alterar post:", error);
            setCreatePostRequestStatus({ status: 'failed' })
        }
    }

    // ----------------------------------------------------------------------------

    const deletePost = async (id: number) => {

        setDeletePostRequestStatus({ status: 'pending' })

        try {
            await api.delete(`/posts/${id}`);
            console.log("Deletado o post com o id: ", id)
            setDeletePostRequestStatus({ status: 'succeeded' })
        } catch (error) {
            console.error("Erro ao deletar post:", error);
            setDeletePostRequestStatus({ status: 'failed' })
        }
    }

    return (
        <PostsContext.Provider
            value={{
                posts,
                getPosts,
                createPost,
                createPostRequest,
                setCreatePostRequest,
                createPostRequestStatus,
                changePost,
                changePostRequestStatus,
                deletePost,
                deletePostRequestStatus,
                setDeletePostRequestStatus
            }}
        >
            {children}
        </PostsContext.Provider>
    );
}



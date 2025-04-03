import { BaseModal } from "@/components/BaseModal";
import { Text, View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { usePosts } from "@/data/Posts";
import { ChangePostRequest } from "@/model/change-post.request";

export default function Index() {

    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState('')

    const [body, setBody] = useState('')

    const [selectedPost, setSelectedPost] = useState<ChangePostRequest[]>([])

    const {
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
    } = usePosts();

    useEffect(() => {
        getPosts();
    }, [])

    const createPostHandler = () => {
        createPost({ title, body, userId: 1 });
        console.log(createPostRequestStatus);
        setShowModal(false)
    }

    const changePostHandler = (id: number) => {
        setShowModal(true)
        changePost({title: title, body: body, userId: 1} , id);
        console.log(changePostRequestStatus);
    }

    const deletePostHandler = (id: number) => {
        deletePost(id)
        console.log(deletePostRequestStatus)
    }

    return (
        <View lightColor="#F2F4F7" style={styles.container}>
            <BaseModal visible={showModal} onRequestClose={() => setShowModal(false)}>
                <Text style={styles.title}>Adicionar Post</Text>
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Título"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title}
                    />
                    <TextInput
                        placeholder="Descrição"
                        style={styles.textArea}
                        onChangeText={setBody}
                        value={body}
                        multiline
                    />
                </View>
                <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={createPostHandler}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </BaseModal>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={.7} style={styles.cardContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.body}</Text>
                        <View style={styles.cardOptionContainer}>
                            <TouchableOpacity activeOpacity={.7} style={styles.cardOptionButton} onPress={() => changePostHandler(item.id)}>
                                <MaterialIcons name="edit" size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.7} style={styles.cardOptionButton} onPress={() => deletePostHandler(item.id)}>
                                <MaterialIcons name="delete" size={18} color={'#d42626'} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity activeOpacity={.7} style={styles.addButton} onPress={() => setShowModal(true)}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 18,
        gap: 16
    },
    cardContainer: {
        width: '100%',
        padding: 16,
        gap: 8,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        elevation: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    addButton: {
        backgroundColor: '#007AFF',
        position: 'absolute',
        borderRadius: 50,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 24,
        right: 24,
        elevation: 5,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 28
    },
    input: {
        padding: 12,
        borderRadius: 12,
        borderColor: '#c3c3c3',
        borderWidth: 1,
        width: '100%',
    },
    textArea: {
        padding: 12,
        borderRadius: 12,
        borderColor: '#c3c3c3',
        borderWidth: 1,
        width: '100%',
        height: 100,
        textAlignVertical: 'top'
    },
    modalContainer: {
        gap: 16
    },
    button: {
        width: '100%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    cardOptionContainer: {
        flexDirection: 'row',
        gap: 4,
        alignSelf: 'flex-end'
    },
    cardOptionButton: {
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#e3e3e3',
        padding: 4
    }
})

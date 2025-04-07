import { BaseModal } from "@/components/BaseModal";
import { Text, View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { usePosts } from "@/data/Posts";
import { ChangePostRequest } from "@/model/change-post.request";
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';

export default function Index() {

    const { colors } = useTheme();

    const [showModalCreatePost, setShowModalCreatePost] = useState(false);

    const [showModalChangePost, setShowModalChangePost] = useState(false);

    const [showModalDeletePost, setShowModalDeletePost] = useState(false);

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [id, setId] = useState(0)

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
        setShowModalCreatePost(false);
        setTitle('');
        setBody('')
    }

    const openEditPostModal = (id: number, title: string, body: string) => {
        console.log("Id selecionado: ", id)
        setId(id)
        setTitle(title)
        setBody(body)
        setShowModalChangePost(true)
    }

    const changePostHandler = () => {
        changePost({ title, body, userId: 1 }, Number(id)); 
        console.log(changePostRequestStatus);
        setShowModalChangePost(false); 
        setTitle('');
        setBody('');
    }

    const openDeletePostModal = (id: number, title: string, body: string) => {
        console.log("Id selecionado: ", id)
        setId(id)
        setTitle(title)
        setBody(body)
        setShowModalDeletePost(true)
    }

    const deletePostHandler = () => {
        deletePost(id); 
        console.log(deletePostRequestStatus)
        setShowModalDeletePost(false);
        setTitle('');
        setBody('');
    }

    return (
        <View lightColor="#F2F4F7" style={[styles.container, { backgroundColor: colors.background }]}>

            <BaseModal visible={showModalCreatePost} style={{backgroundColor: colors.card}} onRequestClose={() => setShowModalCreatePost(false)}>
                <Text style={styles.title}>Adicionar Post</Text>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <TextInput
                        placeholder="Título"
                        placeholderTextColor={colors.text}
                        style={[styles.input, {color: colors.text}]}
                        onChangeText={setTitle}
                        value={title}
                        selectionColor={colors.text}
                    />
                    <TextInput
                        placeholder="Descrição"
                        placeholderTextColor={colors.text}
                        style={[styles.textArea, {color: colors.text}]}
                        onChangeText={setBody}
                        value={body}
                        multiline
                    />
                </View>
                <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={createPostHandler}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
            </BaseModal>

            <BaseModal visible={showModalChangePost} onRequestClose={() => setShowModalChangePost(false)}>
                <Text style={styles.title}>Editar Post</Text>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <TextInput
                        placeholder="Título"
                        placeholderTextColor={colors.text}
                        style={[styles.input, {color: colors.text}]}
                        onChangeText={setTitle}
                        value={title}
                    />
                    <TextInput
                        placeholder="Descrição"
                        placeholderTextColor={colors.text}
                        style={[styles.textArea, {color: colors.text}]}
                        onChangeText={setBody}
                        value={body}
                        multiline
                    />
                </View>
                <TouchableOpacity activeOpacity={.7} style={styles.button} onPress={changePostHandler}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </BaseModal>

            <BaseModal visible={showModalDeletePost} onRequestClose={() => setShowModalDeletePost(false)}>
                <Text style={styles.title}>Excluir Post</Text>
                <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text>
                        {body}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={.7} style={[styles.button, {backgroundColor: colors.notification}]} onPress={deletePostHandler}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </BaseModal>

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={.7} style={[styles.cardContainer, { backgroundColor: colors.card }]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.body}</Text>
                        <View style={[styles.cardOptionContainer, {backgroundColor: colors.card}]}>
                            <TouchableOpacity activeOpacity={.7} style={[styles.cardOptionButton, {backgroundColor: colors.card, borderColor: colors.border}]} onPress={() => openEditPostModal(item.id, item.title, item.body)}>
                                <MaterialIcons name="edit" size={18} color={colors.text}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={.7} style={[styles.cardOptionButton, {backgroundColor: colors.card, borderColor: colors.border}]} onPress={() => openDeletePostModal(item.id, item.title, item.body)}>
                                <MaterialIcons name="delete" size={18} color={'#d42626'} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity activeOpacity={.7} style={styles.addButton} onPress={() => setShowModalCreatePost(true)}>
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
        padding: 4,
        borderWidth: 1
    }
})

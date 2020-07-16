import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';

import { Context } from '../context/BlogContext';
// import { Context as BlogContext }
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {

    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        // Keeping a dangling listener can lead to a memory leak
        // so it is important to clean up after adding a listener
        // When a function is returned from useEffect, it will only
        // get called once the instance of IndexScreen is completely destroyed
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <FlatList 
                data={state}
                keyExtractor={(blogPost) => `${blogPost.id}`}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" style={styles.icon}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <Feather name="plus" size={30} />    
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderTopWidth: 1,
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;

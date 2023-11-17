import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todos';

export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState('');
    const [todos, setTodos] = useState({});
    useEffect(() => {
        loadTodos();
    }, []);

    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);
    const saveTodos = async (toSave) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    };
    const loadTodos = async () => {
        const item = await AsyncStorage.getItem(STORAGE_KEY);
        setTodos(JSON.parse(item));
    };
    const addTodo = async () => {
        if (!text) return;

        const newTodos = { ...todos, [Date.now()]: { text, working } };
        setTodos(newTodos);
        await saveTodos(newTodos);
        setText('');
    };

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>
                        Work
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={travel}>
                    <Text style={{ ...styles.btnText, color: working ? theme.grey : 'white' }}>
                        Travel
                    </Text>
                </TouchableOpacity>
            </View>

            <TextInput
                returnKeyType='done'
                placeholder={working ? 'Add a Todo' : 'Where do you want to go?'}
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
                onSubmitEditing={addTodo}
            />

            <ScrollView>
                {Object.entries(todos).map(([key, value]) =>
                    todos[key].working === working ? (
                        <View key={key} style={styles.todo}>
                            <Text style={styles.todoText}>{value.text}</Text>
                        </View>
                    ) : null
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 100,
    },
    btnText: {
        fontSize: 38,
        fontWeight: '600',
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 20,
        fontSize: 18,
    },
    todo: {
        backgroundColor: theme.grey,
        marginBottom: 10,
        padding: 20,
        borderRadius: 15,
    },
    todoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

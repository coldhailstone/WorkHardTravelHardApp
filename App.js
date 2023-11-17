import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState('');
    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);

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
                placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
                style={styles.input}
                value={text}
                onChangeText={onChangeText}
            />
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
        fontWeight: 600,
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        fontSize: 18,
    },
});

import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";

type FocusProps = {
    addTask: (taskName: string) => void;
}

export const Focus = ({ addTask }: FocusProps) => {
    const [taskName, setTaskName] = useState(null);
    console.log(taskName);

    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTaskName}
                placeholder="Write name of the Task"
                style={styles.inputField}
            />
            <TouchableOpacity style={styles.button} onPress={() => addTask(taskName)}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
        flex: 0.25,
        flexDirection: 'row',
        // borderWidth: 4,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        margin: 8,
        padding: 10,
        flex: 0.80,
        height: 40,
        width: 40,
        // borderColor: 'gray',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    button: {
        // borderWidth: 2,
        height: 40,
        width: 40,
        // borderColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
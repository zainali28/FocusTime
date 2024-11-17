import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";

type FocusProps = {
    addTask: (taskName: string[]) => void;
    existingTasks: string[];
    focusStart: (currentlyFocusing: boolean) => void;
}

export const Focus = ({ addTask, existingTasks, focusStart }: FocusProps) => {
    const [taskName, setTaskName] = useState(null);

    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={setTaskName}
                placeholder="Write name of the Task"
                style={styles.inputField}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                addTask([...existingTasks, taskName]);
                focusStart(true);
                }}>
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
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    button: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
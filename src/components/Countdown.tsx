import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";

type CountdownProps = {
    startSeconds: number,
    setCurrentSeconds: (seconds: number) => void
}

export default function Countdown({ startSeconds, setCurrentSeconds }) {
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(startSeconds);

    useEffect(() => {
        
        intervalRef.current = seconds > 0 && setInterval(() => {
            setSeconds(seconds-1);
        }, 1000);
        setCurrentSeconds(seconds);
        return () => {
            clearInterval(intervalRef.current);
        }
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={styles.time}>{seconds}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        borderWidth: 4,
        // backgroundColor: 'aqua',
        borderColor: 'black',
        height: 100,
        width: 200,
        marginBottom: 200
    },
    time: {
        fontWeight: 'bold',
        fontSize: 64,
        textAlign: 'center'
    }
});
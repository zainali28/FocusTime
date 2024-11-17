import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";

type CountdownProps = {
    setFocusStatus: (currentlyFocusing: boolean) => void;
}

export default function Countdown({ setFocusStatus }: CountdownProps) {
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    const timerVals = [10, 15, 20];

    useEffect(() => {
        if (startTimer) {
            intervalRef.current = seconds > 0 && setInterval(() => {
                setSeconds(seconds-1);
            }, 1000);
            seconds == 0 && setFocusStatus(false);
            return () => {
                clearInterval(intervalRef.current);
            }
        }
    })

    return(
        <SafeAreaView style={styles.container}>
            {
                !startTimer && timerVals.map((v, i) => <TouchableOpacity onPress={() => {
                    setStartTimer(true);
                    setSeconds(v);
                }} key={i}>
                    <Text>{v}</Text>
                </TouchableOpacity>)
            }
            {startTimer && <View style={styles.container}>                
                <Text style={styles.time}>{seconds}</Text>
            </View>}
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
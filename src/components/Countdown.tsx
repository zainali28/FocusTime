import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";

type CountdownProps = {
    setFocusStatus: (currentlyFocusing: boolean) => void;
    setTimeList: (timeList: number[]) => void;
    timeList: number[];
}

export default function Countdown({ setTimeList, timeList, setFocusStatus }: CountdownProps) {
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(10);
    const [startTimer, setStartTimer] = useState(false);
    const [pause, setPause] = useState(true);
    const [stop, setStop] = useState(false);
    const timerVals = [10, 15, 20];
    const totalSeconds = useRef(10);

    useEffect(() => {
        if (startTimer || !pause) {
            intervalRef.current = seconds > 0 && setInterval(() => {
                setSeconds(seconds-1);
            }, 1000);
            if (seconds == 0) {
                setTimeList([...timeList, totalSeconds.current]);
                setFocusStatus(false);
            }
            return () => {
                clearInterval(intervalRef.current);
            }
        }
    })

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.timer}>                
                <Text style={styles.time}>{seconds}</Text>
            </View>
            <SafeAreaView style={styles.buttonsBox}>
            {
                timerVals.map((v, i) => <TouchableOpacity style={styles.button} onPress={() => {
                    setStartTimer(true);
                    setPause(false);
                    totalSeconds.current = v;
                    setSeconds(v);
                    // setTimeList([...timeList, v]);
                }} key={i}>
                    <Text>{v}</Text>
                </TouchableOpacity>)
            }
            </SafeAreaView>
            <TouchableOpacity style={styles.button} onPress={() => {
                setPause(!pause);
                setStartTimer(pause);
            }}>
                <Text>{pause && !startTimer ? "Start" : "Pause"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                setTimeList([...timeList, (totalSeconds.current - seconds)]);
                setFocusStatus(false);
            }}>
                <Text>Stop</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        borderWidth: 4,
        // backgroundColor: 'aqua',
        borderColor: 'black',
        // height: 100,
        // width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200
    },
    timer: {

    },
    time: {
        fontWeight: 'bold',
        fontSize: 64,
        textAlign: 'center'
    },
    button: {
        borderRadius: 999,
        borderWidth: 2,
        height: 40,
        width: 40,
        // borderColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonsBox: {
        flexDirection: 'row',
    }
});
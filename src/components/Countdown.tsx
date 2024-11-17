import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, StatusBar, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import type { PropsWithChildren } from "react";
import { setTextRange } from "typescript";

type CountdownProps = {
    setFocusStatus: (currentlyFocusing: boolean) => void;
    setTimeList: (timeList: string[]) => void;
    timeList: string[];
}

export default function Countdown({ setTimeList, timeList, setFocusStatus }: CountdownProps) {
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [startTimer, setStartTimer] = useState(false);
    const [pause, setPause] = useState(true);
    // const timerVals = [10, 15, 20];
    const timerVals = [1, 2, 3];
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(-1);

    useEffect(() => {
        if (startTimer || !pause) {
            intervalRef.current = setInterval(() => {
                if ((seconds == 0) && (minutes > 0)) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                    setTotalMinutes(totalMinutes + 1);
                }
                else if ((seconds == 0) && (minutes == 0)) {
                    setTimeList([...timeList, `${totalMinutes}m${totalSeconds}s`]);
                    setFocusStatus(false);
                }
                else {
                    setSeconds(seconds-1);
                    setTotalSeconds((totalSeconds % 60) + 1);
                }
            }, 1000);
            
            // else if ((seconds == 0) && (minutes == 0)) {
            //     setTimeList([...timeList, `${totalMinutes}m${totalSeconds}s`]);
            //     setFocusStatus(false);
            // }
            return () => {
                clearInterval(intervalRef.current);
            }
        }
    })

    return(
        <SafeAreaView style={styles.container}>
            <View>                
                <Text style={styles.time}>{((minutes / 10) < 1) ? `0${minutes}` : `${minutes}`}:{((seconds / 10) < 1) ? `0${seconds}` : `${seconds}`}</Text>
            </View>
            <View style={styles.buttonsBox}>
            {
                timerVals.map((v, i) => <TouchableOpacity style={styles.button} onPress={() => {
                    setStartTimer(true);
                    setPause(false);
                    setMinutes(v);
                }} key={i}>
                    <Text>{v}</Text>
                </TouchableOpacity>)
            }
            </View>
            <View style={styles.buttonsBox}>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setPause(!pause);
                    setStartTimer(pause);
                }}>
                    <Text>{pause && !startTimer ? "Start" : "Pause"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    setTimeList([...timeList, `${totalMinutes}m${totalSeconds}s`]);
                    setFocusStatus(false);
                }}>
                    <Text>Stop</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        // borderWidth: 4,
        borderColor: 'black',
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
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonsBox: {
        flexDirection: 'row',
    }
});
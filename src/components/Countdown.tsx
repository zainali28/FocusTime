import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Vibration } from "react-native";

type CountdownProps = {
    setFocusStatus: (currentlyFocusing: boolean) => void;
    setTimeList: (timeList: string[]) => void;
    timeList: string[];
}

export default function Countdown({ setTimeList, timeList, setFocusStatus }: CountdownProps) {
    const intervalRef = useRef(null);
    const [seconds, setSeconds] = useState(10);
    const [minutes, setMinutes] = useState(0);
    const [startTimer, setStartTimer] = useState(false);
    const [pause, setPause] = useState(true);
    const timerVals = useRef([10, 15, 20]);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [totalMinutes, setTotalMinutes] = useState(-1);
    const [done, setIsDone] = useState(false);
    const ONE_SECOND_IN_MS = useRef(1000);
    const PATTERN = useRef([
        0 * ONE_SECOND_IN_MS.current,
        1 * ONE_SECOND_IN_MS.current,
        0 * ONE_SECOND_IN_MS.current,
      ]);

    useEffect(() => {
        if (startTimer || !pause) {
            intervalRef.current = setInterval(() => {
                if ((seconds == 0) && (minutes > 0)) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                    setTotalMinutes(totalMinutes + 1);
                }
                else if ((seconds == 0) && (minutes == 0)) {
                    if (totalMinutes < 0) setTimeList([...timeList, `0m${totalSeconds}s`]);
                    else setTimeList([...timeList, `${totalMinutes}m${totalSeconds}s`]);
                    setIsDone(true);
                    setPause(true);
                    setStartTimer(false);
                    // setFocusStatus(false);
                    Vibration.vibrate(PATTERN.current, true);
                }
                else {
                    setSeconds(seconds-1);
                    setTotalSeconds((totalSeconds % 60) + 1);
                }
            }, 1000);
            
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
                timerVals.current.map((v, i) => <TouchableOpacity style={styles.button} onPress={() => {
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
                    if (totalMinutes < 0) setTimeList([...timeList, `0m${totalSeconds}s`]);
                    else setTimeList([...timeList, `${totalMinutes}m${totalSeconds}s`]);
                    Vibration.cancel()
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
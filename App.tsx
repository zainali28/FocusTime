    import React, {useState} from "react";
import { StyleSheet, View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import { Focus } from './src/features/Focus'
import Countdown from "./src/components/Countdown";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [currentlyFocusing, setCurrentlyFocusing] = useState(false);
  // const [stop, setStop] = useState(false);
  return(
    <SafeAreaView style={styles.container}>
      {!currentlyFocusing ? 
        <SafeAreaView style={styles.container}>
          <Focus addTask={setTaskList} existingTasks={taskList} focusStart={setCurrentlyFocusing} /> 
          {taskList.map((v, i) => <Text key={i}>Focused on {v} for {timeList[i]}s</Text>)}
        </SafeAreaView>
        : 
      <SafeAreaView style={styles.counter}>
        <Text>Focusing on {taskList[taskList.length - 1]}</Text>
        <Countdown setTimeList={setTimeList} timeList={timeList} setFocusStatus={setCurrentlyFocusing} />
      </SafeAreaView>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  counter: {
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // borderWidth: 4, 
    // borderColor: 'yellow',
    // backgroundColor: ''
  },
  container: {
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    flex: 1
  },
  text: {
    
  }
});
import React, {useState} from "react";
import { StyleSheet, Text, SafeAreaView, Platform, StatusBar, FlatList } from "react-native";
import { Focus } from './src/features/Focus'
import Countdown from "./src/components/Countdown";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [currentlyFocusing, setCurrentlyFocusing] = useState(false);

  return(
    <SafeAreaView style={styles.container}>
      {!currentlyFocusing ? 
        <SafeAreaView style={styles.container}>
          <Focus addTask={setTaskList} existingTasks={taskList} focusStart={setCurrentlyFocusing} /> 
          <FlatList
            style={{marginTop: 20}}
            data={taskList}
            renderItem={({item}) => <Text style={{margin: 10}}>Focused on {item} for {timeList[taskList.indexOf(item)]}</Text>}
          />
        </SafeAreaView>
        : 
      <SafeAreaView style={styles.counter}>
        <Text style={{fontSize: 32}}>Focusing on {taskList[taskList.length - 1]}</Text>
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
  },
  container: {
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight,
    flex: 1
  },
  text: {
    
  }
});
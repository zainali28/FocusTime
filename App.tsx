    import React, {useState} from "react";
import { StyleSheet, View, Text, SafeAreaView, Platform, StatusBar } from "react-native";
import { Focus } from './src/features/Focus'
import Countdown from "./src/components/Countdown";

export default function App() {
  const [taskList, setTaskList] = useState([]);
  const [currentlyFocusing, setCurrentlyFocusing] = useState(false);
  // console.log(currentSeconds);
  return(
    <SafeAreaView style={styles.container}>
      {/* { !taskName ? (<Focus addTask={setTaskName}/>) : ( currentSeconds !== 0 ? 
        <SafeAreaView style={styles.counter}>
          <Text style={{fontSize: 32, fontWeight: 'bold', margin: 12}}>I am going to focus on {taskName}</Text>
          <Countdown startSeconds={10} setCurrentSeconds={setCurrentSeconds} />
        </SafeAreaView>

        :

        <Text>
          All done!
        </Text>
      ) } */}
      {!currentlyFocusing ? 
        <SafeAreaView style={styles.container}>
          <Focus addTask={setTaskList} existingTasks={taskList} focusStart={setCurrentlyFocusing} /> 
          {taskList.map((v) => <Text>Focused on {v}</Text>)}
        </SafeAreaView>
        : 
      <SafeAreaView style={styles.counter}>
        <Text>Focusing on {taskList[taskList.length - 1]}</Text>
        <Countdown setFocusStatus={setCurrentlyFocusing} />
      </SafeAreaView>}
    </SafeAreaView>
    // <View style={styles.counter}>
    //   <Countdown startSeconds={100} />
    // </View>
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
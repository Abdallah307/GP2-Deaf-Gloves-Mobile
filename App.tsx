import * as React from 'react';
import { View,Text,TextInput, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';
import axios from 'axios'
import { io } from "socket.io-client";

const socket = io("http://10.0.2.2:3000", {
  autoConnect:false
});

const App = () => {
  const [word,setWord] = React.useState('')

  React.useEffect(() => {
    socket.connect()
    socket.on("convert", (word) => {
      setWord(word)
      speak(word)
    })
  },[])


  const speak = (word:string) => {
    
    const thingToSay = word;
    Speech.speak(thingToSay,{
      language:'ar'
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.word}>{word}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031926',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word : {
    fontSize: 80,
    color:'white'
  }
});

export default App;

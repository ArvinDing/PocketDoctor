import React from 'react';
import { StyleSheet, TextInput} from 'react-native';
import {Text, View} from 'react-native';

const Form = (props) => {
   // console.log("!"+props.text+"!");
  return (
    <>
    <Text>What happened on {props.day}</Text>
      <TextInput
        multiline
        style={styles.input}
        value={props.text}
        onChangeText={props.setEatText}
        placeholder={props.placeHolder}
        numberOfLines={4}
      />
       {/* <TextInput
        multiline
        style={styles.input}
        numberOfLines={4}
      /> */}
    </>
  );
};
const styles = StyleSheet.create({
    input: {
      height: 100,
      width:300,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default Form;
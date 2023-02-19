import React, { useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet  } from 'react-native';
import Form from "./Form" 
import CalendarPage from "./Calendar"
import fetch from 'node-fetch';
import { Keyboard } from 'react-native'; 
import { TouchableWithoutFeedback } from 'react-native-web';
API_TOKEN ="";
export default function App()  {
  const calendarState=1;
  const surveyState=0;

  const [page, setPage] = useState(0);
  const [day, setDay] = useState("Today");
  const [generatedText, setGeneratedText] = useState("Have a wonderful day!");
  const [eatData,setEatData]=useState(new Map());
  const [eatText, setEatText] = useState("");
  const handleGenerateText = async () => {
    console.log("clicked")
    let ai_prompt="I am trying to eat heathier.";
    console.log(eatData)
    for (const [key, value] of eatData.entries()) {
      ai_prompt+="On "+key +" I ate "+value+".";
    }
    ai_prompt+="Any suggestions to improve my diet?"
    console.log(ai_prompt);
    const text = await getText(ai_prompt);
    console.log(text)
    setGeneratedText(text);
  };
  const day_clicked = (curr_day) => {
    var d = new Date(curr_day.year,curr_day.month-1,curr_day.day);
    const month = d.toLocaleString('default', { month: 'long' });
    const dFormatted=month + " " + d.getDate()+ ", "+  d.getFullYear() ;
    setDay(dFormatted);
    if(eatData.has(dFormatted)){
      console.log("eatData has")
      setEatText(eatData.get(dFormatted));
    }else{
      console.log("eatData doesn't ahve")
    }
   setPage(surveyState);
  }
  const getText = async (suggestion_prompt) => {
    const apiKey = API_TOKEN; // Replace with your OpenAI API key
    const url = 'https://api.openai.com/v1/completions'; 
    const prompt=suggestion_prompt
    const data = {
      model: "text-davinci-003", 
      prompt: suggestion_prompt,
      max_tokens: 50,
      stop :["."]
    };
    console.log(data)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });
    console.log(json)
    const json = await response.json();
    return json.choices[0].text.trim();
  };
  
  const survey_submit=()=>{
  //  setData(data.push("On" +day+ "this events happened."+"I ate "+eatText+"." ));
    console.log("added info for " + day+ ":"+eatText);
    setEatData(new Map(eatData.set(day, eatText)));
    setEatText("");
  }

  if(page==surveyState){
    //text description 
    return (
      
      <View style={styles.container}>
      
        <TouchableOpacity onPress={ ()=>{
          survey_submit();
          setPage(calendarState)}} style ={styles.button}>
          <Text>Go Back</Text>
        </TouchableOpacity>

        <Form placeHolder="What didya eat?" day= {day} text={eatText} setEatText={setEatText}  />
        </View>
      
      )
  }
  return   (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
   <CalendarPage day_clicked={day_clicked}/>
   <TouchableOpacity onPress={()=>{handleGenerateText()}} style={styles.button}>
    <Text>Diet Suggestions</Text>
  </TouchableOpacity>
  <Text>{generatedText}</Text>
   </View>
  );
 

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute', 
    top: 100,
    left: 20,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
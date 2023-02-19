import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, StyleSheet  } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Form from "./Form" 
import CalendarPage from "./Calendar"
export default function App()  {
  const calendarState=1;
  const surveyState=0;

  const [page, setPage] = useState(0);
  const [day, setDay] = useState("Today");

  const [data,setData]= useState([]);
  const [eatData,setEatData]=useState(new Map());
  const [eatText, setEatText] = useState("");
 
  const day_clicked = (curr_day) => {
    var d = new Date(curr_day.year,curr_day.month,curr_day.day);
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

  const survey_submit=()=>{
  //  setData(data.push("On" +day+ "this events happened."+"I ate "+eatText+"." ));
    console.log("added info for " + day+ ":"+eatText);
    setEatData(new Map(eatData.set(day, eatText)));
    setEatText("");
  }

  if(page==surveyState){
    //text description 
    return (
      <>
      <View style={styles.container}>
        <TouchableOpacity onPress={ ()=>{
          survey_submit();
          setPage(calendarState)}} style ={styles.button}>
          <Text>Go Back</Text>
        </TouchableOpacity>
        <Form placeHolder="What didya eat?" day= {day} text={eatText} setEatText={setEatText}  />
      </View>
      </>
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
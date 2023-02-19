import React from 'react';
import {Calendar} from 'react-native-calendars';

export default function CalendarPage({day_clicked}) {
  return (
      <Calendar
        onDayPress={day => {
          day_clicked(day);
        console.log('selected day', day);}}
        markedDates={{"2023-02-19":{selected:true,marked:true,selectedColor:"red"}}}
        style={{
          height: 350,
          width:400
        }}
        // Specify theme properties to override specific styles for calendar parts. Default = {}
      /> 
  );
}
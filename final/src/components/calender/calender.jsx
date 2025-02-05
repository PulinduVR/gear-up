import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styles
import '../calender/calender.css'; // Custom styles

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container-1">
      
      <Calendar
        onChange={setDate}
        value={date}
        className="small-calendar-1"
      />
    </div>
  );
};

export default MyCalendar;

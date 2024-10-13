import './calendar.css'
import Cal from 'react-calendar'
import { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar">
      <div className='heading'> CALENDAR</div>
      <div className='calendar-container'>
      <Cal onChange={setDate} value = {date}/>
      </div>
    </div> 
  );
}

export default Calendar;

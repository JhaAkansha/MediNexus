import './calendar.css'
import Cal from 'react-calendar'
import { useState } from 'react';	
//import 'react-calendar/dist/Calendar.css';

/* for more info refer: https://www.copycat.dev/blog/react-calendar/ */

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar">
      <div className='calendar-heading'> CALENDAR</div>
      <div className='calendar-container'>
      <Cal onChange={setDate} value = {date}/>
      </div>
    </div> 
  );
}

export default Calendar;

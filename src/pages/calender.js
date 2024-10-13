import './calendar.css'
import Cal from 'react-calendar'
import { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar">
      <div className='heading'> CALENDAR</div>
      <Cal onChange={setDate} value = {date}/>
    </div>
  );
}

export default Calendar;

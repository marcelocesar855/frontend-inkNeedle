import { Calendar, momentLocalizer } from 'react-schedule-calendar'
import moment from 'moment'
 
//const localizer = momentLocalizer(moment);

export default Agenda = props => (
  <div>
    <Calendar
     // localizer={localizer}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
  )
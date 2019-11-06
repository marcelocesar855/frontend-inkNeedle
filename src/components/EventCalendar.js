import React, {Component} from 'react';
import '../styles/General.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

    export default class EventCalendar extends Component {

        render () {
            return(
                <FullCalendar defaultView="dayGridMonth"
                plugins={dayGridPlugin }
                weekends={false}
                events={[
                  { title: 'event 1', date: '2019-04-01' },
                  { title: 'event 2', date: '2019-04-02' }
                ]} />
            )
        }

    }
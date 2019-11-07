import React, {Component} from 'react';
import '../styles/General.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../styles/Agenda.css';
import { nextTick } from 'q';

    export default class EventCalendar extends Component {

        render () {
            return(
                <FullCalendar defaultView="dayGridMonth"
                plugins={ [dayGridPlugin] } buttonText={{today : 'Hoje'}}
                header={{center : 'title', left : 'myCustomButton', right : 'today, ,prev,next'}}
                weekends={false} locale="pt-BR" weekends='true' fixedWeekCount={false}
                customButtons = {{
                    myCustomButton: {
                      text: 'Agendar sessão',
                      click: function() {
                        alert('clicked the custom button!');
                      }
                    }
                  }}
                events={[
                    { title: '19:30h - Rodrigo Fonseca', date: '2019-11-01' },
                    { title: '15:30h - Jessica Valadão', date: '2019-11-01' },
                    { title: '19:30h - Rodrigo Fonseca', date: '2019-11-01' },
                    { title: '15:30h - Jessica Valadão', date: '2019-11-01' }
                  ]} 
                />
            )
        }

    }
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import { addHours} from 'date-fns'
import { Navbar, CalendarModal , CalendarEvent, FabAddNew, FabDelete } from "../"
import { localizer, getMessagesEs } from '../../helpers'
import { useEffect, useState } from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'


export const CalendarPage = () => {
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const {openDateModal} = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  

  const eventStyleGetter = ( event, start, end, isSelected) => {

    // console.log({event, start, end, isSelected})

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color:'white'
    }

    return {
      style
    }

  }

  const onDoubleClick = ( event ) => {
      // console.log({doubleClick:event})
      openDateModal()
  }

  const onSelect = ( event ) => {
    console.log({click:event})
    setActiveEvent(event)

  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  useEffect(() => {
      startLoadingEvents()
  }, []);

  return (
    <>
      <Navbar/>
      
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}

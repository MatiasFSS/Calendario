import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers"

export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        if(calendarEvent._id){
            //actualizando
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            //creando
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({...calendarEvent, id:data.evento.id, user}))
        }

    }

    const startDeletingEvent = () => {
        //Llegar al backend
        dispatch(onDeleteEvent())
    }

    const startLoadingEvents = async() => {
        try {

            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.eventos)
            dispatch(onLoadEvents(events))
            
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }
    


    return {
        //propiedades
        events, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
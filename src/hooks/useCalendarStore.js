import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice"

export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch()


    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }


    return {
        //propiedades
        events, 
        activeEvent,

        //metodos
        setActiveEvent,
    }
}
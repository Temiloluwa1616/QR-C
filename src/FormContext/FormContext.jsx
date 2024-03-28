import { useReducer } from "react";

export const INITS_STATE = {
    name: "",
    phone: '',
    email: '',
    duration: '',
    loading: true,
    error:false
}

export function FormContext(){
    switch(action,type){
        case 'START FETCH':
        return{
            ...state,
            loading:true,
            error:false
        }
        break

        case 'DATA FETCHED':
            return{
                ...state,
                [action.field]: action.payload,
                loading: false,
                error: false
            }

            case 'RESET':
            return{
                ...state
            }

            case "ERROR":
        return{
            ...state,
            error:true,
            loading: false
        }

        default:
            return state

            break
    }
}
import { combineReducers, createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'

const psupassport = {
    id: null,
    username: null,
    surname: null
}

export const listAction = {
    login: (login) => async (dispatch) => {
        const res = await axios.post(`https://psupassport.herokuapp.com/login`, { ...login });
        console.log(res.data);
        const [id, name, surname] = [...res.data.GetStaffDetailsResult.string]
        dispatch({ type: 'LOGIN', id: id, username: name, surname: surname })
    },
    logout: () => async (dispatch) => {
        dispatch({ type: 'LOGOUT' })
    }
}



const loginReducer = (data = psupassport, action) => {
    switch (action.type) {
        case 'LOGIN':

            return {
                ...data,
                id: action.id,
                username: action.username,
                surname: action.surname
            }
        case 'LOGOUT':
            return {
                ...data,
                id: null,
                username: null,
                surname: null
            }
        default:
            return data
    }
}
const rootRedux = combineReducers({
    login: loginReducer
})

const store = createStore(rootRedux, applyMiddleware(thunk));

export default store
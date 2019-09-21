import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function user(state = { ProfileImages : []}, action) {

    switch (action.type) {
        case 'get':
            console.log(action.payload)
            return state = action.payload
        case 'getImages':
                state.ProfileImages = action.payload1
                console.log(state)
                    return state  = state
            
        default:
            return state
    }
}

let store = createStore(user, applyMiddleware(thunk))
export default store
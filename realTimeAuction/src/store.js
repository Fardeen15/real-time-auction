import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function user(state = {}, action) {

    switch (action.type) {
        case 'get':
            
            return state = action.payload
        case 'Add':
            if (Object.values(state.usersPosts)) {
                Object.values(state.usersPosts).push(action.payload)
                return { UsersPost: state.UsersPost }
            }
        // case 'Delete':
        //     state.user.splice(action.payload, 1)
        //     return { user: state.user }
        // case 'Edit':
        //     state.user.splice(action.payload.index, 1, action.payload.value)
        //     return { user: state.user }
        default:
            return state
    }
}

let store = createStore(user, applyMiddleware(thunk))
export default store
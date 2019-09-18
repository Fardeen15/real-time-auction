import { db } from "../firebaseConfige"

export function Edit(payload) {
    console.log(payload)
    return {
        type: "Edit",
        payload
    }
}
function addInstore(payload) {
    return
}
export function add(payload) {
    return (dispatch) => {

        db.ref().child('user').child(`${payload.fname}${payload.lname}`).set(payload).then(() => {
            dispatch({
                type: "Add",
                payload
            })
        })
    }
}
export function Delete(payload) {
    return {
        type: "Delete",
        payload
    }
}
function Get(payload) {
    return {
        type: "get",
        payload
    }
}
export function GetData(payload) {
    db.ref().child('user').on((snap) => {
        console.log(snap.val())
    })
}

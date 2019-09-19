import { db, auth } from "../firebaseConfige"

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
    var date = new Date()
    var year = date.getFullYear()
    var mnth = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    var milisec = date.getMilliseconds()
    var newDate = `${year}${mnth}${day}${hour}${min}${sec}${milisec}`
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('wholeData').child('user').child(user.uid).child('Pposts').child(datefn()).set(payload)
                    .then(() => {
                        db.ref().child('wholeData').child('usersPosts').child(datefn()).set(payload).then(() => {
                            dispatch({
                                type: "Add",
                                payload: { [datefn()]: payload }

                            })
                        })
                    })
            }
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
function Get1(payload1) {
    return {
        type: "get",
        payload1
    }
}
export function GetData() {
    return (dispatch) => {
        db.ref().child('wholeData').on('value', (snap) => {
            if (snap.val()) {

                dispatch({
                    type: "get",
                    payload: snap.val()
                })
            }
        })
    }

}

export function datefn() {
    var date = new Date()
    var year = date.getFullYear()
    var mnth = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()
    var milisec = date.getMilliseconds()
    return `${year}${mnth}${day}${hour}${min}${sec}${milisec}`

}
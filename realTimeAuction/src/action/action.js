import { db, auth, storage } from "../firebaseConfige"
import { message } from "antd"

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
        auth.onAuthStateChanged((user) => {
            if (user) {
                // console.log(payload.imageFile)
                db.ref().child('wholeData').child('user').child(user.uid).child('Pposts').child(datefn()).set(payload)
                    .then(() => {
                        for (let i = 0; i < payload.imageFile.length; i++) {
                            storage.ref(`postImages/${payload.categeroy}/${user.uid}/${payload.imageFile[i].name}`).put(payload.imageFile[i].originFileObj)
                        }
                        db.ref().child('wholeData').child('usersPosts').child(payload.categeroy).child(datefn()).set(payload).then(() => {
                            GetData()
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
        type: "getImages",
        payload1
    }
}
export function GetData() {
    return (dispatch) => {
        db.ref().child('wholeData').on('value', (snap) => {
            if (snap.val()) {
                var data = snap.val()
                storage.ref('profileImages/').listAll().then((res) => {
                    console.log(res)
                    data.ProfileImages = res
                    storage.ref('postImages/').listAll().then((res2) => {
                        res2.prefixes.forEach((folderRef) => {
                            // All the prefixes under listRef.
                            storage.ref(folderRef.fullPath).listAll().then((res3) => {
                                res3.prefixes.forEach((folderRef) => {
                                    storage.ref(folderRef.fullPath).listAll().then((res4) => {
                                        data.postImg = res4
                                        dispatch({
                                            type: "get",
                                            // payload1: getImages,
                                            payload: data
                                        })
                                    })
                                })
                            })
                        })

                    })

                })
            }
        })
    }

}
export function update(index, id, data, Pinfo) {
    if (index && id && data) {

        auth.onAuthStateChanged((user) => {
            if (user) {
                if (!data.comment) {

                    db.ref().child('wholeData').child('usersPosts').child(id).child(index).update(data).then(() => {
                        db.ref().child('wholeData').child('usersPosts').child(id).child(index).child('comment').child(datefn()).set(Pinfo).then(() => {
                            message.success('your bid send')
                            GetData()
                        })
                    })
                } else if (data.comment) {
                    db.ref().child('wholeData').child('usersPosts').child(id).child(index).child('comment').child(datefn()).set(Pinfo).then(() => {
                        message.success('your bid send')
                        GetData()
                    })
                }
            }
        })
    } else {
        console.log(index, id, data,Pinfo)
    }
}

// export function datefn() {
//     var date = new Date()
//     var year = date.getFullYear()
//     var mnth = date.getMonth() + 1
//     var day = date.getDate()
//     var hour = date.getHours()
//     var min = date.getMinutes()
//     var sec = date.getSeconds()
//     var milisec = date.getMilliseconds()
//     return `${year}${mnth}${day}${hour}${min}${sec}${milisec}`

// }
function makingLength_2(value, miliseconds){
    if (miliseconds === "miliseconds") {
        value = value.toString()
        let correctValue = value.length === 1 ? "00" + value : value.length === 2 ? "0" + value : value
        // console.log(correctValue)
        return correctValue

    } else {

        value = value.toString()
        let correctValue = value.length === 1 ? "0" + value : value
        // console.log(correctValue)
        return correctValue
    }
}

export function datefn()  {
    let d = new Date()
    let year = d.getFullYear()
    let month = makingLength_2(d.getMonth() + 1)
    let date = makingLength_2(d.getDate())
    let hours = makingLength_2(d.getHours())
    let mintues = makingLength_2(d.getMinutes())
    let seconds = makingLength_2(d.getSeconds())
    let miliSeconds = makingLength_2(d.getMilliseconds(), "miliseconds")
    let entryNo = year.toString() + month.toString() + date.toString() + hours.toString() + mintues.toString() + seconds.toString() + miliSeconds.toString()
    // console.log(entryNo)
    return entryNo

}
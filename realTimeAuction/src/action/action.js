import { db, auth, storage } from "../firebaseConfige"

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
                // dispatch({
                //     type: "get",
                //     payload: snap.val()
                // })
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
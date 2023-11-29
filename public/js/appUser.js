import UserClass from "./userClass.js"
import { declareEvents } from "./events.js"

const init = () => {
    doApi()
    declareEvents()
}

export const doApi = async () => {
    let url = "https://test-rivka.onrender.com/user/"
    let resp = await axios.get(url);
    createTable(resp.data)
}

export const addToUsers = async (_country) => {
    let Murl = "https://test-rivka.onrender.com/user/"
    try {
        let resp = await axios({
            url: Murl,
            method: "POST",
            data: JSON.stringify(_country),
            headers: { 'content-type': "application/json" }
        })
        if (resp.data._id) {
            console.log(resp)
            doApi()
        }
    }
    catch (err) {
        console.log(err)
    }
}
const funcDelete = async (_id) => {

    let url = `https://test-rivka.onrender.com/user/${_id}`;
    try {
        let resp = await axios({
            url: url,
            method: "DELETE",
            headers: {
                'content-type': "application/json"
            }
        })
        if (resp.data.deletedCount != 1) {
            alert(resp.data.deletedCount)
        }
    }
    catch (err) {
        console.log(err);
        alert("There problem, come back later")
    }
     doApi()
}

const createTable = (_ar) => {
    document.querySelector("#id_tbody").innerHTML = ""
    _ar.forEach((item, i) => {
        let us = new UserClass("#id_tbody", item, i, funcDelete)
        us.render()
    });
}
init()
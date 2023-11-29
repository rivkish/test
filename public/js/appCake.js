import CakeClass from "./cakeClass.js"
import { declareEvents } from "./eventsCake.js"

const init = () => {
    doApi()
    declareEvents()
}

export const doApi = async () => {
    // let url = "http://localhost:3000/cake/"
    let url = "https://test-rivka.onrender.com/cake/"
    let resp = await axios.get(url);
    createTable(resp.data)
}

export const login=async(_userLogin)=>{
// let url="http://localhost:3000/user/login"
let url="https://test-rivka.onrender.com/user/login"
try {
    let resp = await axios({
        url: url,
        method: "POST",
        data: JSON.stringify(_userLogin),
        headers: { 'content-type': "application/json" }
    })
    if (resp.data.token) {
        localStorage.setItem("token",resp.data.token)
        alert("You've logged in successfully")
    }
}
catch (err) {
    console.log("catch")

  alert(err.response.data.msg)
}
}

export const addToCakes = async (_cake) => {
    // let Murl = "http://localhost:3000/cake/"
    let Murl = "https://test-rivka.onrender.com/cake/"
    if(!localStorage.getItem("token")){
        alert("you need to login")
        return
    }
    try {
        let resp = await axios({
            url: Murl,
            method: "POST",
            data: JSON.stringify(_cake),
            headers: { 'content-type': "application/json",'x-api-key':localStorage.getItem("token") }
        })
        if (resp.data._id) {
            console.log(resp)
        }

    }
    catch (err) {
        console.log(err)
    }


}
const funcDelete = async (_id) => {
    if(!localStorage.getItem("token")){
        alert("you need to login")
        return
    }
    // let url = `http://localhost:3000/cake/${_id}`;
    let url = `https://test-rivka.onrender.com/cake/${_id}`;
    try {
        let resp = await axios({
            url: url,
            method: "DELETE",
            headers: {
                'content-type': "application/json",'x-api-key':localStorage.getItem("token") 
            }
        })
        if (resp.data.deletedCount != 1) {
            alert("You can't delete a cake you didn't create")
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
        let cake = new CakeClass("#id_tbody", item, i, funcDelete)
        cake.render()
    });
}


init()
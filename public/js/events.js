
import {doApi,addToUsers} from "./appUser.js";


export const declareEvents = () => {
    let id_form = document.querySelector('#id_form')

    id_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let user = {
            name: document.querySelector('#input_name').value,
            email: document.querySelector('#input_email').value,
            password: document.querySelector('#input_password').value
            // date_created: document.querySelector('#input_date').value,
        }
   
        if(document.querySelector('#input_date').value!=""){
            user.date_created=new Date(document.querySelector('#input_date').value)
        }
        addToUsers(user)
        
        document.querySelector('#input_name').value = ""
        document.querySelector('#input_email').value = ""
        document.querySelector('#input_password').value = ""
        document.querySelector('#input_date').value = ""
        
    })
}

import {doApi,addToCakes,login} from "./appCake.js";


export const declareEvents = () => {
    let id_form = document.querySelector('#id_form')
    let id_login = document.querySelector('#id_login')

    id_login.addEventListener("submit", function (e) {
        e.preventDefault();
        let userLogin = {
            email: document.querySelector('#input_email').value,
            password: document.querySelector('#input_password').value
        }
        login(userLogin)
        
        document.querySelector('#input_email').value = ""
        document.querySelector('#input_password').value = ""
        doApi()
    })


    id_form.addEventListener("submit", function (e) {
        e.preventDefault();
        let cake = {
            name: document.querySelector('#input_name').value,
            cals: document.querySelector('#input_cals').value,
            price: document.querySelector('#input_price').value,
            // img: document.querySelector('#input_img').value,
        }
        if(document.querySelector('#input_img').value!=""){
            cake.img=document.querySelector('#input_img').value
        }
        addToCakes(cake)
        
        document.querySelector('#input_name').value = ""
        document.querySelector('#input_cals').value = ""
        document.querySelector('#input_price').value = ""
        document.querySelector('#input_img').value = ""
        doApi()
    })
}
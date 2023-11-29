const main =require("./index.js")
const user =require("./users.js")
const cake =require("./cakes.js")
const country =require("./countries.js")




exports.routesInit=(app)=>{
    app.use("/",main)
    app.use("/user",user)
    app.use("/cake",cake)
    app.use("/country",country)


}
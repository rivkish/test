const main =require("./index.js")
const user =require("./users.js")
const cake =require("./cakes.js")




exports.routesInit=(app)=>{
    app.use("/",main)
    app.use("/user",user)
    app.use("/cake",cake)


}
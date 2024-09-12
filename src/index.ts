import server from "./server"
import colors from "colors"




const port = process.env.PORT || 8080

server.listen(port, ()=>{
    console.log(colors.red.cyan.bold (`Server running on PORT ${port}`))
})
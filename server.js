const { request, response } = require("express");
const express = require("express");
const port = process.env.PORT || 3000
console.log(express);
const server =express()
 const theAnswer="tacos";
server.get("/guess/:word", (request,response) => {
    const userword = request.params.word;
    let answer =[];
    for(let i = 0; i < userword.length; i++) {
       const ch = userword[i];
       if(ch == theAnswer[i]){
        answer.push(1);
       }
       else if (theAnswer.includes(ch)){
        answer.push(0);
       }
       else{
        answer.push(-1);
       }
    }
    response.json(answer)
});

server.use(express.static("public")); 

server.listen(port, () => {
 console.log("server is running on port 3000");
});

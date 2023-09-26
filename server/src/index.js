const express = require("express");
const mongoose=require("mongoose");
const DB="mongodb+srv://shivam316:pigmentation316@cluster0.kxg3ivw.mongodb.net/database?retryWrites=true&w=majority"
const User=require("./userschema");
const PORT=process.env.PORT || 3000

mongoose.connect(DB ).then(()=>{
  console.log("Success");
}).catch((err)=>{console.log(err)});

const OPENAI_API_KEY = "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"
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


let title;
let story;

const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});

app.post("/fav",(req,res)=>{
  

  //pushing to db
  console.log("Im here")
  ans="this is the story generated"
  const user=new User({usermessage:title,openaimessage:story});
 
  user.save()


})
app.post("/chat", (req, res) => {
  console.log("Its chat")
  const question = req.body.question;
  let answer=req.body.answer;

  // REMOVE COMMENTS WHEN API KEY is updated 


  // openai
  //   .createCompletion({
  //     model: "text-davinci-003",
  //     prompt: question,
  //     max_tokens: 4000,
  //     temperature: 0,
  //   })
  //   .then((response) => {
  //     console.log({ response });
  //     return response?.data?.choices?.[0]?.text;
  //   })
  //   .then((answer) => {
  //     console.log({ answer });
  //     const array = answer
  //       ?.split("\n")
  //       .filter((value) => value)
  //       .map((value) => value.trim());

  //     return array;
  //   })
  //   .then((answer) => {
  //     res.json({
  //       answer: answer,
  //       propt: question,
  //     });
  //   });
  
    title=question;
    answer="this is OPENAI CALL"
    story=answer;
  console.log({ question });
  console.log({answer});
  

});

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});

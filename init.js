const mongoose = require('mongoose');
const Chat=require("./models/Schema.js");

main()
.then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchat=[
    {
         from:"Rani",
    to:"Tina",
    msg:"How are you tina",
    created_at:new Date(),
    },
     {
         from:"Laalu",
    to:"Kaalu",
    msg:"Kaare Kalluaa ",
    created_at:new Date(),
    },
     {
         from:"Mohit",
    to:"Rakhi",
    msg:"Love you bab's",
    created_at:new Date(),
    },
     {
         from:"mona",
    to:"sona",
    msg:"how's your wife",
    created_at:new Date(),
    },
     {
         from:"Sohan",
    to:"Rohan",
    msg:"Let code together",
    created_at:new Date(),
    },
    
];

Chat.insertMany(allchat);




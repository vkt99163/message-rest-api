const express = require("express");
const app = express();
const path = require("path")
const mongoose = require('mongoose');
const Chat = require("./models/Schema.js");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
main()
    .then(() => {
        console.log("connection successful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
app.get("/", (req, res) => {
    res.send("root is working")
});
// 
//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});
//New chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
});
//Create Route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
    });
    newChat.save().then(res => {
        console.log("added chat successfully")
    }).catch(err => { console.log(err) })
    res.redirect("/chats");
})


//edit get route:
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs", { chat });
});
//update route:
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let {msg: newMsg} = req.body;
    let updatedmsg = await Chat.findByIdAndUpdate(id,
        { msg: newMsg },
        { runValidators: true, new: true })
    console.log(updatedmsg);
    res.redirect("/chats")
});


//delete chat:
app.delete("/chats/:id/", async (req, res) => {
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id)
    console.log(deletedchat)
     res.redirect("/chats");
});

app.listen(8080, () => {
    console.log("app is listening port:8080");
})



















































// const chat1= new Chat({
//     from:"Shahila",
//     to:"Rahula",
//     msg:"How are you Rahula",
//     created_at:new Date(),
// });
// chat1.save() .then( (res)=>{  //UTC
//     console.log(res)
// });
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
// app.get("/users", (req, res) => {
//     res.send("Hello World");
// });

app.use(express.json());

const users = [];
app.get("/users", (req, res) => {
    res.json(users);
});

// app.post("/users", (req, res) => {
//     const user = {name:req.body.name, password:req.body.password};
//     users.push(user);
//     res.status(201).send("success");
// });

app.post("/users", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const user = {name:req.body.name, password:hashedPassword};
        users.push(user);
        res.status(201).send("success");
    } catch {
        res.status(500).send();
    }
});
// try this later
app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if(user == null){
        return res.status(400).send("Cannot find user");
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send("Success");
        } else {
            res.send("Not Allowed");
        }
    } catch {
        res.status(500).send();
    }
});

app.listen(3000);
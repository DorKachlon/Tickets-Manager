const express = require("express");
const app = express();
const fs = require("fs").promises;

const filePath = "./data.json";

app.use(express.static("../client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//http://localhost:8080/api/tickets?searchText=Need+a+Little
app.get("/api/tickets", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const searchText = req.query.searchText;
    console.log(searchText);
    if (searchText) {
        const filterArr = arr.filter((obj) =>
            obj.title.toLowerCase().includes(searchText.toLowerCase())
        );
        res.send(filterArr);
    } else {
        res.send(arr);
    }
});

app.post("/api/tickets/:ticketId/done", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const index = arr.findIndex((obj) => obj.id === req.params.ticketId);
    arr[index].done = true;
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});

app.post("/api/tickets/:ticketId/undone", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const index = arr.findIndex((obj) => obj.id === req.params.ticketId);
    arr[index].done = false;
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});

module.exports = app;

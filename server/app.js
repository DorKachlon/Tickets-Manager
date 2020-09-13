const express = require("express");

const app = express();
const fs = require("fs").promises;

const filePath = "./data.json";

app.use(express.static("../client/build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:8080/api/tickets?searchText=Need+a+Little
// http://localhost:8080/api/tickets?searchContent=my+code+to+display+commas
// http://localhost:8080/api/tickets?Email=jug%40nesetal.af
app.get("/api/tickets", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const { searchText } = req.query;
    const { searchContent } = req.query;
    const email = req.query.Email;
    if (searchText) {
        const filterArr = arr.filter((obj) =>
            obj.title.toLowerCase().includes(searchText.toLowerCase())
        );
        res.send(filterArr);
    } else if (searchContent) {
        const filterArr = arr.filter((obj) =>
            obj.content.toLowerCase().includes(searchContent.toLowerCase())
        );
        res.send(filterArr);
    } else if (email) {
        const filterArr = arr.filter((obj) =>
            obj.userEmail.toLowerCase().includes(email.toLowerCase())
        );
        res.send(filterArr);
    } else {
        res.send(arr);
    }
});

app.get("/api/tickets/done", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const filterArr = arr.filter((obj) => obj.done);
    res.send(filterArr);
});

app.get("/api/tickets/undone", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const filterArr = arr.filter((obj) => !obj.done);
    res.send(filterArr);
});
app.get("/api/tickets/deleted", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const filterArr = arr.filter((obj) => obj.delete);
    res.send(filterArr);
});
app.get("/api/tickets/hided", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const filterArr = arr.filter((obj) => obj.hide);
    res.send(filterArr);
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

app.post("/api/tickets/:ticketId/delete", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const index = arr.findIndex((obj) => obj.id === req.params.ticketId);
    arr[index].delete = true;
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});
app.post("/api/tickets/:ticketId/undelete", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const index = arr.findIndex((obj) => obj.id === req.params.ticketId);
    arr[index].delete = false;
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});

app.post("/api/tickets/:ticketId/hide", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    const index = arr.findIndex((obj) => obj.id === req.params.ticketId);
    arr[index].hide = true;
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});

app.post("/api/tickets/UnHideAll", async (req, res) => {
    const content = await fs.readFile(filePath);
    const arr = JSON.parse(content);
    for (let obj of arr) {
        if (obj.hide === true) {
            obj.hide = false;
        }
    }
    await fs.writeFile(filePath, JSON.stringify(arr));
    res.send({ updated: true });
});

module.exports = app;

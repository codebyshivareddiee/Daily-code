const express = require("express");
const { loadTodos, saveTodos } = require('./todos');

const app = express();
app.use(express.json());

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
/// get all todos listed  
app.get('/userid/:userid/todos', function (req, res) {
    const userid = Number(req.params.userid);
    const allUsers = loadTodos();
    console.log(userid);
    const user = allUsers.find(u => u.User_id === userid);
    
    if (user) {
        return res.json(user.todos);
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});
//get todo with id into the user account 
app.get('/userid/:userid/todos/:todoid', function (req, res) {
    const userid = Number(req.params.userid);
     const todoid = req.params.todoid;
    const allUsers = loadTodos();
    const user = allUsers.find(u => u.User_id === userid);
    if (user) {
        const todo = user.todos.find(todo=> todo.id === todoid);
        if(todo) return res.json(todo);
        return res.status(404).json({ message: "Todo not found" });
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});
//to post or create a todo from body as input 
app.post('/userid/:userid/todos', function (req, res) {
    const todoid = generateId();
    const userid=Number(req.params.userid);
    const todo = req.body;
    const allUsers = loadTodos();
    console.log(userid);
    const user = allUsers.find(u => u.User_id === userid);
    if (user) {
        if (todo == null) return res.status(400).json({ message: "received null todo" });
        user.todos.push({"id":todoid,"todo_details":todo});
        saveTodos(allUsers);
        return res.json({ message: `Added !! with id ${todoid}` });
    } else {
        return res.status(404).json({ user: "User not found" });
    }
});
// to delete a todo with todo id from the user account
app.delete('/userid/:userid/todos/:todoid', function (req, res) {
    const userid = Number(req.params.userid);
    const todoid = req.params.todoid;
    const allUsers = loadTodos();
    const user = allUsers.find(u => u.User_id === userid);
    if (user) {
        const exists = user.todos.some(todo => todo.id === todoid);
        if (exists){ 
            const updated = user.todos.filter(todo => todo.id !== todoid);
            user.todos=updated;
        }
        else return res.status(404).json({ message: "todo not found" });
        saveTodos(allUsers);
        return res.json({ message: "Deleted !!" })
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});
//to update the todo using id
app.put('/userid/:userid/todos/:todoid', function (req, res) {
    const userid = Number(req.params.userid);
    const todoid = req.params.todoid;
    const newDetails = req.body.todo_details;

    let allUsers = loadTodos();
    let user = allUsers.find(u => u.User_id === userid);

    if (user) {
        const todoToUpdate = user.todos.find(t => t.id === todoid);
        if (todoToUpdate) {
            todoToUpdate.todo_details = newDetails;
            saveTodos(allUsers);
            return res.json({ message: "Updated !!" });
        } else {
            return res.status(404).json({ message: "Todo not found" });
        }
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

const fs = require('fs');
const path = './node_modules/todos.json';

function loadTodos() {
    try {
        let data = fs.readFileSync(path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return [];
    }
}

function saveTodos(todos) {
    fs.writeFileSync(path, JSON.stringify(todos, null, 2));
}

module.exports = { loadTodos, saveTodos };

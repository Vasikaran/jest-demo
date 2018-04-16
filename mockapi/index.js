const fs = require('fs');
const path = require('path');

let todos = require('./todos.json').todos;

let todoFilePath = path.join(__dirname, 'todos.json');

fs.watchFile(todoFilePath, () => {
  todos = JSON.parse(fs.readFileSync(todoFilePath).toString()).todos;
});

let getTodosBySearchString = (todos, searchString) => {
  return todos.filter(todo => {
    return todo && todo.indexOf(searchString) !== -1;
  });
};

let updateTodo = () => {
  fs.writeFileSync(todoFilePath, JSON.stringify({ todos: todos }));
};

let addTodo = todo => {
  todos.push(todo);
  updateTodo();
};

let removeTodo = index => {
  todos.splice(index, 1);
  updateTodo();
};

module.exports = app => {
  app.get('/api/v1/todos', (req, res) => {
    res.send(JSON.stringify(todos));
  });

  app.get('/api/v1/getFilteredTodos', (req, res) => {
    let { searchString } = req.query;
    res.send(JSON.stringify(getTodosBySearchString(todos, searchString)));
  });

  app.post('/api/v1/addTodo', (req, res) => {
    let { todo } = req.body;
    addTodo(todo);
    res.status(200).end();
  });

  app.post('/api/v1/removeTodo', (req, res) => {
    let { todoIndex } = req.body;
    removeTodo(todoIndex);
    res.status(200).end();
  });
};

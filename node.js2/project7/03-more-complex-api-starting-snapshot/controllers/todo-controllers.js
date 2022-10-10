const Todo = require('../models/Todo');

async function getAllTodos(req, res, next) {
	try {
		const allTodos = await Todo.getAllTodos();
	} catch (error) {
		return next(error);
	}

	return res.json({ todos: allTodos });
}

async function addTodo(req, res, next) {
	const text = req.body.text;
	const todo = new Todo(text);
	let insertedId;
	try {
		const result = await todo.save();
		insertedId = result.insertedId;
	} catch (error) {
		return next(error);
	}

	todo.id = insertedId.toString();

	return res.json({ message: 'Todo successfully added', createdTodo: todo });
}

function updateTodo() {}

function deleteTodo() {}

module.exports = {
	getAllTodos,
	addTodo,
	updateTodo,
	deleteTodo,
};

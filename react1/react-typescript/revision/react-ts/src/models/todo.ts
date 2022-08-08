class Todo {
	id: string = new Date().toISOString();
	constructor(public text: string) {}
}

export default Todo;

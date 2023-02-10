class Todo {
	id: string;
	todoText: string;

	constructor(text: string) {
		this.todoText = text;
		this.id = new Date().toISOString();
	}
}

export default Todo;

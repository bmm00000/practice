class Todo {
	id: string;
	text: string;

	constructor(todoText: string) {
		this.text = todoText;
		this.id = new Date().toISOString();
	}

	// with vanilla js, you would have only the constructor in this class. but with ts, you also have to define those properties ahead of time, to make it clear what type of values will be stored in there.
}
// for the different attributes that you want to add to the class, in ts you don't need to add them in the constructor function (as you would in vanilla js), but you can just add them directly into the class.

// if you don't add the constructor, you will get a warning, since the class is meant to be instantiated, but the properties that you set in the class never received a value. therefore, you make sure they receive a value by adding a constructor.

export default Todo;

// we describe here the different data models that we use in our project. note that we are not creating a component here, and we don't return jsx. therefore, we don't need to name it with capital letter, or add '.tsx' at the end of the file name (we could use the following keyords here: 'type', 'interface' or 'class'. we will use 'class', but the other approaches would also work)

// when you define a class, it doesn't only act as a constructor function that you can call to create new objects, but also as a type! (you can use your class name as a type)

import { useRef } from 'react';

import classes from './NewTodo.module.css';

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
	// onAddTodo is a function that has a string as a parameter, and doesn't return anything (it would technicaly return 'undefined'), this is the type that we are specifying above.
	const todoTextInputRef = useRef<HTMLInputElement>(null);
	// if we don't specify the type of element where we are going to use the useRef, we will get an error in the 'ref' property of the jsx below (because you could have used the object returned by useRef in ANY kind of element). we solve this with a generic type: useRef is actually a generic type out of the box, so you use the <> to set the concrete type of ref that you want to create in this instance: we have to specify which concrete value or html element we plan on storing on this specific ref object that we are creating here. all dom elements have built in types that you can use in ts to refer to them (if you look up in mdn, you can find in which interfaces are the dom elements based on, eg. HTMLButtonElement, etc.). we need to add a start value between the brackets, because this ref could be assigned to some other element, that's why, since we don't have any connection at the beginning, we use 'null' (we don't have any initial value at the beginning, and we have to be explicit about it)

	const submitHandler = (event: React.FormEvent) => {
		// if we used React.MouseEvent, we would get an error below in 'onSubmit', becuase the 'onSubmit' property expects a function with a FormEvent object as a parameter, since this is a form.
		event.preventDefault();

		// const enteredValue = todoTextInputRef.current?.value;
		// under 'current' the IDE gives you all the possible keys that an input object has, since we know that we are working with an input. but the 'ref' is not necessarily set to a value yet when we use it (here, it will always be set to a value because this function will be called only when the form is submitted, but what if we tried to extract the value outside of this function, for example? in that case, the ref would not be connected yet). that's why we use the ?: if there's a 'current' property in the object, then the 'value' will be stored in the variable. otherwise, null will be stored in the value. that's why the inferred type of enteredValue (when we scroll over the mouse) is string | undefined (in this situation, undefined is basically the same as null).
		// but since you are sure that there will be a value (it will never be null or undefined) (since we are only calling the function when we submit the form):
		const enteredText = todoTextInputRef.current!.value;
		// note that both operators '?' and '!' are from ts.

		if (enteredText.trim().length === 0) {
			// we could throw an error here
			return;
		}

		props.onAddTodo(enteredText);
	};

	return (
		<form onSubmit={submitHandler} action='' className={classes.form}>
			<label htmlFor='text'>Todo Text</label>
			<input type='text' id='text' ref={todoTextInputRef} />
			<button>Add Todo</button>
		</form>
	);
};

export default NewTodo;

import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();

	function submitHandler(event) {
		// for all event listeners, react will pass authomatically an 'event' argument to the function that is executed for those events.
		event.preventDefault();
		// we preventDefault because we don't want an http request to be sent.

		const enteredTitle = titleInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

		const meetupData = {
			title: enteredTitle,
			image: enteredImage,
			address: enteredAddress,
			description: enteredDescription,
		};

		props.onAddMeetup(meetupData);
	}

	return (
		<Card>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Meetup Title</label>
					<input type='text' id='title' required ref={titleInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='image'>Meetup Image</label>
					<input type='url' id='image' required ref={imageInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='address'>Address</label>
					<input type='text' id='address' required ref={addressInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='description'>Description</label>
					<textarea
						name=''
						id='description'
						rows='5'
						required
						ref={descriptionInputRef}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Add Meetup</button>
					{/* this is regular html: the button will submit the form and we can later listen to that submit event, if you don't want to do that, you can use 'type="button"'. */}
				</div>
			</form>
		</Card>
	);
}

export default NewMeetupForm;

// we will send the data to a database in a backend server. otherwise, if we just store the data in memory, any data is lost if we reload the page, because the js application restarts and the previous state is lost

// we are inserting urls of images that already exist in some server. if you want to learn how to upload files, that's not much of a react task, but more of a backend server task:
//academind.com/tutorials/reactjs-image-upload
//academind.com/tutorials/connect-to-database

// to handle the form submission, we have to do two main things: we have to listen to the form submission, and to prevent the browser default to send an http request authomatically (and hence reload the page), so we can handle the submission with react

// in order to read we the user inputs, we could use the 'onChange' event listener on the inputs and then change state with what the user inputs (as we have done before). however, we are only interested in the final inputs that we have when the user submits (only once, not every time the user changes something on the inputs). therefore, we use the concept of 'ref' I(this is another hook: a built in special function offered by react that we can use in our functional components)(react allows us to set references to dom elements, so we can have access to them).
// when you execute 'useRef()', you create a reference object. to connect this reference object to the dom element, you use another special prop which is built into react and supported by all elements ('ref'). All reference objects have a 'current' property that holds the js representation of the input element object, and all those input elements have a value property (the js object representing an input element has a 'value' property, and that's the current input that the user entered, that's how js works). we could also change it like this: titleInputRef.current.value = 'some new value', but we don't do that, if we want to change what's rendered on the screen, we use state, we only use useRef for reading input

// in spa applications, you need a backend api to which you can send your requests, a backend which will not send back html, but which expects data in a certain format (usually json), and which returns data (in json format), and which typically exposes a couple of urls to which you can send requests, and depending on which url you are sending a request to, different things will happen, that's the kind of backend you typically connect to with react. you don't connect an spa application (like react or angular) to a database itself because of security reasons. all the react code of your app is exposed to the visitors (dev tools>sources, here you can see the js code that makes our app, and database credentials would be there as well, if we connected our app to a database directly). that's why we need a backend api to which we can send requests, and then it's that server which connects to the database and stores data in a database. we are going to use Firebase as a dummy backend. Firebase is a service offered by google which contains an api (dummy backend) and a database (Realtime Database, make sure you start in Test Mode), to which we can send requests, which will make sure data is saved in that database. we use this dummy backend, but from the react perspective, the process will be the same when you send requests to any backend.

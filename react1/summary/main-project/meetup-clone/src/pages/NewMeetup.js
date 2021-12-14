import { useHistory } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	const history = useHistory();

	function addMeetupHandler(meetupData) {
		fetch(
			'https://react1-5c141-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
			{
				method: 'POST',
				body: JSON.stringify(meetupData),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then(() => {
			history.replace('/');
		});
	}

	return (
		<section>
			<h1>Add New Meetup</h1>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</section>
	);
}

export default NewMeetupPage;

// react libraries also have hooks, for example react-router-dom has the useHistory hook, that returns an object that gives us methods to move around the history of the browser, so we can navigate programatially (the app will navigate on its own in certain situations). For example, the 'push' method will push a new page into the stack of pages so we will navigate away, but it will also allow us to click the 'back' button and go back to the form, which does not make sense, that's why we use the 'replace' method, which does the same but does not allow us to go back to the form.

// the 'fetch' function is a function built into js that allows us to send http requests (we could also use 3rd party packages like 'axios'). we will send the request to the url that we got from firebase, but that url from Firebase can be manipulated: we can add segments after the domain, and these segments will be translated into folders (or tables) in our database (that's why we add '/meetups'. Firebase also requires that you add '.json' at the end). By default, 'fetch' sends a GET request, but we want to send a POST request to store data, that's why we add a second argument to 'fetch' that allows us to configure the http request we are sending. the 'body' field indicates the data we want to store (the data is in json format, which is the most popular format for transmitting data in http requests). in js, we can use the built-in JSON object, and call the 'stringify' method, with js objects or arrays or whatever as an argument, and it will be converted to json. then, in the headers you also add some metadata that makes clear that this request carries json data (this is required for some apis)

// after the meetup is submitted, we want to trigger navigation programmatically, so the url changes and the user gets a message after the http request has been done. that's why we use the 'useHistory' hook (react has its own built in hooks, and third party packages, like 'react-router-dom', also have their own built-in hooks). when we call the useHistory() hook, it returns a history object, which exposes certain methods that allow us to manipulate the browser's history (for example, to navigate away). 'fetch' returns a promise, which resolves when the request is done, then we execute a method from 'history' that allows us to navigate away (you can use the push() method, which pushes a new page into the stack of pages, but you then can use the 'back' button to go back to the previous page, which doesn't make sense, that's why we use the replace() method, which will make us navigate away, but won't allow us to use the 'back' button to come back to the previous page, ie. the form)

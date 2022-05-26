import { useReducer } from 'react';

// we define the reducer outside of the hook, because it doesn't need to re-run (and be re-created) with every re-render cycle (and our custom hook will run with every re-render cycle (your hook will be called whenever the component that uses the hook gets re-executed, and then you can use techniques in your hook in order to make sure that nothing happens to the state or does something does happen, depending on what you want, etc.)).
const httpReducer = (currentHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null };
		case 'RESPONSE':
			// return {loading: false, error: null}
			// or the following (you want to modify only something from the pre-existing state: you specify what you want to replace, and it will be overriten in the spread pre-existing state):
			return { ...currentHttpState, loading: false };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return { ...currentHttpState, error: null };
		default:
			throw new Error('We should not get here');
	}
};

const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});

	// the http request should not be send every time that the useHttp hook is called (every time that the component that uses the hook is run). that's why we assign the function to a constant.
	const sendRequest = (ingredientId) => {
		fetch(
			`https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => {
				dispatchHttp({ type: 'RESPONSE' });
				dispatch({ type: 'DELETE', id: ingredientId });
			})
			.catch((error) => {
				dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
			});
	};
};

export default useHttp;

// the cool thing about custom hooks is that, any component that uses, for example, this custom hook, will run the hook as if it had the code that we have written in here directly in the component (it's not like you have one function shared by multiple components, and then they run the same code with the same data): each functional component gets its own shapshot of this hook so to speak. therefore, the stateful logic that you have in the custom hook will be different for each component where you use the hook, so you can share the logic, not the data. that's the idea behind hooks.

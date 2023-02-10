const Output = (props) => {
	return <p>{props.children}</p>;
};

export default Output;

// since we want to make things simple, this component is totally redundant (it doesn't add anything), but we could potentially use it to add some styles, etc.

// as we can see, after using Output, the tests still pass. that's the good thing about using the 'render' method in order to render the Greeting component: it renders the whole component tree that is required (ie. it renders, not only Greeting, but all other components that are used in Greeting). technically, we could call this an integration test, since more than one component is involved, but since Output is just a wrapper, which doesn't have its own logic, then we shouldn't call it 'integration test'. testing the conjunction of these two components together is absolutely fine as a unit test. you may want to split the tests of these two different components if the Output component becomes more complex, eg. starts managing state, etc. then you may want to test that separately from the core logic of the Greeting component.

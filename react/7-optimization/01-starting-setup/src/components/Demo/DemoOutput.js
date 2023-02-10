import React from 'react';

const DemoOutput = (props) => {
	console.log('demo output evaluation');

	return (
		<div>
			<p>{props.show ? 'This is new!' : ''}</p>
		</div>
	);
};

export default React.memo(DemoOutput);

// if we inspect the elements, we will see that the only thing that is highighted when we click on the button is the paragraph and the text (even though the only thing that changes is the text, the text is considered like a prop to the paragraph, that's why the paragraph is highlighted as well). therefore, when we work with custom components, the virtual dom diffing works the same way (also note that the console.log in app.js will still be executed, because every time we change state, app.js is re-evaluated as well, but only the differences are rendered in the real dom)

// React.memo allows us to optimize functional components: it tells react it should look at the props DemoOutput gets, check the new value for all those props, and compare to the previous value that those props got. the component should be re-executed and re-evaluated only if a prop value changed (otherwise component re-execution and re-evaluation will be skipped; in that case, also the execution of all its child components will be skipped ) (you can test this by eliminating the props that DemoOutput receives, and you will see that 'demo output evaluation' is not consoled log anymore; if we had any child components inside DemoOutput, these would not be executed either).

// then why aren't we using this optimization all the time? well, because this optimization comes at a cost: the memo method tells react that whenever App component changes, it should go to DemoOutput and compare the new prop values with the old prop values (so it needs to store the old prop values), and this has a performance cost. At the end, whether this optimization is worth it or not will depend on the complexity (number of props, number of child components, etc.) of the specific component that you are applying this to (performance cost of re-evaluating the component vs performance cost of comparing props). therefore, react.memo will be great if you have a parent component with a lot of child components (large component tree), and you can avoid unnecessary re-evaluations of entire branches of that component tree. on the other hand, if you know that the props of your component are going to change with pretty much every re-evaluation of the component, then react.memo() doesn't make a lot of sense (so you don't need to use it, and therefore avoid the cost of comparing props). for example, in the Button, the props never change, therefore we can use react.memo. but is this really the case? look at the notes in Button.

import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {
	const [showParagraph, setShowParagraph] = useState(false);
	const [allowToggle, setAllowToggle] = useState(false);

	const toggleParagraphHandler = useCallback(() => {
		if (allowToggle) {
			setShowParagraph((prevShowParagraph) => !prevShowParagraph);
		}
	}, [allowToggle]);
	// as in useEffect, any state, props or context that you need in the function must be added in the dependencies array (also the same exceptions apply, for example, state updating functions..., that's why we don't include setShowParagraph in the dependencies array).

	const allowToggleHandler = () => {
		setAllowToggle(true);
	};

	console.log('component evaluation');

	return (
		<div className='app'>
			<h1>Hi there!</h1>
			{/* {showParagraph && <p>This is new!</p>} */}
			<DemoOutput show={showParagraph} />
			{/* DemoOutput will be re-evaluated every time App is re-evaluated, even if we don't pass any props to it (if a parent function is run, of course the child component functions are run again). if we don't pass any props to it, the console.log in DemoOutput will appear, but the real dom will not change when we inspect it in the 'elements' tab of dev tools. important thing to remember is that, if a component is re-executed, all its child components will be re-executed as well. THE QUESTION IS: isn't re-evaluating all child components and subsequent virtual comparisons a waste in terms of performance? needless to say, react is optimized for this, but in bigger apps, you may want to optimize this, eg. you can tell react that it should only re-evaluate DemoOutput under certain circumstances (for example, that the props that DemoOutput receive would change). in order to do that, you go to DemoOutput and use React.memo() */}
			<Button onClick={toggleParagraphHandler}>Toggle paragraph!</Button>
			<Button onClick={allowToggleHandler}>Allow toggle!</Button>
			{/* why do we need the array of dependencies in useCallback? keep in mind that in js, functions are closures (they close over the values that are available in their lexical environment when they are defined), that's why, if we leave empty the dependencies array, the 'Toggle paragraph' button doesn't work even after we click on the 'Allow toggle' button: since we are using useCallback, we are storing not only the function, but also the variables of the lexical environment, in our case, the initial value of allowToggle (which is false), that's why we cannot toggle (the IDE will also help you with a red underscore under the dependencies array if you leave it empty) (keep in mind that, if we didn't use useCallback, it would work ok). (CLOSURES: when a function is defined, js locks in all the variables (js closes over these variables and store them for that function definition) that are defined outside of the function that we are using in that function). therefore, there are cases in which we want to recreate a function, because external values being used in that function might have changed: this is when we add these variables in the dependencies array: this tells react that we generally want to store that function, but whenever 'allowToggle' changes, then we want to recreate that function and store that new recreated function, and this ensures that we always use the latest 'allowToggle' value inside the function. */}
		</div>
	);
}

export default App;

// as you click on the Button, you will see that the console log will appear every time that you click (the component is being re-evaluated every time that you click on the button), BUT when you go to 'elements' in dev tools, and you start clicking, you will only see highlighted the elements that change from the previous snapshot to the next (only those that are being re-rendered): only the difference between this virtual snapshots were considered for the updates made in the real dom.

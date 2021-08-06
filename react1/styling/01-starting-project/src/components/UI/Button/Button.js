// import './Button.css';

// const Button = (props) => {
// 	return (
// 		<button type={props.type} className='button' onClick={props.onClick}>
// 			{props.children}
// 		</button>
// 	);
// };

// now we will do the same using the 'styled components' library:
import styled from 'styled-components';

const Button = styled.button`
	font: inherit;
	padding: 0.5rem 1.5rem;
	border: 1px solid #8b005d;
	color: white;
	background: #8b005d;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&:hover,
	&:active {
		background: #ac0e77;
		border-color: #ac0e77;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
	}
`;
// this is called an 'attacked template literal'. It's a default JS feature (not from styled-components library, not from react): 'button' is a method on the 'styled' object, but instead of being executed with (), it's executed with ``. What you pass between the `` will be passed to the method in a special way. Again, this is just JS. In the end, this 'button' method will return a button component. Actually the 'styled' package has methods for all html elements. In our case, the 'button' method will return a button component with the styles provided between ``. the good thing about `` is that you can provide a multiline string. so you can copy the styles from the Button.css file here, ONLY THAT you have to edit them, delete the button class selector, and add '&' for pseudo-selectors. ALSO, this button will also apply the props that you are passing to it from CourseInput.js.
// if we inspect this button in dev tools, we will see that it has unique classnames. what this library does it to generate unique classnames (that are global in scope) for the styles that we passed, so it makes sure the names are not duplicated, so the styles that we passed will never spillover to other components by accident.

export default Button;

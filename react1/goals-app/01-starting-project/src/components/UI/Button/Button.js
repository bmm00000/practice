// if we want to use css with global scope, we import like this:
// import './Button.css';
// CSS MODULES allows us to have css files separated from the js files, as we always had traditionally. if we want to use CSS modules, we import from the css file like this:
import styles from './Button.module.css';
// also, in CSS modules, for the code transformation that is needed behind the scenes, you also need to name your css files like this: Button.module.css
// if you inspect the css classes in your dev server, you will see that CSS modules also changes the names of the classes and gives them a unique hash, so the names are unique.
// but watch out! with CSS modules, you have to work only with classes in the css file, because these are the properties of the 'styles' object (eg. don't use element selectors, or other...)

const Button = (props) => {
	return (
		<button type={props.type} className={styles.button} onClick={props.onClick}>
			{props.children}
		</button>
	);
};

// now we will do the same using the 'styled components' library:
// import styled from 'styled-components';

// if you want to use media queries, you just add it, as you see inside the Button component:
// const Button = styled.button`
// 	width: 100%;
// 	font: inherit;
// 	padding: 0.5rem 1.5rem;
// 	border: 1px solid #8b005d;
// 	color: white;
// 	background: #8b005d;
// 	box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
// 	cursor: pointer;

// 	@media (min-width: 700px) {
// 		width: auto;
// 	}

// 	&:focus {
// 		outline: none;
// 	}

// 	&:hover,
// 	&:active {
// 		background: #ac0e77;
// 		border-color: #ac0e77;
// 		box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
// 	}
// `;
// this is called an 'attacked (or attached?) template literal'. It's a default JS feature (not from styled-components library, not from react): 'button' is a method on the 'styled' object, but instead of being executed with (), it's executed with ``. What you pass between the `` will be passed to the method in a special way. Again, this is just JS. In the end, this 'button' method will return a button component. Actually the 'styled' package has methods for all html elements. In our case, the 'button' method will return a button component with the styles provided between ``. the good thing about `` is that you can provide a multiline string. so you can copy the styles from the Button.css file here, ONLY THAT you have to edit them, delete the button class selector, and add '&' for pseudo-selectors. ALSO, this button will also apply the props that you are passing to it from CourseInput.js.
// if we inspect this button in dev tools, we will see that it has unique classnames. what this library does it to generate unique classnames (that are global in scope) for the styles that we passed, so it makes sure the names are not duplicated, so the styles that we passed will never spillover to other components by accident.

export default Button;

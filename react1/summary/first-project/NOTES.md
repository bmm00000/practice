imperative approach: what we would do in js, since we need to code every single step in the interactivity of a site, so we are reinventing the wheel over and over again, since it's pretty much the same

declarative approach: we define what we want to have on the screen (we create custom 'htmlish' (JSX) elements) and React does the rest. As a consequence, you can duplicate components and their functionality easily without writing as much code as you would need with just JS.

imperative approach: code every single action, for example, when you are coding all the interactivity in javascript, not using a library.

declarative, component-focused approach: higher level syntax that you code when using a library.

build step: the code that you write is not the code that will end up in the browser. the code that you write will be transformed behind the scenes before it reaches the browser. This is what happens behind the scenes with React (the browser does not render jsx). (a big code bundle that the browser understands will be generated out of our code and the code from the third party dependencies (the dependencies are listed in package.json)) in the build steps brought by the 'react-scripts' package (listed in package.json) (this is what we do when we execute 'npm start', 'npm build', etc.)
also, in react, a development server hosts our application locally in our machine, and updates the page in the browser as soon as we save changes in the code (for these two functionalities, node.js will be used, that's why we need it in our system)
that's why we use the tool create-react-app, so we can get all these functionalities. (to be able to use CRA, we need node.js in our system)
npx create-react-app <app-name>
npm start (this executes a script from the react project we downloaded, that starts our local server that we have in our development environment)

when you are using CRA, make sure you don't have any firewall or antivirus that is interfering.

if you download a react project, you have to execute 'npm install' in the location where the package.json file is. (the same applies to 'npm start', etc.)

when you import, for example, 'ReactDom from 'react-dom'', you are importing the 'ReactDom' OBJECT from the 'react-dom' library (on that object, you will call methods...)

the browser does not understand components, that's why we won't see them if we inspect them in the browser, we will only see the html that is rendered after the built-in step.

react components are functions that return JSX, which is made of other custom or built-in components (which are JSX as well). Even the built-in components (that look like html) are JSX components that will have to be transformed to JS in the build step, so the browser can understand them (that's why the syntax changes, for example we use 'className' (in vanilla js, the property name that we use to assign a class to an html element object is 'className'; ie. the html attribute name sometimes differs from the property name, but not always), etc., because the property name of an html element object for assigning css classes in JS is 'className'. But 'className' is one of the very few cases where the attribute name (html) differs from the property name (js). in most cases, we can use the property names as we would do with html)

dynamic expressions: it will not be treated as plain text, it will be evaluated. For example, in JSX, {2 + 2}, but watch out! in JSX you can only use dinamic expressions of one line.

in jsx, all html-like elements are components that have already been built into react, that's why you can add attributes to those components, like 'onClick', etc. (you are saying that you wanna react on a click on that element, etc.), but you can only add inline code to those attributes, not blocks of code (like if statement blocks, etc). You cannot use 'onClick' etc. in custom components, for example in our app: Modal, Backdrop, etc., custom components have to be completely customized, that's why we use event props (passing functions as props), so we pass the functions down until we have a built-in component, so then we can use onClick, and then call the function we passed.

convention: functions that are executed upon events are named ending in 'Handler', for example: 'deleteHandler'

in html you cannot use self-closing elements, but you can in JSX (if you have no content between the opening and closing tags).

in order to change what's visible on the screen, we need to change the state of the app: initially, we have 3 todos and the open modal. we also want to present another state, where the overlay is closed, and we want to change between states when we click on the buttons we have (delete, cancel, etc).

(reminder, when we import from a library, we don't use './', eg. import {useState} from 'react'; here we are importing a function exposed by the react library).

with useState, we register different states we want to support in our react application, react will react to changes in those states, and allow us to render different output depending on which state is active. (useState is a hook, and hooks can only be called directcly inside react component functions and in custom hooks). calling useState() creates a state that react is aware of. you can give that state a starting value (in our example, we give it 'false' because we don't want the modal to appear at the beginning). useState returns an array with two elements (current state (you can think of state as a variable that is managed for you by react), and a function that allows us to change that value. it's important that we use that function to change the state, and DO NOT reassign the state variable, because when we use that function, the whole component will be rendered again, and the new state value will be used to render whatever we want).

you have new 'state' every time data changes in your app, even if it's not rendered in the screen yet (for example, if a variable changes, you got new state, and when this new value is rendered or consoled.log, then you got new state again; this is what happens in the counters of the screenshots: when the counter changes, the state changes (for example, counter is 2), and when the counter is rendered on the screen we have new state again (the counter is 2 and it is rendered in the screen or consoled log))
when we useState, we register different states in our app, and react will react to changes in this state, and we will be able to render different output depending on which state is active.

useState is a function that we can find in the 'react' library
when we call useState(), we create a state that react is aware of, and every time we change this state, the component will be rendered again.
useState() returns an array with two elements, the first element is the value that the state currently has (the value that you passed), and the second element is the function to change that state. you only change state by using that function, you never change state by reassigning the variable, only by using that function. that's because when you use that function ,react will call the component function, and render again the jsx with the new state.

{modalIsOpen ? <Modal/> : null} can be refactored as {modalIsOpen && <Modal/>}
{true && true} // true : in JS, if both conditions are true, the second value will be returned

working with 'event props' (passing functions as props): we do this to close the modal, because we cannot use the built-in prop 'onClick' in a custom component (we only have a few built-in props in custom components, as we will see later ). that's why we need to pass the function, so we can access the JSX built-in component, so we can use the built-in prop 'onClick' there. (we can pass functions as props because in JS functions are first class objects, and we can pass them around as values, as we do with strings, numbers, etc.)

REMINDER: PROPS ARE IMPORTANT FOR BUILDING RE-USABLE COMPONENTS, AND STATE IS IMPORTANT FOR changing what we see on the screen dynamically.

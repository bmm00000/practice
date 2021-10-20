imperative approach: what we would do in js, since we need to code every single step in the interactivity of a site, so we are reinventing the wheel over and over again, since it's pretty much the same

declarative approach: we define what we want to have on the screen (we create custom 'htmlish' (JSX) elements) and React does the rest. As a consequence, you can duplicate components and their functionality easily without writing as much code as you would need with just JS.

imperative approach: code every single action, for example, when you are coding all the interactivity in javascript, not using a library.

declarative, component-focused approach: higher level syntax that you code when using a library.

build step: the code that you write is not the code that will end up in the browser. the code that you write will be transformed behind the scenes before it reaches the browser. This is what happens behind the scenes with React (the browser does not render jsx). (a big code bundle that the browser understands will be generated out of our code and the code from the third party dependencies (the dependencies are listed in package.json)) in the build steps brought by the 'react-script' package (listed in package.json)
also, in react, a development server hosts our application locally in our machine, and updates the page in the browser as soon as we save changes in the code (for these two functionalities, node.js will be used, that's why we need it in our system)
that's why we use the tool create-react-app, so we can get all these functionalities. (to be able to use CRA, we need node.js in our system)
npx create-react-app <app-name>
npm start (this executes a script from the react project we downloaded, that starts our local server that we have in our development environment)

react components are functions that return JSX, which is made of other custom or built-in components (which are JSX as well). Even the built-in components (that look like html) are JSX components that will have to be transformed to JS in the build step, so the browser can understand them (that's why the syntax changes, for example we use 'className', etc., because the property name of an html element object for assigning css classes in JS is 'className'. But 'className' is one of the very few cases where the attribute name (JS) differs from the property name (html). in most cases, we can use the property names as we would do with html)

dynamic expressions: it will not be treated as plain text, it will be evaluated. For example, in JSX, {2 + 2}, but watch out! in JSX you can only use dinamic expressions of one line.

in jsx, all html-like elements are components that have already been built into react, that's why you can add attributes to those components, like 'onClick', etc. (you are saying that you wanna react on a click on that element, etc.), but you can only add inline code to those attributes, not blocks of code (like if statement blocks, etc). You cannot use 'onClick' etc. in custom components, for example in our app: Modal, Backdrop, etc., custom components have to be completely customized.

convention: functions that are executed upon events are named ending in 'Handler', for example: 'deleteHandler'

in html you cannot use self-closing elements, but you can in JSX.

you have new 'state' every time data changes in your app, even if it's not rendered in the screen yet (for example, if a variable changes, you got new state, and when this new value is rendered or consoled.log, then you got new state again)
when we useState, we register different states in our app, and react will react to changes in this state, and we will be able to render different output depending on which state is active.

{modalIsOpen ? <Modal/> : null} can be refactored as {modalIsOpen && <Modal/>}

-reusability (don't repeat yourself)
-separation of concerns (don't do too many things in one place): react takes the concept of functions (we separate the code in functions to do specific things, so we can call them repeatedly), and applies it to the frontend world (components, that are made of html, css, js; although in react, components are mostly html and js, css is not that important)

declarative approach: define the desired target state(s) and let React figure out the actual JS DOM updating instructions.

create-react-app is a tool that will help us in the following ways: development server that allows us to transform our code to preview our project and reflect changes on save, and also transform/optimize our code when we build it to be deployed in a production server (transform newest JS features to older syntax, so it will work in older browsers, minify css, etc...). In short, CRA allows you to preview the project locally in a development environment, and also later build it for production (if you want to view the transformed code in the development environment, go to 'source' in dev tools in the browser: you will find a 'static' folder with chunk.js, bundle.js etc.)

custom components have to start with capital letter, that's the way React differentiates them from built-in elements (the html-like components in JSX)

This approach of building a UI from smaller building blocks is called 'composition'.

WATCH OUT! default HTMLish components support className for adding css classes, but you can't use className for custom components as usual, since it will be understood as a prop. Therefore you can use it as a prop, as we do in Card.js

in the past, you needed to 'import React from 'react'' in all the files where you used JSX, but these days you don't need to anymore. But still you will see this import in older react projects.

STATE/EVENTS:
if an event is supported by an html dom element, you can access it in React using an attribute in the equivalent built-in JSX element: 'onNameOfEvent'.
It's a good practice that the functions attached to event listeners are called: 'somethingHandler'

we have useState because when we change variables in our app, it doesn't authomatically re-render, so the new values would not be reflected on the screen. useState allows us to define values as state, where changes in these values will trigger the component function being called again. therefore, useState allows us to define 'special' variables, whose value change will trigger a call of the component function, and therefore, re-evaluation of the JSX it returns.
therefore, we use state when we have data that might change and the changes must be reflected in the UI

hooks must be called inside component functions (not outside, not in nested functions inside the component)

useState works on a per component instance basis: the data will be managed separately for each specific instance of the component (for example, in our case, different titles for the different instances of the ExpenseItem component), so we will have different states, even though you used useState only once in your component. Also, when each state changes, it will only affect to that particular instance, so only that instance will be re-evaluated.

when you are lifting state up, you don't do it always to the App.js level, just just high enough, to the component that has access to both the component that generates data, and the component that needs data. That might be the App.js component, but can also be another component. Also, you can lift state up several levels in the component tree, as we do in our expense-tracker app.

when you use two-way binding, you are controlling a component (the component that you are controlling can be built-in, like the 'input', or a custom component). EXAMPLE OF CUSTOM CONTROLLED COMPONENT: ExpensesFilter.js is a controlled component of Expenses.js, because the value that ExpensesFilter.js receives comes from Expenses.js, and the value selected in ExpensesFilter.js goes to the parent (Expenses.js) where there is the function that will take it as an input and change it (two-way binding). both the value and the function to change the value are in the parent component.

when we have controlled components (two-way binding), we are lifting state up. but can also lift state up without having controlled components (two-way binding), ie. when we are just lifting the data to a parent component that has access to another component that needs the data (see diagram). therefore, when we have controlled components (two-way binding), we are lifting state up and passing the data to the same component. when we are lifting state up without controlled components, we are lifting state up and passing the data to another component.

PRESENTATIONAL (OR STATELESS) VS STATEFUL COMPONENTS (OR DUMB VS SMART COMPONENTS): those that don't have internal state (just focused on outputting some data) vs those that do. in most appliations you will have more dumb components than smart components. in most applications, only a couple of components manage state, and then state is spread out and distributed through props.

the value that useState receives as initial state value is optional.

-reusability (don't repeat yourself)
-separation of concerns (don't do too many things in one place): react takes the concept of functions (we separate the code in functions to do specific things, so we can call them repeatedly), and applies it to the frontend world (components, that are made of html, css, js; although in react, components are mostly html and js, css is not that important)

declarative approach: define the desired target state(s) and let React figure out the actual JS DOM updating instructions.

create-react-app is a tool that will help us in the following ways: development server that allows us to transform our code to preview our project and reflect changes on save, and also transform/optimize our code when we build it to be deployed in a production server (transform newest JS features to older syntax, so it will work in older browsers, minify css, etc...). In short, CRA allows you to preview the project locally in a development environment, and also later build it for production (if you want to view the transformed code in the development environment, go to 'source' in dev tools in the browser: you will find a static folder with chunk.js, bundle.js etc.)

custom components have to start with capital letter, that's the way React differentiates them from built-in elements (the html-like components in JSX)

This approach of building a UI from smaller building blocks is called 'composition'.

WATCH OUT! default HTMLish components support className for adding css classes, but you can't use className for custom components as usual, since it will be understood as a prop. Therefore you can use it as a prop, as we do in Card.js

in the past, you needed to 'import React from 'react'' in all the files where you used JSX, but these days....

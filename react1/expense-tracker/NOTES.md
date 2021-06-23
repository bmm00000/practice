-reusability (don't repeat yourself)
-separation of concerns (don't do too many things in one at the same place): react takes the concept of functions (we separate the code in functions to do specific things, so we can call them repeatedly), and applies it to the frontend world (components, that are made of html, css, js; although in react, components are mostly html and js, css is not that important)

declarative approach: define the desired target state(s) and let React figure out the actual JS DOM updating instructions.

create-react-app is a tool that will help us in the following ways: development server that allows us to preview our code and reflect changes on save, and also transform/optimize our code when we build it to be deployed in a production server (transform newest JS features to older syntax, so it will work in older browsers, minify css, etc...). In short, CRA allows you to preview the project locally in a development environment, and also later build it for production.

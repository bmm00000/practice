RTL provides a virtual DOM, so you can do without the browser things like click elements and test how the DOM reacts.

to run tests: 'npm test'
type 'a' to run tests when you are in watch-mode

open vscode: get into the project folder and: 'code .'

when you run 'npm test', the file that is run is 'App.test.js'

App.test.js:
the 'render' method creates a virtual DOM for whatever JSX you give it as the argument, and you access it with the 'screen' global object.

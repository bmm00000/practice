TS is a superset to JS. it's not a new language. it is both a language built up on JS (with new features and advantages), and a compiler that compiles TS into JS.

TS cannot be executed in JS environments (browser or Node.js). That's why, TS is also a compiler, to compile TS code into JS code (so you take advantage of the features and advantages of TS, and end up with JS code)
therefore, TS is a programming language that works because we have a tool (compiler) to compile it into JS. Therefore, when you install TS, what you are installing is the compiler (everything it needs to know to understand TS and convert it into JS). When you type the 'tsc' command, it invokes the compiler, to compile a TS file to JS.

the TS features are compiled to JS workarounds, so you write 'easier' syntax, and then it gets compiled to 'more complicated' JS code. Therefore, there's nothing you can do in TS that you could not do with JS, but it's 'nicer' syntax. in addition, TS adds types, ie. it adds a feature to the JS language which you help you to identify errors during development, before your script runs and the error occurs at runtime in the browser.

see screenshot: you may have unwanted behaviours in JS that will not throw errors necessarily. TS will help you avoid that.

screenshot: when you access the value of an element, it's always a string, no matter if you predefined type='number'.
in order to avoid this, you can write the code in the next screenshot (if statement with typeof, and then converting strings to numbers by placing a + before num1 and num2)
However, with TS, you can avoid this even before it can possibly happen, by avoiding the possibility of introducing num1 and num2 as strings, so you don't need to check anything inside the function.

installation: if you are using mac: sudo npm install -g typescript

in a good IDE, eg. vscode, if you end a filename in .ts, you get great support in the IDE when working with TS files: it identifies some weaknesses and gives you some explanation.

when you just name your file ended in .ts, it tells you what might be wrong, for example, in the screenshot, not all html elements have 'value' properties, only input elements, and TS doesn't check that what you selected is an input, that's why the warning message in the screenshot (even if the selected element was an input, there might be no value).

if you use !, it means that you are sure that it will never be null. you can also let know what type of element it will be, by using typecasting (see screenshot)

but the biggest advantage we get from TS is the additional types; if you don't have any info about the types, when you hover over the parameters of the function, you will see 'any'

if you don't correct the errors that the IDE tells you (underlined) and you execute 'tsc file.ts', it will compile the TS file to JS (we will see how to supress this later in the course), put the code in a new JS file, and the compiler will reflect the errors in the terminal as well

in our example, we were able to add the + to input.value during development (before runtime) because we used the type annotations, that's the advantage of TS.

after you execute tsc, then you have to link the resulting JS file to the HTML doc, because the browser can't run TS.

also, you can use the latest JS features, and they will get compiled down for older browsers (it's a little bit like Babel, this functionality is built in TS)

non-js features like interfaces and generics are not compiled to JS, but help us during development to avoid potential errors.

with configuration options, you can make it stricter or less strict.

without you explicitly using TS, some modern tools (for example, IDEs like VS Code) use TS under the hood to give you better assistance when you write vanilla JS.

'modern tooling that helps even in non TS projects': when you are using VS code, even in plain JS projects the code editor gives you some functionalities because it has some TS features running under the hood.

WATCH OUT! make sure you don't have the same-name JS and TS files open at the same time, or the IDE will shout at you errors due to variable duplicates, etc.

you will need to run 'npm init' in the project folder, so you get the package.json file and you can install lite-server:
npm install --save-dev lite-server
(development only dependency: tool that helps us during development, and doesn't include any code that will be executed as the main code of the app)
then you add the 'start' script in the package.json file. when you run 'npm start', you run the 'start' script, and lite-server serves the index.html file in the project, and it will reload the page when anything changes.

//
//

js has types, but ts add many more, and allows you to create your own types.

truthy and falsy values are not related to data types: these are things that JS does under the hood at runtime when it sees certain values in if conditions.

TS does not block compilation if the code has type inconsistencies, it will still produce a JS file (although will throw errors in the terminal). TS DOES NOT THROW ERRORS AT RUN TIME, it will only shout at you during development through the IDE and terminal, that's all. if you want to validate certain inputs (and therefore throw errors) at runtime, then you have to use vanilla JS (typeof keyword, for example) and an error will be thrown if the error conditions are met, and that error will kill our running application (see screenshot). We use TS when we don't want to throw errors at runtime, since they will kill our running application, and we may not want that to happen (you can also have mechanisms to save the running application, but this will require more code...). Here we can see the difference between TS and JS when it comes to types: JS is dynamically typed (a given variable can change type at different moments, and that's why we have the typeof keyword to check type at runtime); TS is statically typed (we define the types during development, so if types don't match we will see it during development). The key point is that you can also check for types in JS, but you will only find out at runtime. On the other hand, it's using TS you can find out during development, which is generally better, since you'll be able to fix bugs earlier. (but keep in mind that with TS, you will ONLY get support during development, not at runtime because TS features and checks are not built into the JS engine, so that logic can't execute in the browser) Additionlly, JS only knows about a few types, whereas TS knows about many types, as we will see.
THE KEY DIFFERENCE IS: JS uses 'dynamic types' to be resolved at runtime, whereas TS uses 'static types' set during development.

TS is a superset to JS. it is both a language built up on JS (with new features and advantages), and a compiler that compiles TS into JS.

TS cannot be executed in JS environments (browser or Node.js). That's why, TS is also a compiler, to compile TS code into JS code (so you take advantage of the features and advantages of TS, and end up with JS code)
therefore, TS is a programming language that works because we have a tool (compiler) to compile it into JS. Therefore, when you install TS, what you are installing is the compiler (everything it needs to know to understand TS and convert it into JS). When you type the 'tsc' command, it invokes the compiler, to compile a TS file to JS.

installation: if you are using mac: sudo npm install -g typescript

in a good IDE, eg. vscode, if you end a filename in .ts, you get great support in the IDE when working with TS files: it identifies some weaknesses and gives you some explanation.

see screenshot: you may have unwanted behaviours in JS that will not throw errors necessarily. TS will help you avoid that.

screenshot: when you access the value of an element, it's always a string, no matter if you predefined type='number'.
in order to avoid this, you can write the code in the next screenshot (if statement with typeof, and then converting strings to numbers by placing a + before num1 and num2)
However, with TS, you can avoid this even before it can possibly happen, by avoiding the possibility of introducing num1 and num2 as strings, so you don't need to check anything inside the function.

when you just name your file ended in .ts, it tells you what might be wrong, for example, in the screenshot, not all html elements have 'value' properties, only input elements, and TS doesn't check that what you selected is an input, that's why the warning message in the screenshot (even if the selected element was an input, there might be no value).

if you use !, it means that you are sure that it will never be null. you can also let know what type of element it will be, by using typecasting (see screenshot)

if you don't correct the errors that the IDE tells you (underlined) and you execute 'tsc file.ts', it will compile the TS file to JS, put the code in a new JS file, and the compiler will reflect the errors in the terminal as well

after you execute tsc, then you have to link the resulting JS file to the HTML doc, because the browser can't run TS.

also, you can use the latest JS features, and they will get compiled down for older browsers (it's a little bit like Babel, this functionality is built in TS)

WATCH OUT! make sure you don't have the same-name JS and TS files open at the same time, or the IDE will shout at you errors due to variable duplicates, etc.

truthy are falsy values are things that JS does under the hood, they are not related to TS.

TS does not block compilation if the code has type inconsistencies, it will still produce a JS file (although will through errors in the terminal). TS DOES NOT THROW ERRORS AT RUN TIME, it will only shout at you during development through the IDE and terminal, that's all. if you want to validate certain inputs (and therefore throw errors) at run time, then you have to use vanilla JS (typeof keyword, for example) and an error will be thrown if the error conditions are met, and that error will kill our running application (see screenshot). We use TS when we don't want to throw errors at runtime, since they will kill our running application, and we may not want that to happen (you can also have mechanisms to save the running application, but this will require more code...). Here we can see the difference between TS and JS when it comes to types: JS is dynamically typed (a given variable can change type at different moments, and that's why we have the typeof keyword to check type at runtime); TS is statically typed (we define the types during development, so if types don't match we will see it during development). The key point is that you can also check for types in JS, but you will only find out at runtime. On the other hand, it's using TS you can find out during development, which is generally better, since you'll be able to fix bugs earlier. (but keep in mind that with TS, you will ONLY get support during development, not at runtime because TS features and checks are not built into the JS engine, so that logic can't execute in the browser) Additionlly, JS only knows about a few types, whereas TS knows about many types, as we will see.

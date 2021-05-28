TS is a superset to JS. it is both a language built up on JS (with new features and advantages), and a compiler that compiles TS into JS.

TS cannot be executed in JS environments (browser or Node.js). That's why, TS is also a compiler, to convert TS code into JS code.
therefore, TS is a programming language that works because we have a tool (compiler) to compile it into JS. Therefore, when you install TS, what you are installing is the compiler (everything it needs to know to understand TS and convert it into JS)

see screenshot: you may have unwanted behaviours in JS that will not throw errors necessarily. TS will help you avoid that.

screenshot: when you access the value of an element, it's always a string, no matter if you predefined type='number'.
in order to avoid this, you can write the code in the next screenshot (if statement with typeof, and then converting strings to numbers by placing a + before num1 and num2)
However, with TS, you can avoid this even before it can possibly happen, by avoiding the possibility of introducing num1 and num2 as strings, so you don't need to check anything inside the function.

when you just name your file ended in .ts, it tells you what might be wrong, for example, in the screenshot, not all html elements have 'value' properties, only input elements, and TS doesn't check that what you selected is an input, that's why the warning message in the screenshot (even if the selected element was an input, there might be no value).

if you use !, it means that you are sure that it will never be null. you can also let know what type of element it will be (see screenshot)

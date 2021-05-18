https://github.com/mschwarzmueller/nextjs-course-code/blob/01-getting-started-extra-files/slides/slides.pdf

imperative approach: code every single action, for example, when you are coding all the interactivity in javascript, not using a library.

declarative, component-focused approach: higher level syntax that you code when using a library.

built step: the code that you write is not the code that will end up in the browser. the code that you write will be transformed behind the scenes before it reaches the browser. This is what happens behind the scenes with React (the browser does not render jsx)

dynamic expressions: it will not be treated as plain text, it will be evaluated

in jsx, all html-like elements are components that have already been built into react, that's why you can add attributes to those components, like 'onClick', etc. (you are saying that you wanna react on a click on that element, etc.), but you can only add inline code to those attributes, not blocks of code (like if statement blocks, etc). You cannot use 'onClick' etc. in components created by us.

in html you cannot use self-closing elements, but you can in JSX.

{modalIsOpen ? <Modal/> : null} can be refactored as {modalIsOpen && <Modal/>}

CSS modules is a built in feature of CRA that allows us to scope style to components, the name of the file should be: name-of-component.module.css
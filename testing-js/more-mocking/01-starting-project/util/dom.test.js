import { beforeEach, expect, it, vi } from 'vitest';
import fs from 'fs';
// file system module from nodejs
import path from 'path';
// we import 'path' so that we can open a file and load a file's content (because we want to open and load the index.html file).
// note that 'fs' and 'path' are available after we switched to the dom supporting environment, because we still have all the node apis available inside of our test files (because the dom is only emulated virtually)
import { Window } from 'happy-dom';

import { showError } from './dom';

// it('first test', () => {
// 	showError();
// });
// // in this function, we are relying on the dom, we rely on the existance of the document object, and then we use certain methods provided by it to interact with the dom. this can be a problem, because it's a side effect, but unlike the side effects that we talked about before (eg. working with file system, databases, etc.), it wouldn't cause any persisting problem (because if we add any element to the dom, it will be gone when the document is loaded again; any changes made through js won't persist if the page is reloaded). nontheless, it's a side effect, and we want to avoid working with the real dom, but that's not the main problem. the main problem is that when we run 'npm test' (and therefore, by using vitest or jest) we are running the tests from the command line, not from the browser (therefore, there's no dom, the document object that we use in the function above is not defined, and this test will fail). in order to solve this, we could provide a global stub, a global mock object, to build our own document object, the same way as we did with the 'fetch' function: vi.stubGlobal('document', ... ). however, unlike the 'fetch' function, the 'document' object is a very complex object with a lot of methods and properties and building our own testing clone might be challenging (sometimes it might be an option, but not always). because this is such a common problem (you have tests for js browser side code, and you need to interact with the dom to execute them), both vitest and jest support the dom virtually out of the box: when working with vitest or jest, you can choose a testing environment in which your code will be executed: you could choose nodejs (that's the default for both jest and vitest) and you will have access to all the nodejs apis and modules (like the 'fs' module, etc.) inside of your testing code and inside of the code that is executed by your testing code, but you can't interact with the browser apis (eg. 'document' object, etc.; you have to bring your own mock objects instead if you want to do that), but bringing your own mock objects is not always an option. that's why jest and vitest also support another environment calld JSDOM: a virtual dom environment that is created by the test runner behind the scenes (it doesn't use the actual browser, but it's emulating that your code runs on the browser). the same applies to Happy-DOM (only supported by vitest).
// in order to change environemnt, you have to change the test scripts in the package.json file (see screenshots) (note that in jest you can also change environment for a file only adding a comment on the file : see screenshot)

// therefore, if we change environment, and then run the same test again, it will not fail because 'document' is not defined (it will fail because of other reasons (it fails because it can't getElementById with the id that we have in our html file), but now we can interact with the dom):
// it('first test', () => {
// 	showError();
// });
// now the 'document' object is available, but your tests still don't execute in the context of the html file that we have in our project (that would be the file that we load in a browser, but we don't have browser here, since we didn't load any page. now we have some dom and browser specific apis available, but we didn't load the html file when we started executing our tests). therefore, we need to do some set up or initialization: we want to load our html file in the virtually emulated dom (which is provided by jsdom or happy-dom), so then we can interact with the virtual dom that has loaded on it all the elements of our html file (in order to do that, you import 'fs' and 'path')

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
// with readFileSync we are holding code execution until the file has been read. we are basically reading the content of the html file as a string and then we can use it to load it to load it into this virtually emulated dom. and the loading into the virtual dom is done by importing Window from happy-dom:

const window = new Window();
// the line above creates an emulated browser, and now we can access its 'document' object:
const document = window.document;

vi.stubGlobal('document', document);
// then we stub the document globally, with the emulated document provided by happy-dom with our content written (rendered) into it.

beforeEach(() => {
	document.body.innerHTML = '';
	// we need to clear up what we had before, or the next line will append the original content to any content that we had before.
	document.write(htmlDocumentContent);
	// now our html page is rendered virtually, and we do it before each test, so we get the original document for every test (so there's nothing modified before we run any test).
});

// now the following test will pass:
// it('first test', () => {
// 	showError();
// });

it('should add an error paragraph to the id="errors" element', () => {
	showError('Test');

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph).not.toBeNull();
});

it('should not contain an error paragraph initially', () => {
	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph).toBeNull();
});

it('should output the provided message in the error paragraph', () => {
	const testErrorMessage = 'Test';

	showError(testErrorMessage);

	const errorsEl = document.getElementById('errors');
	const errorParagraph = errorsEl.firstElementChild;

	expect(errorParagraph.textContent).toBe(testErrorMessage);
});

// if you are building more complex frontend apps, the features provided by jsdom or happy-dom might be a bit clunky, it might be too much code that you need to write to select all these elements, etc. there's a third party library that you can use with jest or vitest: testing-library.com: it gives you a lot of utility functions and methods that make working with the virtual dom, and writing tests for dom specific code, much easier (you have methods to select elements, simulate user events, etc.). this library also supports all popular frontend js libraries and frameworks (react, angular, etc.) out of the box, with special adjusted versions (eg. React Testing Library, Angular Testing Library, etc.). therefore, not only you can use this library with vanilla js, but also with React, Angular, Vue, etc.

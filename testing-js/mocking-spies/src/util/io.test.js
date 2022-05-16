import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';

import writeData from './io';

// it('should execute the writeFile method', () => {
// 	const testData = 'Test';
// 	const testFileName = 'test.tx';
// 	return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
// 	// we don't return any value, but we expect the promise to resolve (if you delete the 'data' folder and run the test again, the promise will be rejected (since it doesn't find the 'data' folder), and the test will fail)
// });
// what's the problem here? when we run this test, we create a test.tx file: our test has a side effect: it writes data to the hard drive. this might be acceptable, or might not be, since you might be replacing data that shouldn't be replaced (if we are talking about erasing data or similar, we could have problems if our test does that (you could accedentally delete production data); you could also have problems if you are sending http requests, or working with databases, or anything like this: all these things are side effects because you are interacting with another system (you are interacting with the hard drive, or with the database, etc.), so you have an external dependency (you are interacting with something outside of your code). this might be ok, but when writing tests you will want to avoid that, so you don't accidentally delete production data or you insert data into a production database, or your clutter up your local file system). in a nutshell, in our example, we are interesting in whether or not writeFile was called successfully, not in whether or not a file was written in the file system (because the latter is not about our code, it's about the dependency that we have; you want to test your code, not the third party code). therefore, generally speaking, we want to get rid of side effects. how to do so? two main approaches: spies and mocks (theoretically, there are also stubs and fakes:
// https://stackoverflow.com/questions/52131231/simple-definition-of-stub-spy-fake-and-mock-in-unit-testing
// https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub

// you can use spies if you don't care about what a function does, but you just want to know whether or not it was executed. then you wrap the original function with such spy object or you replace the function (the latter is more common because it allows you to get rid of the side effect)
// with mocks you also replace functions, but you replace bigger parts of an api of a certain module or code, and with mocks you also implements some test specific logic in the replacement function that does something else than your original function but helps you test different scenarios.

// when you call 'mock', the auto mocking algorithm used by vitest and jest is to look for the __mocks__ folder and use your own implementation there. only if it doesn't find one, it will authomatically replace eveyrthing with empty funtions. here, since we have a file called js.js in the __mocks__ folder, we will use it:
vi.mock('fs');
// remember, this will only impact our tests, not our production code (you only mocked the module during your tests).
// also, remember that vi.mock is hoisted to the top of the file in vitest, but not with jest! (with jest, you could have to call jest.mock() at the top of the file, before you import anything). as a result, the fs module that we import is already a mock module.
// also, keep in mind that this mock is only active for the tests on this file, kind of. actually, it does mock away the module and other tests therefore also have that module mocked away, but if you have tests on another file that also use the same module, then vitest authomatically sorts the tests such that the unmocked files (the test files where you don't call vi.mock) are executed first, so they get the unmocked module. therefore, you want to call vi.mock in all the files where you want to mock to be active.

// we are also interested in checking what arguments were passed to writeFile (we want to check that the testData was passed as an argument, and also that the storagePath was based on the testFileName that we passed to writeData). in order to do that, we have to take care of another dependency to code that we don't own: the 'path' module. this dependency is not bad per se, since this is not code that manipualates anyting on the file system or in a database, etc. but we may want to mock it away, primarily in order to simplify our test (we always have to make things simple: test what we want to test, and simplify the rest):
vi.mock('path', () => {
	return {
		default: {
			join: (...args) => {
				return args[args.length - 1];
			},
		},
	};
});
// when we mock 'path', we care about the replacement of the 'join' method. we don't want just an empty function that keeps track of executions. we want to create a replacement to the 'join' method that returns a storagePath, but we want to simplify this function so that the returned storagePath is just the filename that we passed to writeData (so then you will be able to check if the filename is used as storagePath when you call writeFile). in a nutshell, you want to replace the 'join' method: this is the function that you pass as a second argument to the mock method (by default vitest (and also jest) will replace all the module's functions with empty functions). in this function, you can return an object which will be used as a replacement for the module that you are mocking away (in our case, for 'path'). you have to add a 'default' key, and then you add your 'join' method (we do that because 'path' is a named import, which means that a default export was used to export it). we know that 'join' takes an infinite amount of arguments (that's why we use the rest parameters syntax), and we want to return the last argument that we passed (it will always be the filename). therefore, now 'join' just returns the filename. therefore, for our tests storagePaths will be our filename.

it('should execute the writeFile method', () => {
	const testData = 'Test';
	const testFileName = 'test.tx';
	// return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
	// with the line above, the test would fail, because we would be looking for a promise that resolves to no value, but since all the functions of the module are now empty (mock), we don't get back a promise that would resolve (NOTE THAT AFTER WE USED THE IMPLEMENTATION IN __MOCKS__, IT WILL WORK, as we check in the next test!!). that's why we do the following:
	writeData(testData, testFileName);
	// expect(fs.writeFile).toBeCalled();
	expect(fs.writeFile).toBeCalledWith(testFileName, testData);
	// as a result of the line above, if you change io.js, and for example, delete filename when you call the 'join' method, the test will fail. this is the power of mocks: you can get rid of unwanted behaviour, and you can even add behaviour that simplifies your life when you write tests.
});
// since fs is some module that we don't own, it's harder to replace with a spy (we don't receive the writeFile function as an argument that we can replace, but it's being called in a module that we don't own). with mocks we can replace functionalities that are defined in modules, no matter if we own them or not. have to pass to the 'mock' function the path to the module to be mocked (this works with both built-in or third party modules): vitest (or jest) will find this module and replace all the functions in there with empty spy functions. in our example above, when we call writeData, it should no longer write the test.txt file, because for our tests in this file, the 'fs' module provided by node has been replaced by a mock version that has only empty functions that don't do anything.

it('should return a promise that resolves to no value if called correctly', () => {
	const testData = 'Test';
	const testFileName = 'test.tx';

	writeData(testData, testFileName);
	// we don't need the line above??

	return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
});

// Managing Custom Mock Implementations Globally: a feature that is supported by both vitest and jest is that you an add a special folder to your project: '__mocks__' (this is a special folder name where vitest or jest will search when you call 'mock'). in that folder you can add files with the names of the modules that you want to mock away.

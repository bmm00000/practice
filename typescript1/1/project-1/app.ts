// with the 'unknown' type, we don't know what type of value the user will input:

let userInput: unknown;

// and ts will not complain if we do the following:

userInput = 5;
userInput = 'Jose';

// so far it's the same if we had not specified a type (ts would infer 'any') or if we had specified the 'any' type
// but we will run into a problem if we do the following:

let userName: string;
userName = userInput;

// since 'userInput' type is 'unknown', it could hold any type of value, it just happens to be a string now, but it could not be the case, that's why ts complains, because ts wants a string for 'userName'

// WATCH OUT! if 'userInput' would be type 'any', we would not have this error, becuase 'any' is the most flexible type in ts and it basically disables all type checking. therefore, 'unknown' is a bit more restrictive than 'any'.

// with 'unknown', you would need to make a type checking:

if (typeof userInput === 'string') {
	userName = userInput;
}

// now ts doesn't complain, becuase we made sure that what userName will receive a string (userInput could be anything else, but we checked it, and now it's guaranteed that it's a string, so we can safely assign it to userName)
// therefore, with 'unknown', you need an extra type check to be able to assign an 'unknown' value to a value with a fixed type. therefore, 'unknown' is a better choice than 'any', since there's some type checking. you use 'unknown' if, for whatever reason, you don't know yet what type you will store in a variable, but you know what you want to do with it eventually

// 'never' is another type that functions can return.
// for example, let's consider a utility function to throw error objects (having utility functions like this would be pretty standard in big applications where you don't want to manually throw an error in many different places of your app, but you want to reach one convenient function that build the error object):

function generateError(message: string, code: number) {
	throw { message: message, errorCode: code };
}

generateError('An error occurred', 500);

// as a return value, you could specify 'void' (that's the return type that ts infers, since 'never' is a newer type, and it's not that bad anyways if we leave it with 'void'). but if we are completely honest, the function does not just return nothing, but it returns 'never': this function will never produce a return value, because the 'throw' keyword crashes the script, and will never execute any potential return statement that comes after the 'throw'. therefore, we should specify as follows (from a code quality perspective, it would be clearer to other developers about the purpose of the function):

function generateError1(message: string, code: number): never {
	throw { message: message, errorCode: code };
}

// another example of a function that 'never' returns is a function with an infinite loop:

function infiniteLoop(): never {
	while (true) {}
}

// but funtions that throw errors are the most common use cases for the 'never' return type.

// TS DOCUMENTATION
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

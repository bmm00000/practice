const color: [number, number, number] = [];
// ts complains, because we want an array of three numbers, but we are leaving the array empty. this doesn't happen when we specify that we want, for example, an array of strings ('string[]') and we leave it empty for the time being (ts doesn't complain in that situation)

type HTTPResponse = [number, string];
const goodResponse: HTTPResponse = [200, 'OK'];

const responses: HTTPResponse[] = [];
// 'responses' is an array of tuples.

// there's something weird that you have to be careful about: the way tuples have been designed and implemented by typescript, they don't prevent you from pushing on extra elements after creation. for example:
goodResponse[0] = '200'; // ts complains here
goodResponse.push(3234234); // BUT TS DOESN'T COMPLAIN HERE!
goodResponse.pop(); // TS DOESN'T COMPLAIN HERE EITHER!!
goodResponse.pop();
goodResponse.pop();

// btw, tuples and enums are types that do not exist in js.

// watch 45-introducing enums
// watch 46-a bit more on enums
// watch 47-enums behind the scenes

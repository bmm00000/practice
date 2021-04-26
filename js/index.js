// there is no company creating javascript, it's just an agreement, the tc39 committee meet up to discuss proposed features of js. therefore, js has evolved iteratively.

// but browsers don't implement all features in one go, bit by bit in the newer versions, that's why we use caniuse.com

// js is backwards compatible: the code you write now is going to run in the future. any js code from the past is 100% compatible with the latest specification of js. all old features will continue to exist in new specifications. new features are layers on the top of older features, that's why you need to know history of the layers to better understand how js works.

// difference between compiler support features vs polyfilling support features: a compiler allows you to use the latest features and it compiles the code down into an older version of js, and that code will be able to be run in all browsers. one of the most famous compilers is Babel. However, if you are trying to compile a new feature (for example, promises) that does something that is not possible to do with older features, then the compiler does not know what to do. In that case you need to use a polyfill. A polyfill is a piece of code that replicates the functionality of that new feature using old versions. the result is the same as with compilers: your code can be used in older browsers.

// 'strict mode':

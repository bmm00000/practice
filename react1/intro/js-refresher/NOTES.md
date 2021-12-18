JS REVIEW:
we will use the ES7 syntax (arrow functions to define methods in classes, etc), in order to avoid problems with the 'this' keyword.
Also, we don't need to call constructor functions in classes in ES7 (we don't need 'super()' method either.)

see pdf about reference types: avoiding errors by using spread operator when copying reference types (arrays, objects, etc.), otherwise, if you change the values, the change will affect to the original, and you don't necessarily want that. That's why we use the array method 'map' a lot in React (instead of 'forEach', for example), ditto with 'concat' (and not 'push') (because 'map' and 'concat' return new arrays, and don't mutate the original arrays) (btw, 'concat' also works with strings). 'slice' returns a shallow copy of part of an array without mutating the original, whereas 'splice' mutates it. (btw, 'slice' also works with strings, but 'spice' only with arrays, since strings are inmutable)

rest parameter (...) is not included in the pdf. check mdn.

imperative approach: what we would do in js, since we need to code every single step in the interactivity of a site, so we are reinventing the wheel over and over again, since it's pretty much the same

declarative approach: we define what we want to have on the screen (we create custom 'htmlish' (JSX) elements) and React does the rest. As a consequence, you can duplicate components and their functionality easily without writing as much code as you would need with just JS.

while angular and vue separate html and js (typescript for angular), and instructions for interactivity are coded in the html, in react we don't have html and javascript separation. in react everything is JS and we use JSX to describe to React what html content it should render in the real dom.

React, Angular and Vue have similar startup and runtime performance (don't use stupid metrics, see screenshot): the conclusion is that performance should not be your deciding factor when chosing a JS library/framework.

All three frameworks are stable, ie. ready to be used in production.

The evolution of the frameworks helps us to take advantage of new developments, patterns, new JS features, etc. (because these patterns and features will be incorporated under the hood by the frameworks), so the apps will work today and in the future. But you need to ocassionally be willing to adopt a new feature or drop an existing feature. Angular launches a new version every 6 months, although nothing much changes. The schedules for React and Vue new versions is not fixed, but in all 3 the versions are always backwards compatible (everything you have coded in the past will still work).

JS REVIEW:
we will use the ES7 syntax (arrow functions to define methods in classes, etc), in order to avoid problems with the 'this' keyword.
Also, we don't need to call constructor functions in classes in ES7 (we don't need 'super()' method either.)

see pdf about reference types: avoiding errors by using spread operator when copying reference types (arrays, objects, etc.), otherwise, if you change the values, the change will affect to the original, and you don't necessarily want that. That's why we use the array method 'map' a lot in React (instead of 'forEach', for example), ditto with 'concat' (and not 'push') (because 'map' and 'concat' return new arrays, and don't change the existing arrays). 'slice' returns a shallow copy of an array without mutating the original, whereas 'splice' mutates it.

rest parameter (...) is not included in the pdf. check mdn.

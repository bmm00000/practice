sometimes your IDE (like vs code) detects errors, but it doesn't always happen

generally speaking, errors are thrown in the terminal, in the browser, and in the console

sometimes, in the console, you will see the errors that are thrown by the library, but that do not crash the whole application necessarily, so you don't see them in the browser.

sometimes, you have unwanted behaviours that are not thrown as errors anywhere. in order to fix them, you can read the code through the execution process and find out on your own, or also use breakpoints.

USING BREAKPOINTS
react gives the browser, not only js code that is executable in the browser, but also additional information that will allow us to debug our react code the way we wrote it, before it was converted to be executed in the browser.

go to 'sources' in the dev tools, 'Users' folder, and there you will find your react files (you can also find them in the 'webpack' folder). there you can add a breakpoint in any line you want, then you execute the process that involves that code, and execution will stop in that line (below that, you can see variables that are available at that point in time and the call stack, in the two boxes below, see screenshot).
then you can 'step into next function call'
you can also hover over variables to see what values they hold
you can use 'step over next function call'
you can press the 'play'-shaped button to resume execution as usual

DOWNLOAD PROJECT WITH ERRORS AND WATCH AGAIN 'WORKING WITH BREAKPOINTS'

REACT DEV TOOLS is a dedicated tool to understand your react application.
in the browser dev tools, you will have two more tabs: components and profiler. we will look at the profiler later in the course. in 'components' you can see the component tree of your app (check the different functionalities there. for example, as you manually test your app, in the 'hooks' section, you can see the current states and change them, and they will be reflected in the browser)

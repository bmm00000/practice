if you are using unit testing, you can rest assured that your changes/refactoring won't break any other parts of the code base. if you don't do that, you would need to manually test every feature of your app after making any change, to make sure you don't break anything before you publish it. therefore, the development process is faster with unit testing.

code quality: since the code is defined in units in order to be tested, the quality improves.

it documents your code: if you want to understand a function, you look at the unit test, and you will get an understanding of how it works.

we could unit test manually but we don't have to. we can authomate our testing by using a unit testing framework that will automate the testing for us.

Jasmine comes with everything (this is what is known as 'batteries included'), you don't need to do any setup, configuration, etc..

in order to get Jasmine, you go to github, to the 'releases' tab, and download the standalone version, go to the 'lib' folder, and get boot.js, jasmine.css, jasmine.js, and jasmine-html.js, then you add the scripts and you can run open the index.html file in your browser.

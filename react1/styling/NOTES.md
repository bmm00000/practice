what we are going to cover:

- conditional or dynamic styles: how to switch styles depending on certain conditions.

- two popular approaches for scoping styles to components (so far, even the styles that we set up in the .css files named after our components, affect the whole project, ie. are global)

- we will take a look at Styled Components (third party library)

- we will take a look at a concept called 'css modules'

so far, even the styles that we set up in the .css files named after our components, affect the whole project, ie. are global: that's not necessarily an problem, you can be careful about your selectors and only use them when needed. However, in larger projects, with a lot of developers working on the code, it could happen that the same name is used in different parts of the application. how to avoid this? there are two approaches:

1- use a third party library called Styled Components

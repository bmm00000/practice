module.exports = ({ content }) => {
	return `
        <!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
};

// in the world of express, there are many different ways to generate html (see templating libraries in the screenshot: EJS, mustache, etc..., each one has its own kind of syntax), but this may be quite confusing. we are going to use a straightforward solution: we are going to have our template files to export a function that returns a string, and inside of that string it's going to be our html

module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop</title>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link href="/css/main.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        </head>
  
        <body class="admin">
          <header>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div>
                  <a href="/admin/products">
                    <h3 class="title">Admin Panel</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/admin/products"><i class="fa fa-star"></i> Products</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div class="container">
            ${content}
          </div>
        </body>
      </html>
    `;
  };
  
  // how to receive the css file from the express server (here we don't have an index.html document so we cann't place the css file in the same directory): we create a 'public' folder that will be visible to the outside world (any browser can access all files inside of it)
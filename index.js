const express = require('express');
const app = express();

// set up server routes here

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

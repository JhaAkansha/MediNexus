const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
/* First arg is the path the application will listen to and the second arg is a callback function*/
/* The callback takes a req argument which contains the request data and a res argument that handles the result*/

app.use('/doctorLogin', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/doctorLogin'));
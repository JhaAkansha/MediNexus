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

// require('dotenv').config();
// const express = require('express');
// const jwt = require('jsonwebtoken');

// const app = express();

// //authentication
// let PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is up and running on ${PORT}`);
// });

// //Generating JWT
// app.post("/user/generateToken", (req,res) => {
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;
//     let data = {
//         time: Date(),
//         userId: 12,
//     }
//     const token = jwt.sign(data, jwtSecretKey, {expiresIn: '3h'});

//     res.json({ token });
// });

// //Verification
// app.get("/user/validateToken", (req, res) => {
//     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//     let jwtSecretKey = process.env.JWT_SECRET_KEY;

//     try {
//         const token = req.header(tokenHeaderKey);

//         if (!token) {
//             return res.status(400).send('Token not found');
//         }

//         // Remove "Bearer " prefix from the token
//         const tokenWithoutBearer = token.replace('Bearer ', '');

//         const verified = jwt.verify(tokenWithoutBearer, jwtSecretKey);
//         if (verified) {
//             return res.send("Successfully Verified");
//         }
//         else {
//             return res.status(401).send("Error");
//         }
//     }
//     catch (error){
//         return res.status(401).send(error)
//     }
// })
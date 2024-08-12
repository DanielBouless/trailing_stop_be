require('dotenv').config()
const axios = require('axios');
const router = require('express').Router()

const { sign } = require("jsonwebtoken");
const crypto = require("crypto");



router.get('/product', async(req, res)=>{

    const createToken = ()=>{
        const key_name = `${process.env.KEY_NAME}`;
        console.log(`key name: ${key_name}`)
        const key_secret =`${process.env.SECRET_KEY}`;
        console.log(`secret key: ${key_secret}` )
        const request_method = "GET";
        const url = "api.coinbase.com";
        const request_path = "/api/v3/brokerage/accounts";

        const algorithm = "ES256";
        const uri = request_method + " " + url + request_path;
        const token = sign(
        {
            iss: "cdp",
            nbf: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 120,
            sub: key_name,
            uri,
        },
        key_secret,
        {
            algorithm,
            header: {
            kid: key_name,
            nonce: crypto.randomBytes(16).toString("hex"),
            },
        }
        );

        return token
    }

    const token = createToken()

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.coinbase.com/api/v3/brokerage/products/${req.body.name}`,
        headers: { 
            'Content-Type': 'application/json'
            },
        Authenication: `Bearer ${token}`
        };  

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});




})

module.exports = router
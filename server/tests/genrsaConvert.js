import dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");

/*

const privFS = `-----BEGIN PRIVATE KEY-----
LORUM+IPSUM
-----END PRIVATE KEY-----`;
const pubFS = `-----BEGIN PUBLIC KEY-----
LORUM+IPSUM
-----END PUBLIC KEY-----`;

var privBuff = Buffer.from(privFS).toString('base64');
var pubBuff = Buffer.from(pubFS).toString('base64');

// STORE THESE IN .env
console.log(privBuff);
console.log(pubBuff);

*/

// USE THESE IN CODE
var priv = Buffer.from(process.env.PRIVATE_KEY , 'base64').toString('ascii');
var pub = Buffer.from(process.env.PUBLIC_KEY , 'base64').toString('ascii');

// JWT TEST
var exp = process.env.JWT_EXP;
var algo = process.env.JWT_ALGO;
var i = "JoshTech";
var s = "client";
var a = "https://joshrlaw.dev";

var payload = {
	_id: "1",
	first_name: "Josh",
	last_name: "L",
	email: "jrl@iastate"
};

var signoptions = {
	issuer: i,
	subject: s,
	audience: a,
	expiresIn: exp,
	algorithm: algo
};

var encoded = jwt.sign(payload, priv, signoptions);

console.log(`Token encoded:\n ${encoded}`);

var decoded = jwt.verify(encoded, pub, signoptions);

console.log(`Token decoded:\n ${JSON.stringify(decoded)}`);

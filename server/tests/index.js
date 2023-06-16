import dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");

var priv = Buffer.from(process.env.JWT_SECRET , 'base64').toString('ascii');
var pub = Buffer.from(process.env.JWT_PUBLIC , 'base64').toString('ascii');

// JWT TEST
var exp = process.env.JWT_EXP;
var algo = process.env.JWT_ALGO;
var iss = "JoshTech";
var sub = "client";
var aud = "https://joshrlaw.dev";

var payload = {
	_id: "1",
	first_name: "Josh",
	last_name: "L",
	email: "jrl@iastate"
};

var signoptions = {
	issuer: iss,
	subject: sub,
	audience: aud,
	expiresIn: exp,
	algorithm: algo
};

var encoded = jwt.sign(payload, priv, signoptions);
var decoded = jwt.verify(encoded, pub, signoptions);

const h = encoded.split('.')[0];
const p = encoded.split('.')[1];
const s = encoded.split('.')[2];

var putBack = h+'.'+p+'.'+s;
var diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')
var difference = diff(encoded, putBack);

var decodedPutback = jwt.verify(putBack, pub, signoptions);

// console.log(`Header:\n${h}\nPayload:\n${p}\nSignature:\n${s}\n`);
// console.log(`Token encoded:\n${encoded}\n`);
// console.log(`Token decoded:\n${JSON.stringify(decoded)}`);
// console.log(`Difference:\n${difference}`);
// console.log(`Putback:\n${putBack}`);
console.log(`Decoded Putback:\n${JSON.stringify(decodedPutback)}`);


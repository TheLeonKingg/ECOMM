const express = require('express');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

module.exports.verifyToken = function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        Jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                res.status(401).send("Please provide valid token");
            } else {
                next();
            }
        })
    } else {
        res.status(403).send("Please add token with Headers")
    }

}


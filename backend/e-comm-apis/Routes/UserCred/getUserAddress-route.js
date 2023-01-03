const express = require('express');
const router = express.Router();

const getUserAddressControler = require('../../Controllers/UserCred/getUserAddress-controller');

router.route('/:id').get(
    getUserAddressControler.getUserAddress);

module.exports = router;
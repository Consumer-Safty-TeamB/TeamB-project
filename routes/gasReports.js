const express = require('express');
const { getGasReports , addGasReports } = require ('../controllers/gasReports');
const router = express.Router();

router.route('/').get(getGasReports).post(addGasReports);

module.exports = router;
//
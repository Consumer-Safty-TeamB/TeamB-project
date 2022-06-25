const { json } = require('express/lib/response');
const GasReports = require('../models/GasReports');

// @desc Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getGasReports = async (req, res, next) => {
    try {
        const gasReports = await GasReports.find();
        console.log(gasReports)
        return res.status(200).json({
            success: true,
            count: gasReports.length,
            data: gasReports
        });
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
}

// @desc Create a store
// @route POST /api/v1/stores
// @access Public
exports.addGasReports = async (req, res, next) => {
    console.log(req.body);
    try {        
        const gasReports = await GasReports.create(req.body);

        return res.status(200).json({
            success:true,
            data: gasReports
        })
    } catch (error) {
        console.error(error);
        if(error.code == 11000)
        {
            return res.status(400).json({ error: 'kjl'});
        }
        res.status(500).json({ error: 'Server error'}); 
    }
}
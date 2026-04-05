const express = require('express');
const router = express.Router();
const householdController = require('../controllers/householdsController');

router.get('/', householdController.getAllHouseholds);
router.get('/:id', householdController.getHouseholdById);
router.post('/', householdController.createHousehold);
router.put('/:id', householdController.updateHousehold);
router.delete('/:id', householdController.deleteHousehold);

module.exports = router;

const express = require('express');
const router = express.Router();
const classes = require('../controllers/classControllers');

router.get('/class',classes.getClasses)
router.delete('/class/:_id',classes.deleteClass)
router.post('/class',classes.addClass)
router.patch('/class/:_id',classes.updateClass)
router.get('/class/name',classes.getAllClassName)
module.exports = router;

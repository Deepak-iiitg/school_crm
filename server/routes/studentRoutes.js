const express = require('express');
const router = express.Router();
const students = require('../controllers/studentControllers');

router.get('/student',students.getStudents)
router.delete('/student/:_id',students.deleteStudent)
router.post('/student',students.addStudent)
router.patch('/student/:_id',students.updateStudent)
router.get('/student/:email',students.getStudenByEmail)
module.exports = router;

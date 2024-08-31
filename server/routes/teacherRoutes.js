const express = require('express');
const router = express.Router();
const teachers = require('../controllers/teacherControllers');

router.get('/teacher/:page',teachers.getTeachers)
router.delete('/teacher/:_id',teachers.deleteTeacher)
router.post('/teacher',teachers.addTeacher)
router.patch('/teacher/:_id',teachers.updateTeacher)
router.get('/teacher/:email',teachers.getTeacherByEmail)
module.exports = router;

const Student = require('../models/studentModels');
const Class = require('../models/classModels');

async function addStudent(req, res) {
    try {
        if(isStudentExit(req.body.contactDetails)){
            return res.status(200).json({message:'student already exit'});
        }
        const newStudent = new Student(req.body);
        const _id = newStudent.class;
        const class1 = await Class.findById(_id);
        class1.studentList.push(_id);
        await class1.save();
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function updateStudent(req, res) {
    try {
        const _id = req.params._id;
        const updatedData = req.body;
        const olderData = await Student.findById(_id);
        const updatedStudent = await Student.findByIdAndUpdate(_id, updatedData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const class1 = await Class.findById(olderData.class);
        for (let i = 0; i < class1.studentList.length; i++) {
            if (class1.studentList[i] == _id) {
                class1.studentList[i] = updatedStudent.class;
                await class1.save();
                break;
            }
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteStudent(req, res) {
    try {
        const _id = req.params._id;
        const class1 = await Student.findById(_id);
        const deletedStudent = await Student.findByIdAndDelete(_id);
        const newStudentList = class1.studentList.filter((id) => {
            return id != _id;
        })
        class1.studentList = newStudentList;
        await class1.save();
        return res.status(200).json(deleteStudent);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function getStudents(req, res) {
    try {
        const students = await Student.find().populate('class');
        res.json(students);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function getStudenByEmail(req,res){
    try{
        console.log(req.params.email);
       const student = await Student.find({contactDetails:req.params.email}).populate('class').populate('teacher');
       return res.status(200).json(student);
    }catch(err){
       return res.status(500).json({message:err.message});
    }
}
async function isStudentExit(email){
    try{
      let student = await Student.find({contactDetails:email});
      if(student){
        return true;
      }else{
        return false;
      }
    }catch(err){
       return res.status(500).json({message:err.message});
    }
}
module.exports = { addStudent, getStudents, deleteStudent, updateStudent ,getStudenByEmail};

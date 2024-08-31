const Teacher = require('../models/teacherModels');
const Class = require('../models/classModels');
//declare for pagination
const limit = 2;
async function addTeacher(req, res) {
    try {
        if(isTeacherExit(req.body.contactDetails)){
            return res.status(200).json({
                message:'contact details already exit'
            })
        }
        const newTeacher = new Teacher(req.body);
        const id = newTeacher.assignedClass;
        const class1 = await Class.findById(id);
        class1.teacher = id;
        await class1.save();
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function updateTeacher(req, res) {
    try {
        const _id = req.params._id;
        const updatedData = req.body;
        const olderData = await Teacher.findById(_id);
        const updatedTeacher = await Teacher.findByIdAndUpdate(_id, updatedData, { new: true });

        if (!updatedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const class1 = await Class.findById(olderData.assignedClass);
        class1.teacher = updateTeacher.assignedClass;
        await class1.save();
        return res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteTeacher(req, res) {
    try {
        const _id = req.params._id;
        const deletedTeacher = await Teacher.findById(_id);
        const class1 = await Class.findById(deledTeacher.assignedClass);
        class1.teacher = null;
        await class1.save();
        res.status(200).json(deletedTeacher);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getTeachers(req, res) {
    try {
        let page = req.params.page;
        let skip = (page-1)*limit;

        const teachers = await Teacher.find().populate('assignedClass').skip(skip).limit(limit);
        res.json(teachers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
async function getTeacherByEmail(req,res){
    try{
        const teacher = await Teacher.find({contactDetails:req.params.email}).populate('assignedClass');
        return res.status(200).json(teacher);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
async function isTeacherExit(email){
    try{
       const teacher = await Teacher.find({contactDetails:email});
       if(teacher){
        return true;
       }
       return false;
    }catch(err){
       return res.status(500).json({message:err.message});
    }
}
module.exports = { addTeacher, getTeachers, deleteTeacher, updateTeacher,getTeacherByEmail };

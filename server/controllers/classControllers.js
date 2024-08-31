const classModel = require('../models/classModels');
const Student = require('../models/studentModels');
const Teacher = require('../models/teacherModels');
async function addClass(req, res) {
    try {
        console.log(req.body);
        const newClass = new classModel(req.body);
        await newClass.save();
        return res.status(201).json(newClass);
    } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: err.message });
    }
}

async function updateClass(req, res) {
    try {
        const _id = req.params._id;
        const updatedData = req.body;

        const updatedClass = await Class.findByIdAndUpdate(_id, updatedData, { new: true });

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        await Student.updateMany(
            { class: classId },
            { $set: { class: updatedClass._id } }
        );

        await Teacher.updateMany(
            { assignedClass: classId },
            { $set: { assignedClass: updatedClass._id } }
        );
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function deleteClass(req, res) {
    try {
        const _id = req.params._id;
        const deletedClass = await classModel.findByIdAndDelete(_id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class Not Found' });
        }
        await Student.updateMany(
            { class: _id },
            { $set: { class: null } }
        );
        await Teacher.updateMany(
            { assignedClass: _id },
            { $set: { assignedClass: null } }
        );
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getClasses(req, res) {
    try {
        const result = await classModel.find().populate('teacher').populate('studentList');
        console.log(result);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}
async function getAllClassName(req,res){
    try{
       const allClassName = await classModel.find().select('name');
       console.log(allClassName.map(cl=>cl.name));
       return res.status(200).json({className:allClassName});
    }catch(err){
       return res.status(500).json({message:err.message});
    }
}
module.exports = { addClass, getClasses, deleteClass, updateClass ,getAllClassName};


const mongoose = require('mongoose');
mongoose.set('strictPopulate', false);

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  studentFees: { type: Number, required: true },
  studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

classSchema.virtual('class', {
    ref: 'Teacher', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'assignedClass', // is equal to foreignField
 });
 classSchema.virtual('class', {
    ref: 'Student', //The Model to use
    localField: '_id', //Find in Model, where localField 
    foreignField: 'class', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 classSchema.set('toObject', { virtuals: true });
 classSchema.set('toJSON', { virtuals: true });

 module.exports = mongoose.model('Class', classSchema);

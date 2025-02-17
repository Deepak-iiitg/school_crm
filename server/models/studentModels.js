const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dob: { type: Date, required: true },
  contactDetails: { type: String, required: true },
  feesPaid: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
});

studentSchema.virtual('student', {
    ref: 'Class', //The Model to use
    localField: 'assignedClass', //Find in Model, where localField 
    foreignField: '_id', // is equal to foreignField
 });
 
 // Set Object and Json property to true. Default is set to false
 studentSchema.set('toObject', { virtuals: true });
 studentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Student', studentSchema);
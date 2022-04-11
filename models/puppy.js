import mongoose from 'mongoose'

const Schema = mongoose.Schema

/*const puppySchema = new Schema({
  name: {type: String, required: true},   
  joke: {type: String, default: 'Mixed'},
  rating: {type: Number, default: 0},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  photo: {type: String}
}, {
  timestamps: true
})
*/
const eatSchema = new Schema({
  type: {type:String, enum: ["Formula", "Breast"]},
  ounces: {type:Number, required: true},
  note: {type:String}
})

const sleepSchema = new Schema({
  hours: {type: Number, min: 0.5, max: 14, default: 0},
  note: {type:String}
})

const poopSchema = new Schema({
  type: {type:String, enum: ["Wet", "Dirty"]},
  note: {type:String}
})

const eventLogSchema = new Schema({
  timeStamp: {type: number, required: true},
  event: {type:String, enum: [eatSchema, sleepSchema, poopSchema]},
})

const puppySchema = new Schema({
  name: {type: String, required: true},   
  eventLog: [eventLogSchema],
  age: {type: Number, default: 0},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
  photo: {type: String}
}, {
  timestamps: true
})

const Puppy = mongoose.model('Puppy', puppySchema)
const Eat = mongoose.model('Eat', eatSchema)
const Sleep = mongoose.model('Sleep', sleepSchema)
const Poop = mongoose.model('Poop', poopSchema)
const eventLog = mongoose.model('Event', eventLogSchema)

export {
  Puppy,
  Eat,
  Sleep,
  Poop,
  eventLog
}
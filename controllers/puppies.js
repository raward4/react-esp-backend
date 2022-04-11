import { Puppy } from '../models/puppy.js'
import { v2 as cloudinary } from 'cloudinary'

function index (req, res) {
  Puppy.find({})
  .populate('owner')
  .then(puppies => {
    res.json(puppies)
  })
  .catch(err => {
    res.json(err)
  })
}

function create(req, res) {
  req.body.owner = req.user.profile
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Puppy.create(req.body)
    .then(puppy => {
      puppy.populate('owner')
      .then(populatedPuppy => {
        res.status(201).json(populatedPuppy)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      req.body.photo = image.url
      Puppy.create(req.body)
      .then(puppy => {
        puppy.populate('owner')
        .then(populatedPuppy => {
          res.status(201).json(populatedPuppy)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

// function create(req, res) {
//   req.body.owner = req.user.profile
//   Puppy.create(req.body)
//   .then(puppy => {
//     puppy.populate('owner')
//     .then(populatedPuppy => {
//       res.json(populatedPuppy)
//     })
//   })
//   .catch(err => res.json(err))
// }

function deletePuppy(req, res) {
  Puppy.findByIdAndDelete(req.params.id)
  .then(puppy => res.json(puppy))
  .catch(err => res.json(err))
}

function update(req, res) {
  if (req.body.photo === 'undefined' || !req.files['photo']) {
    delete req.body['photo']
    Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(puppy => {
      puppy.populate('owner')
      .then(populatedPuppy => {
        res.status(201).json(populatedPuppy)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  } else {
    const imageFile = req.files.photo.path
    cloudinary.uploader.upload(imageFile, {tags: `${req.body.name}`})
    .then(image => {
      console.log(image)
      req.body.photo = image.url
      Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(puppy => {
        puppy.populate('owner')
        .then(populatedPuppy => {
          res.status(201).json(populatedPuppy)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }
}

// function update(req, res) {
//   Puppy.findByIdAndUpdate(req.params.id, req.body, {new: true})
//   .then(puppy => res.json(puppy))
//   .catch(err => res.json(err))
// }

function show(req, res) {
  Puppy.findById(req.params.id)
  .then(puppy => res.json(puppy))
  .catch(err => res.json(err))
}

export {
  index,
  create,
  update,
  deletePuppy as delete,
  show
}
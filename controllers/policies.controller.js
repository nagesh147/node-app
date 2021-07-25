const db = require('../models')
const Policy = db.policies

// Create and Save a new Policy
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quoteNumber) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  // Create a Policy
  const policy = new Policy({
    quoteNumber: req.body.quoteNumber,
    policyNumber: req.body.policyNumber,
    effDate: req.body.effDate,
    zipCode: req.body.zipCode,
    variance: req.body.variance,
    insuredInfo: req.body.insuredInfo,
    agency: req.body.agency,
    requests: req.body.requests,
  })

  // Save Policy in the database
  policy
    .save(policy)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Policy.',
      })
    })
}

// Retrieve all Policys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {}

  Policy.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving policies.',
      })
    })
}

// Find a single Policy with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Policy.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found Policy with id ' + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error retrieving Policy with id=' + id })
    })
}

// Update a Policy by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    })
  }

  const id = req.params.id

  Policy.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Policy with id=${id}. Maybe Policy was not found!`,
        })
      } else res.send({ message: 'Policy was updated successfully.' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Policy with id=' + id,
      })
    })
}

// Delete a Policy with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Policy.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Policy with id=${id}. Maybe Policy was not found!`,
        })
      } else {
        res.send({
          message: 'Policy was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Policy with id=' + id,
      })
    })
}

// Delete all Policys from the database.
exports.deleteAll = (req, res) => {
  Policy.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Policys were deleted successfully!`,
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all policies.',
      })
    })
}

// Find all published Policys
exports.findAllPublished = (req, res) => {
  Policy.find({ published: true })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving policies.',
      })
    })
}

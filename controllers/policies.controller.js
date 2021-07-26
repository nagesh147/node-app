const db = require('../models')
const Policy = db.policies

// Create and Save a new Policy
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quoteNumber) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }

  const reqBody = req.body
  // Create a Policy
  const policy = new Policy({
    quoteNumber: reqBody.quoteNumber,
    policyNumber: reqBody.policyNumber,
    effDate: reqBody.effDate,
    zipCode: reqBody.zipCode,
    variance: reqBody.variance,
    insuredInfo: reqBody.insuredInfo,
    agency: reqBody.agency,
    requests: reqBody.requests,
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
  var condition = {}
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

// Find a single Policy with policyNumber
exports.findOne = (req, res) => {
  const policyNumber = req.params.policyNumber

  Policy.findOne({ policyNumber: policyNumber })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: 'Not found Policy with policyNumber ' + policyNumber,
        })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Policy with policyNumber=' + policyNumber,
      })
    })
}

// Update a Policy by the policyNumber in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    })
  }

  const policyNumber = req.params.policyNumber

  Policy.updateOne({ policyNumber }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Policy with policyNumber=${policyNumber}. Maybe Policy was not found!`,
        })
      } else res.send({ message: 'Policy was updated successfully.' })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Policy with policyNumber=' + policyNumber,
      })
    })
}

// Delete a Policy with the specified policyNumber in the request
exports.delete = (req, res) => {
  const policyNumber = req.params.policyNumber

  Policy.findOneAndRemove(policyNumber, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Policy with policyNumber=${policyNumber}. Maybe Policy was not found!`,
        })
      } else {
        res.send({
          message: 'Policy was deleted successfully!',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Policy with policyNumber=' + policyNumber,
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

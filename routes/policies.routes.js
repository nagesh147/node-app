module.exports = (app) => {
  const policies = require('../controllers/policies.controller')

  var router = require('express').Router()

  // Create a new Policy
  router.post('/createPolicy', policies.create)

  // Retrieve all Policies
  router.get('/policies', policies.findAll)

  // Retrieve all published Policys
  router.get('/published', policies.findAllPublished)

  // Retrieve a single Policy with policyNumber
  router.get('/:policyNumber', policies.findOne)

  // Update a Policy with policyNumber
  router.put('/:policyNumber', policies.update)

  // Delete a Policy with policyNumber
  router.delete('/:policyNumber', policies.delete)

  // Delete all policies
  router.delete('/', policies.deleteAll)

  app.use('/policy/', router)
}

module.exports = (app) => {
  const policies = require('../controllers/policies.controller')

  var router = require('express').Router()

  // Create a new Policy
  router.post('/', policies.create)

  // Retrieve all Policys
  router.get('/', policies.findAll)

  // Retrieve all published Policys
  router.get('/published', policies.findAllPublished)

  // Retrieve a single Policy with id
  router.get('/:id', policies.findOne)

  // Update a Policy with id
  router.put('/:id', policies.update)

  // Delete a Policy with id
  router.delete('/:id', policies.delete)

  // Create a new Policy
  router.delete('/', policies.deleteAll)

  app.use('/api/policies', router)
}

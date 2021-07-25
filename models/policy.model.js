module.exports = (mongoose) => {
  var s_pol_req_doc = mongoose.Schema({
    clintDocRefId: String,
    code: String,
    messages: Array,
    status: String,
  })

  var s_pol_req = mongoose.Schema({
    id: String,
    slNo: String,
    clientId: String,
    status: String,
    documents: [s_pol_req_doc],
  })

  var s_policy = mongoose.Schema({
    quoteNumber: String,
    policyNumber: String,
    effDate: String,
    zipCode: String,
    requests: [s_pol_req],
  })

  s_policy.method('toJSON', function () {
    return this.toObject()
  })

  const Policy = mongoose.model('policy', s_policy)
  return Policy
}

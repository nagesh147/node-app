module.exports = (mongoose) => {
  var s_pol_agency_addr = mongoose.Schema({
    address1: String,
    address2: String,
    address3: String,
    city: String,
    state: String,
    zip: String,
  })
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
    variance: {
      lob: String,
      state: String,
      channel: String,
      uwCompanyCode: String,
    },
    insuredInfo: {
      firstName: String,
      middleInitial: String,
      lastName: String,
      mobile: String,
      email: String,
    },
    agency: {
      code: String,
      name: String,
      website: String,
      phone: String,
      address: s_pol_agency_addr,
    },
    requests: [s_pol_req],
  })

  s_policy.method('toJSON', function () {
    return this.toObject()
  })

  const Policy = mongoose.model('policy', s_policy)
  return Policy
}

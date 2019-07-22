import {Encode, Decode} from 'xrpl-tagged-address-codec'
import assert from 'assert'

module.exports = async (req, res) => {
  try {
    assert(req.query)
    assert(req.query.address)
    if (req.query.address.match(/^X/)) {
      res.status(200).json(Decode(req.query.address))
    } else {
      let tag
      if (req.query.tag === '') {
        tag = null
      } else {
        tag = req.query.tag
        assert(req.query.tag, 'Invalid destination tag')
        assert(!isNaN(parseInt(req.query.tag)), 'Destination tag is not numeric')
        assert((parseInt(req.query.tag) + '') === req.query.tag.trim(), 'Destination tag not numeric')
      }
      res.status(200).json({address: Encode({account: req.query.address, tag})})
    }
  } catch (e) {
    res.status(500).json({
      error: e.message
    })
  }
}

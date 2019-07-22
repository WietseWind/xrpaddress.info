import {Encode, Decode} from 'xrpl-tagged-address-codec'
import assert from 'assert'

module.exports = async (req, res) => {
  try {
    assert(req.query)
    assert(req.query.address)
    if (req.query.address.match(/^X/)) {
      res.status(200).json(Decode(req.query.address))
    } else {
      res.status(200).json({address: Encode({account: req.query.address, tag: req.query.tag})})
    }
  } catch (e) {
    res.status(500).json({
      error: e.message
    })
  }
}

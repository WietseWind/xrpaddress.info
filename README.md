# xrpaddress.info

No more mistakes entering destination tags 🎉

A website to explain the new [XRPL Tagged Address Codec](https://npmjs.org/package/xrpl-tagged-address-codec), packing XRPL destination addresses and destination tags into one `X`-address.

I'll add some content to this website, allowing users, consumers, exchanges, developers, etc. to encode and decode addresses, and learn more about the address format. 

### This repository runs on [xrpaddress.info](https://xrpaddress.info)

### API

The public API ([source](https://github.com/WietseWind/xrpaddress.info/blob/master/api/index.js)) (available through 20+ POP's around the world) offers two methods:

 - Encode to x-address `https://xrpaddress.info/api/encode/<address, eg. rXXXX...>/<tag, eg. 123>`
 - Decode from x-address `https://xrpaddress.info/api/decode/<x-address, eg. X...>`

👋 [Wietse](https://twitter.com/WietseWind)

var codec = require('xrpl-tagged-address-codec')
var convertedAddress

function convert (str) {
  var a = document.getElementById('addr')
  var err = document.getElementById('err')
  var results = document.getElementById('results')
  if (typeof str === 'string') {
    a.value = str.trim()
  }
  document.getElementById('warn').style.display = 'none';
  err.style.display = 'none';
  results.style.display = 'none';
  try {
    var c
    if (a.value.trim().match(/^[TX]/)) {
      c = codec.Decode(a.value.trim())
    } else {
      var account = a.value.trim().replace(/[^a-zA-Z0-9]+.*$/g, '')
      var tag = a.value.trim().replace(/^.*[: ,\-]+/g, '')
      if (tag === account) tag = null
      c = codec.Encode({ account: account, tag: tag })
    }
    results.style.display = 'block';
    convertedAddress = c
    if (typeof c === 'string') c = { address: c }
    results.querySelector('pre').innerHTML = JSON.stringify(c, null, 2)
      .replace(/\"([a-z]+)\":/g, '"<span style="color: #8252fa">$1</span>":')
      .replace(/:[^\"]+\"([a-zA-Z0-9]+)\"/g, '<span>: "<span class="text-primary clickfill">$1</span>"</span>')
  } catch (e) {
    err.style.display = 'block';
    err.innerHTML = '<i class="fas fa-exclamation"></i> ' + e.message
  }
}

document.getElementById('addr').onkeydown = function (e) {
  if (e.keyCode === 13) {
    convert()
  }
}

document.getElementById('convert').onclick = function (e) {
  convert()
}

document.onclick = function (e) {
  var c = e.target.getAttribute('class')
  if (c && typeof c === 'string' && c.match(/clickfill/)) {
    var v = e.target.innerHTML
    document.getElementById('results').style.opacity = '0.5'
    if (v.match(/^r[a-zA-Z0-9]{24,35}$/) || v.match(/^[0-9]+$/)) {
      document.getElementById('addr').value = (convertedAddress.account + (convertedAddress.tag === null ? '' : ':' + convertedAddress.tag))
    } else {
      document.getElementById('addr').value = (v)
    }
    convert()
    setTimeout(function () {
      document.getElementById('results').style.opacity = '1'
    }, 150)
  }
}

window.addEventListener('message', function(e) {
  if (e.origin !== "https://runkit.com")
    return;

  try {
    var data = JSON.parse(e.data);
  } catch (e) {
    return false;
  }

  if (data.context !== 'iframe.resize') {
    return false;
  }

  var iframe = document.querySelector('iframe[src="' + data.src + '"]');

  if (!iframe) {
    return false;
  }

  if (data.height) {
    iframe.height = data.height;
  }
});
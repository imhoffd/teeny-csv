module.exports = l => {
  var c, i = 0, s = '', r = [], q = 0, e = 0
  if (l.charCodeAt(i) === 0xfeff) i++
  while (c = l.charAt(i++)) {
    if (c === ',' && !q) { r.push(s); s = '' }
    else if (c === '\\') { e = 1 }
    else if (c === '"') { if (e) { s += c; e = 0 } else { q = !q } }
    else if (e) { e = 0 }
    else { s += c }
  }
  r.push(s)
  return r
}

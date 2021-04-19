module.exports = l => {
  var c, i = 0, s = '', r = [], q = false, e = false
  while (c = l.charAt(i++)) {
    if (c === ',' && !q) { r.push(s); s = '' }
    else if (c === '\\') { e = true }
    else if (c === '"') { if (e) { s += c; e = false } else { q = !q } }
    else if (e) { e = false }
    else { s += c }
  }
  r.push(s)
  return r
}

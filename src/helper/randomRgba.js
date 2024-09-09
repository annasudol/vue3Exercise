const randomRgba = () => {
  var o = Math.round,
    r = Math.random,
    s = 255
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.6 + ')'
}

export default randomRgba

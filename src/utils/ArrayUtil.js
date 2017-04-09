export default {
  isEqual: function (a, b) {
    a = [...(new Set(a.sort()))];
    b = [...(new Set(b.sort()))];

    if(a.length !== b.length) {
      return false;
    }

    a.forEach(i => {
      b = b.filter(j => j !== i);
    })

    return b.length === 0;
  }
};
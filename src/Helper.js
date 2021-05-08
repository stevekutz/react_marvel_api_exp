export function createAlphaArray() {
  let arr = [];
  let start = 65;

  for (let i = 65; i < start + 26; i++) {
    arr.push({
      upper: String.fromCharCode(i),
      lower: String.fromCharCode(i).toLowerCase()
    });
  }

  return arr;
}

function camelize(str) {
  let newStr = str.split('');
  const res = [];
  let skipNext = false;

  newStr.forEach((item) => {
    if (skipNext) {
      res.push(item.toUpperCase());
      skipNext = false;
    } else if (item === '-') {
      skipNext = true;
    } else {
      res.push(item);
    }
  });

  return res.join('');
}

function getMinMax(str) {
  const arr = str.split(' ');
  const numArr = [];

  arr.forEach(item => {
    const num = +item;
    if (isFinite(num)) {
      numArr.push(num);
    }
  });

  return {
    min: Math.min(...numArr),
    max: Math.max(...numArr)
  };
}

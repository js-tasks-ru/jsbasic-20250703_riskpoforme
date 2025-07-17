function filterRange(arr, a, b) {
	let res = []
	for (item of arr) {
		if (+item >= a && +item <= b) {
			res.push(item)
		}
	}
	return res
}

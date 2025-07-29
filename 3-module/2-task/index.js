function filterRange(arr, a, b) {
	let res = arr.filter(item => +item >= a && +item <= b)
	return res
}

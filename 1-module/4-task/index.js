function checkSpam(str) {
	const betSpam = '1XBET';
	const xxxSpam = 'XXX';

	caseLess = str.toUpperCase();

	return caseLess.includes(betSpam) || caseLess.includes(xxxSpam);
}

function namify(users) {
	const obj = []
	for (let user of users) {
		obj.push(user.name)
	}
	return obj
}

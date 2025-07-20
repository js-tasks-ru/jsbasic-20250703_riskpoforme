function makeFriendsList(friends) {
	const ul = document.createElement('ul');
	let realFriends = friends.map(friend => `${friend.firstName} + ' ' + ${friend.lastName}`);
	
	realFriends.forEach(item => {
	  const li = document.createElement('li');
	  li.textContent = item;
	  ul.appendChild(li)
	})
	return ul
}

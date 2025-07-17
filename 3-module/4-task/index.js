function showSalary(users, age) {
  const res = [];
  users.forEach(user => {
    if (user.age <= age) {
      res.push(`${user.name}, ${user.balance}`);
    }
  });
  return res.join('\n');
}

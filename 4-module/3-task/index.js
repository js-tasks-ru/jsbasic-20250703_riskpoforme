function highlight(table) {
  const rows = table.tBodies[0].rows;

  for (let row of rows) {
    const age = row.cells[1].textContent;
    const sex = row.cells[2].textContent;
    const vlblt = row.cells[3].getAttribute('data-available');

    if (vlblt === null) {
      row.hidden = true;
    } else {
      row.classList.add(vlblt === "true" ? "available" : "unavailable");
    }

    row.classList.add(sex === 'm' ? 'male' : 'female');

    if (parseInt(age, 10) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}

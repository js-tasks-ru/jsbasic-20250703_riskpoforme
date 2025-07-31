``
export default class UserTable {
  #rows = [];
  elem = null;

  constructor(rows) {
    this.#rows = rows ?? [];
    this.#render();
    this.#onBtnClick();
  }

  #html() {
    return `
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.#rows.map(row => `
            <tr>
              <td>${row.name}</td>
              <td>${row.age}</td>
              <td>${row.salary}</td>
              <td>${row.city}</td>
              <td><button>[X]</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  #render() {
    const tmp = document.createElement('div');
    tmp.innerHTML = this.#html();
    this.elem = tmp.querySelector('table');
  }

  #onBtnClick() {
    this.elem.addEventListener('click', (event) => {
      if (event.target.tagName !== 'BUTTON') return;
      const row = event.target.closest('tr');
      if (row) row.remove();
    });
  }
}

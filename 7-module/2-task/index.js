import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;

  constructor() {
    this.#render();
    this.#initCloseButton();
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.#handleKeydown);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.appendChild(node);
  }

  close() {
    if (this.elem.parentElement) {
      this.elem.remove();
    }
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#handleKeydown);
  }

  #initCloseButton() {
    const closeBtn = this.elem.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => this.close());
  }

  #handleKeydown = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  };

  #html() {
    return `
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close" aria-label="Close modal">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#html());
}

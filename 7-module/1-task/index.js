import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#render();
    this.#scroller();
    this.#initCategorySelect();
  }

  #html() {
    return `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
          ${this.categories.map((ctgry, index) => `
            <a href="#" 
              class="ribbon__item ${index === 0 ? 'ribbon__item_active' : ''}" 
              data-id="${ctgry.id}">${ctgry.name}</a>
          `).join('')}      
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#html());
  }

  #scroller() {
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    const updateArrows = () => {
      const scrollLeft = ribbonInner.scrollLeft;
      const scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

      arrowLeft.classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
      arrowRight.classList.toggle('ribbon__arrow_visible', scrollRight > 1);
    };

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', updateArrows);

    requestAnimationFrame(() => {
      updateArrows();
    });
  }

  #initCategorySelect() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('click', (event) => {
      const item = event.target.closest('.ribbon__item');
      if (!item) return;

      event.preventDefault();

      const prevActive = ribbonInner.querySelector('.ribbon__item_active');
      if (prevActive) {
        prevActive.classList.remove('ribbon__item_active');
      }

      item.classList.add('ribbon__item_active');

      const categoryId = item.dataset.id;

      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: categoryId,
        bubbles: true
      }));
    });
  }
}

import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem = null;
  products = [];
  filters = {};

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.#render();
  }

updateFilter(newFilters) {
  Object.assign(this.filters, newFilters);

  const container = this.elem.querySelector('.products-grid__inner');
  container.innerHTML = '';

  const filteredProducts = this.products.filter(product => {
    if (this.filters.noNuts && product.nuts) return false;
    if (this.filters.vegeterianOnly && !product.vegeterian) return false;
    if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;
    if (this.filters.category && product.category !== this.filters.category) return false;
    return true;
  });

  for (const product of filteredProducts) {
    const card = new ProductCard(product);
    container.append(card.elem);
  }
}

#render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          ${this.products
            .map(product => new ProductCard(product).elem.outerHTML)
            .join('')}
        </div>
      </div>
    `);

  }
}

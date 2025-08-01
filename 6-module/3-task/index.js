import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.#render();
    this.#initCarousel();
    this.#onCarouselBtnClick();
  }

  #html() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display:none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides
            .map(
              (slide) => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${
                slide.image
              }" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  #render() {
    this.elem = createElement(this.#html());
  }

  #initCarousel() {
    const leftArrow = this.elem.querySelector(".carousel__arrow_left");
    const rightArrow = this.elem.querySelector(".carousel__arrow_right");
    const carouselInner = this.elem.querySelector(".carousel__inner");
    const SLIDES_COUNT = this.slides.length;

    let offset = 0;
    leftArrow.style.display = "none";
    carouselInner.style.transform = `translateX(${offset}px)`;

    rightArrow.addEventListener("click", () => {
      const carouselWidth =
        this.elem.querySelector(".carousel__slide").offsetWidth;
      offset -= carouselWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;
      if (offset === -((SLIDES_COUNT - 1) * carouselWidth)) {
        rightArrow.style.display = "none";
      } else {
        leftArrow.style.display = "";
      }
    });

    leftArrow.addEventListener("click", () => {
      const carouselWidth =
        this.elem.querySelector(".carousel__slide").offsetWidth;
      offset += carouselWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;

      if (offset === 0) {
        leftArrow.style.display = "none";
      } else {
        rightArrow.style.display = "";
      }
    });
  }

  #onCarouselBtnClick() {
    this.elem.addEventListener("click", (event) => {
      const btn = event.target.closest(".carousel__button");
      if (!btn) return;

      const slide = btn.closest(".carousel__slide");
      const productId = slide.dataset.id;

      const productAddEvent = new CustomEvent("product-add", {
        detail: productId,
        bubbles: true,
      });

      this.elem.dispatchEvent(productAddEvent);
    });
  }
}

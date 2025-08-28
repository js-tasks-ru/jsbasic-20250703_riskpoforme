export default class StepSlider {
  elem = null
  value = 0

  constructor({ steps, value = 0 }) {
    this.config = { steps, value }
    this.value = value
    this.#render()
    this.initSteps()
  }

  initSteps() {
    const sldr = this.elem
    sldr.addEventListener('click', (event) => {
      const sldrWidth = sldr.offsetWidth
      let left = event.clientX - sldr.getBoundingClientRect().left
      let leftRelative = left / sldrWidth
      let segments = this.config.steps - 1
      let approximateValue = leftRelative * segments
      let value = Math.round(approximateValue)
      let valuePercents = value / segments * 100

      this.value = value

      const valueElem = sldr.querySelector('.slider__value')
      valueElem.textContent = this.value

      const thumb = sldr.querySelector('.slider__thumb')
      thumb.style.left = `${valuePercents}%`

      const progress = sldr.querySelector('.slider__progress')
      progress.style.width = `${valuePercents}%`

      const stepsSpans = sldr.querySelectorAll('.slider__steps span')
      stepsSpans.forEach((span, index) => {
        span.classList.toggle('slider__step-active', index === this.value)
      })

      const customEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      sldr.dispatchEvent(customEvent)
    })
  }

  #html() {
    const valuePercents = this.value / (this.config.steps - 1) * 100
    return `
      <div class="slider">
        <div class="slider__thumb" style="left: ${valuePercents}%;"><span class="slider__value">${this.value}</span></div>
        <div class="slider__progress" style="width: ${valuePercents}%;"></div>
        <div class="slider__steps">
          ${Array.from({ length: this.config.steps }).map((_, i) =>
            i === this.value ? '<span class="slider__step-active"></span>' : '<span></span>'
          ).join('')}
        </div>
      </div>
    `
  }

  #render() {
    const tmp = document.createElement('div')
    tmp.innerHTML = this.#html()
    this.elem = tmp.firstElementChild
  }
}

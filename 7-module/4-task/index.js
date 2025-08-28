export default class StepSlider {
  elem = null
  value = 0

  constructor({ steps, value = 0 }) {
    this.config = { steps, value }
    this.value = value
    this.#render()
    this.#initClick()
    this.#initDrag()
  }

  #initClick() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left
      let leftRelative = left / this.elem.offsetWidth
      let segments = this.config.steps - 1
      this.value = Math.round(leftRelative * segments)
      this.#updateSlider()
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }))
    })
  }

  #initDrag() {
    const thumb = this.elem.querySelector('.slider__thumb')
    thumb.ondragstart = () => false

    thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault()
      this.elem.classList.add('slider_dragging')

      const onMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left
        let leftRelative = left / this.elem.offsetWidth
        if (leftRelative < 0) leftRelative = 0
        if (leftRelative > 1) leftRelative = 1

        const percent = leftRelative * 100

        const thumb = this.elem.querySelector('.slider__thumb')
        const progress = this.elem.querySelector('.slider__progress')

        thumb.style.left = `${percent}%`
        progress.style.width = `${percent}%`
      }

      const onUp = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left
        let leftRelative = left / this.elem.offsetWidth
        if (leftRelative < 0) leftRelative = 0
        if (leftRelative > 1) leftRelative = 1

        let segments = this.config.steps - 1
        this.value = Math.round(leftRelative * segments)

        this.#updateSlider()
        this.elem.classList.remove('slider_dragging')

        document.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerup', onUp)

        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }))
      }

      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUp)
    })
  }

  #updateSlider() {
    const segments = this.config.steps - 1
    const percent = this.value / segments * 100

    const valueElem = this.elem.querySelector('.slider__value')
    valueElem.textContent = this.value

    const thumb = this.elem.querySelector('.slider__thumb')
    thumb.style.left = `${percent}%`

    const progress = this.elem.querySelector('.slider__progress')
    progress.style.width = `${percent}%`

    const steps = this.elem.querySelectorAll('.slider__steps span')
    steps.forEach((span, index) => {
      span.classList.toggle('slider__step-active', index === this.value)
    })
  }

  #html() {
    const percent = this.value / (this.config.steps - 1) * 100
    return `
      <div class="slider">
        <div class="slider__thumb" style="left: ${percent}%;">
          <span class="slider__value">${this.value}</span>
        </div>  
        <div class="slider__progress" style="width: ${percent}%"></div>
        <div class="slider__steps">
          ${Array.from({ length: this.config.steps }).map((_, i) =>
            i === this.value
              ? '<span class="slider__step-active"></span>'
              : '<span></span>'
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

function initCarousel() {
  const leftArrow = document.querySelector('.carousel__arrow_left')
  const rightArrow = document.querySelector('.carousel__arrow_right')
  const carouselInner = document.querySelector('.carousel__inner')
  const carouselWidth = carouselInner.offsetWidth
  const SLIDES_COUNT = 4

  let offset = 0;
  leftArrow.style.display = 'none'

  rightArrow.addEventListener('click', () => {
    offset -= carouselWidth
    carouselInner.style.transform = `translateX(${offset}px)`
    
    if (offset === -((SLIDES_COUNT-1) * carouselWidth)) {
      rightArrow.style.display = 'none'
    } else {
      leftArrow.style.display = ''
    }
  })

  leftArrow.addEventListener('click', () => {
    offset += carouselWidth
    carouselInner.style.transform = `translateX(${offset}px)`

    if (offset === 0) {
      leftArrow.style.display = 'none'
    } else {
      rightArrow.style.display = ''
    }
  })
}
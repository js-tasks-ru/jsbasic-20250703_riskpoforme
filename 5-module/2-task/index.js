function toggleText() {
 const btn = document.querySelector('.toggle-text-button')
 const txt = document.querySelector('#text')
 
 btn.addEventListener('click', () => {
  if (txt.hidden === true) {
   txt.hidden = false
  } else {
   txt.hidden = true
  }
 })
}

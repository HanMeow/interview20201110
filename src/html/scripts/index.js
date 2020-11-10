document.querySelectorAll('.menu-title').forEach(el => {
  el.onclick = () => { }  
})
document.querySelector('#menu-checkbox').onchange = e => {
  document.querySelector('html').classList[ e.target.checked ? 'add' : 'remove' ]('no-scroll')
  document.querySelector('body').classList[ e.target.checked ? 'add' : 'remove' ]('no-scroll')
}
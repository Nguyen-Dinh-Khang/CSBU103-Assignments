const btn = document.querySelector('.btn_swap')
const calculator = document.querySelector('.calculator_template')
const gallery = document.querySelector('.gallery_template')


btn.addEventListener('click', () => {
    btn.classList.toggle('active')
    btn.innerText = ''

    if (btn.classList.contains('active')) {
        btn.innerText = 'Calculator'
        gallery.style = 'display: block'
        calculator.style = 'display: none'
    } else {
        btn.innerText = 'Gallery'
        calculator.style = 'display: flex'
        gallery.style = 'display: none'
    }
})
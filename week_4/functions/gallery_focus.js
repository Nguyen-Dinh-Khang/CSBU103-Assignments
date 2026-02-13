const body = document.body
const focus = document.querySelector('.focus')
const btns = document.querySelectorAll('.btn')
const fragment = document.createDocumentFragment()
let current_focus_img


function Create_Fragment () {
    for (let child of btns) {
        fragment.appendChild(child)
    }
}

export function Clear_Focus_Img () {
    focus.innerHTML = ''
    current_focus_img = ''
    Create_Fragment()
    focus.appendChild(fragment)
    focus.style = 'display: none'
    body.style = 'overflow: visible'
}

function Create_Focus_Img (path) {
    focus.style = 'display: flex'
    const img = document.createElement('img')
    img.className = 'img_focus'
    img.src = path
    focus.appendChild(img)
    body.style = 'overflow: hidden'
}

export function Focus_Img (img) {
    current_focus_img = img
    Create_Focus_Img(img.src)
}

export function Get_Current_Focus_Img () {
    return current_focus_img
}
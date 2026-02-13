import { First_Render } from './gallery_initial.js'
import { Open_File, Check_Enter } from './gallery_add.js'
import { Clear_Focus_Img, Focus_Img, Get_Current_Focus_Img } from './gallery_focus.js'


export const gallery = document.querySelector('.gallery')
export const img_file = document.querySelector('.img_file')
export const img_src = document.querySelector('.img_src')
const btn_close = document.querySelector('.btn_close')
const btn_back = document.querySelector('.btn_back')
const btn_next = document.querySelector('.btn_next')




First_Render()





img_file.addEventListener('change', Open_File)
img_src.addEventListener('keydown', Check_Enter)

img_src.addEventListener('input', () => {})

btn_close.addEventListener('click', () => {
    Clear_Focus_Img()
})

btn_back.addEventListener('click', () => {
    const back_img = Get_Current_Focus_Img().previousElementSibling

    if (back_img) {
        Clear_Focus_Img()
        Focus_Img(back_img)
    }
})

btn_next.addEventListener('click', () => {
    const next_img = Get_Current_Focus_Img().nextElementSibling

    if (next_img) {
        Clear_Focus_Img()
        Focus_Img(next_img)
    }
})
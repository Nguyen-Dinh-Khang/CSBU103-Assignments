import { Focus_Img } from './gallery_focus.js'
import { gallery, img_file, img_src } from './gallery.js'


function Add_Img (path) {  
    const img = document.createElement('img')
    img.className = 'img'
    img.src = path
    img.addEventListener('click', () => {Focus_Img(img)})
    gallery.prepend(img)
}

export function Open_File (e) {
    const file = e.target.files[0]
    const path = URL.createObjectURL(file)
    console.log("File vừa được thêm vào: ", URL.createObjectURL(file))

    if (file) {
    img_src.value = ''
    Add_Img(path)
    }
} 

export function Check_Enter (e) {
    const src = e.target.value

    if (e.key === 'Enter') {
        console.log('SRC:', src)
        e.target.blur()

        if (src) {
            img_file.value = ''
            Add_Img(src)
        }
    }
}
import { Focus_Img } from './gallery_focus.js'
import { gallery } from './gallery.js'


const data = [
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-1.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-2.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-3.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-4.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-5.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-6.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-7.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-8.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-9.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-10.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-11.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-12.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-13.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-14.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-15.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-16.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-17.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-18.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-19.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-20.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-21.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-22.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-23.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-24.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-25.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-26.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-27.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-28.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-29.jpg.webp',
    'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/10/tai-anh-phong-canh-dep-30.jpg.webp',
]


export function First_Render () {
    data.map((link) => {
        const img = document.createElement('img')
        img.className = 'img'
        img.src = link
        img.addEventListener('click', () => {Focus_Img(img)})
        gallery.prepend(img)
    })
}

import $ from 'jquery';


$(function() {
const username = $('.username');
const password = $('.password1');
const repassword = $('.password2');
const error = $('.err');
const message = $('.message');

const submit = document.querySelector('.button').addEventListener('click', (e) => {
    error.innerText = ''
    message.innerText = ''
    const name = username.value
    const pas = password.value
    const repas = repassword.value


    if (!name  || !pas  || !repas){
        username.focus()
        return error.innerText = "Please fill in all infomation!"
    }
    if ( !(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(name)) ){
        username.focus()
        return error.innerText = `Invalid name! 
                                    Email format `
    }
    if ( !(/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,15}$/.test(pas)) ){
        password.focus()
        return error.innerText = `Invalid password!
                                    6-15 length, at least 1 number and 1 special character  `
    }
    if (pas !== repas){
        repassword.focus()
        return error.innerText = "The confirm password is wrong!"
    }

    const Input_Data= {
        username: name, 
        password: pas
    }
    return

    fetch('/create', {
        method: "POST",

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(Input_Data)
    })
    .then(response => {
        if (!response.ok){
            throw new Error('Connecting error, Please try again!');
        }
        return response.json()
    })
    .then(data => {
        console.log('Phản hồi từ server:', data)
        if (data.err){
            return error.innerText = `${data.err}`
        } else if (data.message){
            username.innerText = ''
            password.innerText = ''
            repassword.innerText = ''
            return message.innerText = `${data.message}`
        }
    })
    .catch(error => {
    // Xử lý các lỗi xảy ra trong quá trình gửi/nhận
    console.error(error);
    });

})



username.on('keyup', function(e) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name = username.val().trim();
    error.text(''); 


    if (e.key === 'Enter'){
        $('#password').focus();
    } else if (name.length !== 0){
        if ( !emailRegex.test(name) ){
            $username.addClass('underline'); 
        } else {
            $username.removeClass('underline');
        }
    } else {
        $username.removeClass('underline');
    }
})

password.addEventListener('keyup', (e) => {
    error.innerText = ''
    const pas = password.value

    if (e.key === 'Enter'){
            repassword.focus()
    } else if (pas.length !== 0){
        if ( !(/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,15}$/.test(pas)) ){
            password.classList.add('underline')
        } else {
            password.classList.remove('underline')
        }
    } else {
        password.classList.remove('underline')
    }
})

repassword.addEventListener('keyup', (e) => {
    error.innerText = ''
    const repas = repassword.value

    if (e.key === 'Enter'){
            repassword.blur()
    } else if (repas.length !== 0){
        if ( !(/^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,15}$/.test(repas)) ){
            repassword.classList.add('underline')
        } else {
            repassword.classList.remove('underline')
        }
    } else {
        repassword.classList.remove('underline')
    }
})



// document.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter'){
//         document.activeElement.blur()
//     }
// })
})
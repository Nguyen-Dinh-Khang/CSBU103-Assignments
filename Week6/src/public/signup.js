$(function() {
    const username = $('.username');
    const password = $('.password1');
    const repassword = $('.password2');
    const error = $('.err');
    const message = $('.message');
    const submitButton = $('.button');


    // Regex cho Email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Regex cho Mật khẩu (6-15 ký tự, ít nhất 1 số, 1 ký tự đặc biệt)
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,15}$/;


    // ===============================================
    // 1. XÁC THỰC KHI NHẤN NÚT SUBMIT (.button)
    // ===============================================
    submitButton.on('click', (e) => {

        e.preventDefault(); 
        

        const name = username.val().trim();
        const pas = password.val(); 
        const repas = repassword.val();
        error.text(''); 
        message.text(''); 


        if (!name || !pas || !repas) {
            username.focus(); 
            return error.text("Please fill in all infomation!");
        }
        if (!emailRegex.test(name)) {
            username.focus();
            return error.text(`Invalid name! 
                                 Email format `);
        }
        if (!passwordRegex.test(pas)) {
            password.focus();
            return error.text(`Invalid password!
                                 6-15 length, at least 1 number and 1 special character`);
        }
        if (pas !== repas) {
            repassword.focus();
            return error.text("The confirm password is wrong!");
        }
        

        const Input_Data = {
            username: name,
            password: pas
        };

        fetch('/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Input_Data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Connecting error, Please try again! Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Phản hồi từ server:', data);
            if (data.err) {
                return error.text(`${data.err}`);
            } else if (data.message) {
                username.val('');
                password.val('');
                repassword.val('');
                return message.text(`${data.message}`);
            }
        })
        .catch(err => { 
            console.error(err);
            error.text('An unexpected error occurred: ' + err.message); 
        });

    });


    // ===============================================
    // 2. XÁC THỰC TRÊN THỜI GIAN THỰC (KEYUP)
    // ===============================================
    username.on('keyup', function(e) {
        const name = username.val().trim();
        error.text(''); 
        
        if (e.key === 'Enter'){
            password.focus();
        } else if (name.length !== 0){
            if ( !emailRegex.test(name) ){
                username.addClass('underline');
            } else {
                username.removeClass('underline');
            }
        } else {
            username.removeClass('underline');
        }
    });

    password.on('keyup', function(e) {
        const pas = password.val();
        error.text(''); 

        if (e.key === 'Enter'){
            repassword.focus();
        } else if (pas.length !== 0){
            if ( !passwordRegex.test(pas) ){
                password.addClass('underline');
            } else {
                password.removeClass('underline');
            }
        } else {
            password.removeClass('underline');
        }
    });

    repassword.on('keyup', function(e) {
        const repas = repassword.val();
        error.text(''); 

        if (e.key === 'Enter'){
            repassword.blur();
        } else if (repas.length !== 0){
            if ( !passwordRegex.test(repas) ){ 
                repassword.addClass('underline');
            } else {
                repassword.removeClass('underline');
            }
        } else {
            repassword.removeClass('underline');
        }
    });


    /*
    $(document).on('keyup', (e) => {
        if (e.key === 'Enter'){
            $(document.activeElement).blur();
        }
    })
    */
});
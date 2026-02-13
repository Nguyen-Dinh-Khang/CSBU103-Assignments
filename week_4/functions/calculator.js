// Show time
let time = document.querySelector('.time');

setInterval(() => {
    now = new Date();
    
    const time_now = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,})
    
    time.innerText = time_now
    
    
    }, 1000)



// Input string
const string_input = document.querySelector('.nav_input')
const exception_key = [ 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 'Backspace', 'Alt', 'Shift', 'F12' ]

function Validate_Input (e) {
    const string = e.target.value
    console.log(e.key)

    if (e.key === 'Enter') {
        string_input.blur()
    } else if (string.length > 49 && !(exception_key.includes(e.key))) {

        window.alert("Your input is more than 50 characters now!")

        e.preventDefault()
    }  
}

string_input.addEventListener('keydown', Validate_Input)




// Calculator
let expression = ''
let display = ''
let pre_value = ''
let total_value = ''
let input = document.querySelector('.expression')
let result = document.querySelector('.result')

const numbers = ['0','1','2','3','4','5','6','7','8','9']


function The_Number (expression, index) {
    let gap = 0
    console.log("Đã vô hàm The_Number")
    for (let i = index; i < expression.length; i++) {
        console.log("Đã vô for của hàm The_Number", expression[i])
        if (numbers.includes(expression[i])) {
            console.log("chạy vòng lặp")
            gap += 1
        } else
            break
    }

    return gap
}

function Total (expression) {
    if (!expression) {
        return 0
    } else {
        try{
            console.log("1: Đã vô hàm Total")
            for (let i = 0; i < expression.length - 1; i++) {
                console.log("2: Đã vô for của hàm Total: ")
                if (expression[i] === expression[i+1]) {
                    if (numbers.includes(expression[i])) {
                        console.log("1 số đôi")
                        continue
                    } else if (expression[i] === '-') {
                        let gap = The_Number(expression, i+2)
                        console.log("3: Trùng: ", expression[1], expression[i+1], gap)
                        if (!gap) {
                            return 'Invalid operation'
                        }

                        expression = expression.slice(0,i+1) + '(' + expression.slice(i+1,i+2+gap) + ')' + expression.slice(i+2+gap)
                        console.log("4: Biểu thức mới: ", expression)
                    } else if (expression[i] === '+') { 
                        let gap = The_Number(expression, i+2)
                        console.log("3: Trùng: ", expression[1], expression[i+1], gap)
                        if (!gap) {
                            return 'Invalid operation'
                        }

                        expression = expression.slice(0,i+1) + '(' + expression.slice(i+1,i+2+gap) + ')' + expression.slice(i+2+gap)
                        console.log("4: Biểu thức mới: ", expression)
                    }else if (expression[i] === '/' || expression[i] === '%') {
                        return 'Invalid operation'
                    }
                } else if (expression[i] === 'a' && i > 0) {
                    if (numbers.includes(expression[i-1]) || expression[i-1] === ')') {
                        expression = expression.slice(0,i) + '*' + expression.slice(i)
                        i += 1
                    }
                } else if (expression[i] === 's' && (numbers.includes(expression[i+1]) || expression[i+1] === '(')) {
                    expression = expression.slice(0,i+1) + '*' + expression.slice(i+1)

                } else if (expression[i] === 'p' && i > 0) {
                    if (numbers.includes(expression[i-1]) || expression[i-1] === ')') {
                        expression = expression.slice(0,i) + '*' + expression.slice(i)
                        i += 1
                    }
                } else if (expression[i] === 'i' && (numbers.includes(expression[i+1]) || expression[i+1] === '(')) {
                    expression = expression.slice(0,i+1) + '*' + expression.slice(i+1)
                }
            }

            try{
                expression = expression.replace('ans', total_value)
                expression = expression.replace('pi', Math.PI)
                const operation = eval(expression)
                console.log("4: Biểu thức cuối: ", expression)
                return operation
            } catch (err) {
                console.log('Lỗi ngay cái tính tổng', err)
                console.log(expression)
                return 'Invalid operation'
            }

        } catch (err) {
            console.log(err)
            console.log(expression)
            return 'Error operation'
        }
    }
}

function Calculator (value) {
    result.innerText = ''
    pre_value = display[display.length-1]
    
    switch (value){
        case '/':
            expression += value
            display += ':'
            break
        case '*':
            expression += value
            display += 'x'
            break
        case '**':
            expression += value
            display += '^'
            break
        case '*/':
            expression += '/'
            display += '/'
            break
        case 'calculator':
            total_value = Total(expression)
            result.innerText = total_value
            total_value = (typeof total_value) === 'string' ? 0 : total_value
            break
        case 'ac':
            expression = ''
            display = ''
            break
        case 'del':
            if (pre_value === "^") {
                expression = expression.slice(0,-2)
                display = display.slice(0,-1)
            } else if (pre_value === 's') {
                expression = expression.slice(0,-3)
                display = display.slice(0,-3)
            } else if (pre_value === 'i') {
                expression = expression.slice(0,-2)
                display = display.slice(0,-2)
            } else {
                expression = expression.slice(0,-1)
                display = display.slice(0,-1)
            }
            break
        default:
            expression += value
            display += value
    }
    console.log("Biểu thức hiện tại: ", expression)
    input.innerText = display
}


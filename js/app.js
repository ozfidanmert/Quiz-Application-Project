
const start_btn = document.querySelector('.start_btn button')
const exit_btn = document.querySelector('.buttons .quit')
const continue_btn = document.querySelector('.buttons .restart')

const restart_btn = document.querySelector('.result_box .restart');
const result_quit_btn = document.querySelector('.result_box .quit');


const timeCount = document.querySelector('.timer .time-sec')
const timeLine = document.querySelector('.time-line')

const info_box = document.querySelector('.info_box')
const quiz_box = document.querySelector('.quiz_box')
const result_box = document.querySelector('.result_box')

const next_btn = document.querySelector('.next_btn')
const que_text = document.querySelector('.que_text')
let option_list = document.querySelector('.option-list')

let tickIcon = `<div class="icon tick"><i class='bx bx-check'></i></div>`
let crossIcon = `<div class="icon cross"><i class='bx bx-x'></i></div>`
let counter;
let counterLine
let timeValue = 15
let widthValue = 0
let timerPass

let totalTrue = 0;
let totalFalse = 0;


function appStart() {
    result_box.classList.remove('activeResult')
    info_box.classList.remove('activeInfo')
    quiz_box.classList.add('activeQuiz')

    showQuestions(0)
    //* geri sayımı rakamını tetikler
    startTimer(timeValue)
    //* geri sayım icon tetikler
    startTimerLine(widthValue)
    next_btn.style.display = "none"
}

//* start button tıklandığında
start_btn.onclick = () => {
    info_box.classList.add('activeInfo')
}

//* exit button tıklandığında
exit_btn.onclick = () => {
    info_box.classList.remove('activeInfo')
    result_box.classList.remove('activeResult')
}

continue_btn.addEventListener('click', () => {
    appStart()
})

restart_btn.addEventListener('click', () => {
    window.location.reload()
    appStart()
});

result_quit_btn.addEventListener('click', () => {

    info_box.classList.remove('activeInfo')
    result_box.classList.remove('activeResult')
    window.location.reload()
});

let que_count = 0

function qpass() {
    if (que_count < questions.length - 1) {
        que_count++;
        showQuestions(que_count)

        // clearInterval(counter)
        startTimer(timeValue)

        // clearInterval(counterLine)
        startTimerLine(widthValue)
        clearInterval(timerPass)
        next_btn.style.display = "none"
    }
    else {
        showResultBox()
        clrInterval()
    }
}

function showResultBox() {
    info_box.classList.remove('activeInfo')
    quiz_box.classList.remove('activeQuiz')
    result_box.classList.add('activeResult')
}

function clrInterval() {
    clearInterval(counterLine)
    clearInterval(counter)
}

next_btn.addEventListener('click', () => {
    qpass()
})


const showQuestions = (index) => {

    /* <span>Türkiye'nin başkenti neresidir?</span> */
    que_text.innerHTML = `<span>${questions[index].numb}. ${questions[index].question}</span>`

    let option_tag = ''
    questions[index].options.map((ques) => {
        option_tag +=
            `<div class="option"><span>${ques}</span></div>`
    })

    option_list.innerHTML = option_tag

    const options = document.querySelectorAll('.option')

    options.forEach((option) => {
        option.setAttribute("onclick", 'optionSelected(this)')
    })

    listen()
}

const optionSelected = (answer) => {

    let userAns = answer.textContent;
    let result = questions[que_count].answer;
    let allOptions = option_list.children.length

    //* Seçilen seçenek ile result aynı (doğru) sonuç ise;
    if (userAns.includes(result)) {
        next_btn.style.display = "block"
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon)
        totalTrue++;
        clrInterval()
        
    }
    //* Seçilen seçenek ile result farklı (yanlış) sonuç ise;
    else {
        answer.classList.remove('correct');
        answer.classList.add('wrong');
        answer.insertAdjacentHTML('beforeend', crossIcon)
        next_btn.style.display = "block"
        totalFalse++;

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent === result) {

                option_list.children[i].classList.add('correct')
                option_list.children[i].insertAdjacentHTML('beforeend', tickIcon)
            }
        }

        // timerPass = setInterval(() => {
        //     qpass()
        // }, 230000);
        clrInterval()
    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disabled')
    }
}

const startTimer = (time) => {

    const timer = () => {
        timeCount.textContent = time
        time--;

        if (time < 9) {
            timeCount.textContent = "0" + timeCount.textContent
        }
        if (time < 0) {
            clrInterval()
            timeCount.textContent = "00"

            totalFalse++;

            next_btn.style.display = "block"
            let result = questions[que_count].answer;
            let allOptions = option_list.children.length

            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent === result) {

                    option_list.children[i].classList.add('wrong')
                    option_list.children[i].insertAdjacentHTML('beforeend', crossIcon)
                }
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add('disabled')
            }

        }
    }
    counter = setInterval(timer, 1000);
}

const startTimerLine = (time) => {
    counterLine = setInterval(timer, 29);

    function timer() {
        time++;
        timeLine.style.width = time + "px"
        if (time > 549) {
            clearInterval(counterLine)
        }
    }

}

const listen = () => {
    const qFirst = document.querySelector('.qFirst');
    const qLast = document.querySelector('.qLast');
    const resultTrue = document.querySelector('.totalTrue');
    const resultFalse = document.querySelector('.totalFalse');

    qFirst.innerHTML = que_count + 1;
    qLast.innerHTML = questions.length;


    resultTrue.textContent = totalTrue
    resultFalse.textContent = totalFalse
}

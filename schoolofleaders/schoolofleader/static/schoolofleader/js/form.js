const formSection = document.querySelectorAll('.form__section')
i = 1
formSection[i].style = 'display: unset; opacity: 70%'

const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
const alphabet_translit = ['a', 'b', 'v', 'g', 'd', 'e', 'e', 'j', 'z', 'i', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch','sh','sch', '', 'i', "'", 'e', 'u', 'ya']
function transite(name) {
    var new_name = ''
    for (var i = 0; i < name.length; i++){
        if (!(alphabet.indexOf(name[i].toLowerCase()) == -1)) {
            if (name[i].toLowerCase() == name[i]) {
                new_name = new_name + alphabet_translit[alphabet.indexOf(name[i])].toLowerCase()
            } else {
                new_name = new_name + alphabet_translit[alphabet.indexOf(name[i].toLowerCase())].toUpperCase()
            }
        } else {
            new_name = new_name + name[i]
        }
    }
    return new_name
}


function check() {
    if (!document.forms['form'].checkValidity()) {
        document.querySelector('.valid_error').style = 'display: unset'
    }
}

function validate() {
    var formData = new FormData(document.forms['form'])
    formData.set('file', document.querySelector('.file_selector').files[0], transite(formData.get('file').name))
    const XHR = new XMLHttpRequest()
    XHR.open("POST", 'http://127.0.0.1:8000/form')
    XHR.send(formData)
    // document.location.href = 'http://127.0.0.1:8000/form'
    return false
}


window.addEventListener('DOMContentLoaded', () => {
    const radio = document.querySelectorAll('.check_university')
    for (var j = 0; j < radio.length; j++) {
        radio[j].addEventListener('click', (event) => {
            if (event.target.id == "yes") {
                formSection[i].style = 'opacity: 100%; display: unset'
                document.querySelector('.next').disabled = false
                document.querySelector('.prev').disabled = false
                document.querySelector('.submit').disabled = false
                const inputs = formSection[i].querySelectorAll('input')
                for (var t = 0; t < inputs.length; t++) {
                    inputs[t].disabled = false
                }
                const textareas = formSection[i].querySelectorAll('textarea')
                for (var t = 0; t < textareas.length; t++) {
                    if (textareas[t].parentNode.className === 'form__radio') {
                        textareas[t].disabled = false
                    }
                }
                document.querySelector('.sad_message').style = 'display: none'
            }
            if (event.target.id == "no") {
                document.querySelector('.sad_message').style = 'display: unset'
                formSection[i].style = 'opacity: 70%; display: unset'
                document.querySelector('.next').disabled = true
                document.querySelector('.prev').disabled = true
                document.querySelector('.submit').disabled = true
                const inputs = formSection[i].querySelectorAll('input')
                for (var t = 0; t < inputs.length; t++) {
                    inputs[t].disabled = true
                }
                const textareas = formSection[i].querySelectorAll('textarea')
                for (var t = 0; t < textareas.length; t++) {
                    textareas[t].disabled = true
                }
            }
        })
    }
    
    document.querySelector('.question_1').querySelectorAll('input').forEach(elem => addEventListener('click', (event) => {
        if (event.target.id == 'question_1_other') {
            document.querySelector('#question_1_textarea').style = 'opacity: 100%'
            document.querySelector('#question_1_textarea').disabled = false
        }
        if (event.target.id == "question_1_another_no" || event.target.id == "question_1_no") {
            document.querySelector('#question_1_textarea').style = 'opacity: 70%'
            document.querySelector('#question_1_textarea').disabled = true
        }
    }))

    const radio_campus = document.querySelectorAll('.campus')
    for (var j = 0; j < radio_campus.length; j++) {
        radio_campus[j].addEventListener('click', (event) => {
            if (event.target.value == 'Москва') {
                const inputs = formSection[0].querySelectorAll('input')
                for (var t = 0; t < inputs.length; t++) {
                    inputs[t].disabled = true
                }
                const textareas = formSection[0].querySelectorAll('textarea')
                for (var t = 0; t < textareas.length; t++) {
                    textareas[t].disabled = true
                }
                for (var t = 2; t < formSection.length; t++) {
                    const inputs = formSection[t].querySelectorAll('input')
                    for (var l = 0; l < inputs.length; l++) {
                        inputs[l].disabled = false
                    }
                    const textareas = formSection[t].querySelectorAll('textarea')
                    for (var l = 0; l < textareas.length; l++) {
                        textareas[l].disabled = false
                    }
                }
                document.querySelector('#question_1_textarea').style = 'opacity: 70%'
                document.querySelector('#question_1_textarea').disabled = true
            } else {
                for (var t = 2; t < formSection.length; t++) {
                    const inputs = formSection[t].querySelectorAll('input')
                    for (var l = 0; l < inputs.length; l++) {
                        inputs[l].disabled = true
                    }
                    const textareas = formSection[t].querySelectorAll('textarea')
                    for (var l = 0; l < textareas.length; l++) {
                        textareas[l].disabled = true
                    }
                }
                const inputs = formSection[0].querySelectorAll('input')
                for (var t = 0; t < inputs.length; t++) {
                    inputs[t].disabled = false
                }
                const textareas = formSection[0].querySelectorAll('textarea')
                for (var t = 0; t < textareas.length; t++) {
                    textareas[t].disabled = false
                }
            }
        })
    }

    const button = document.querySelector('.next')
    button.addEventListener('click', (event) => {
        if (document.querySelector('.moscow').checked == true) {
            i = i + 1
            formSection[i-1].style = 'display: none'
            formSection[i].style = 'display: unset'
        } else {
            i = 0
            formSection[1].style = 'display: none'
            formSection[i].style = 'display: unset'
        }
        if (i != 1) {
            document.querySelector('.form__check').style = 'display: none'
            document.querySelector('.prev').style = 'display: unset'
        }
        if (i == formSection.length-1 || i == 0) {
            event.target.style = 'display: none'
            document.querySelector('.submit').style = 'display: unset'
        }
    })

    const button_prev = document.querySelector('.prev')
    button_prev.addEventListener('click', (event) => {
        if (document.querySelector('.moscow').checked == true) {
            i = i - 1
            formSection[i+1].style = 'display: none'
            formSection[i].style = 'display: unset'
        } else {
            i = 1
            formSection[0].style = 'display: none'
            formSection[i].style = 'display: unset'
        }
        if (i == 1) {
            document.querySelector('.form__check').style = 'display: flex'
            event.target.style = 'display: none'
        }
        if (i < formSection.length-1 || i != 0) {
            document.querySelector('.next').style = 'display: unset'
            document.querySelector('.submit').style = 'display: none'
        }
    })

    document.querySelector('.file_selector').addEventListener('change', (event) => {
        document.querySelector('.file__span').textContent = event.target.files[0].name
        document.querySelector('.file__span').classList.remove('fiel__span_hide')
    })
})
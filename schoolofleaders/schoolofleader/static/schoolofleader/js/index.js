window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq__item').forEach(elem => elem.addEventListener('click', (event) => {
        event.target.querySelector('.faq__opening').classList.toggle('close')
        event.target.querySelector('.faq__icon').classList.toggle('rotate')
    }))
    document.querySelectorAll('.faq__icon').forEach(elem => elem.addEventListener('click', (event) => {
        event.target.parentNode.querySelector('.faq__opening').classList.toggle('close')
        event.target.parentNode.querySelector('.faq__icon').classList.toggle('rotate')
    }))

})
/* slider */
var swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/* work-tabs */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.work__btn').forEach(function (el) {
    el.addEventListener('click', function(el) {
      const tab = el.currentTarget.dataset.path
      document.querySelectorAll('.tab-content').forEach(function (el) {
        el.classList.remove('tab-content--active')
        document.querySelector(`[data-target='${tab}']`).classList.add('tab-content--active')
      })
    })
  })
})

/* accordion */
$(".questions__accordion").accordion({
  heightStyle: "content"
})

/* burger */
window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#burger__menu').classList.toggle('is-active')
    document.querySelector('#burger__icon').classList.toggle('is-active')
    document.querySelector('#burger__icon2').classList.toggle('is-active')
  })
})

/* search */
let lyp = document.querySelector('.search');
let pole = document.querySelector('.search__box');
let exit = document.querySelector('.search__exit');

lyp.addEventListener('click', function(){
  pole.classList.toggle('search__box-active');
});

exit.addEventListener('click', function(){
  pole.classList.toggle('search__box-active');
});
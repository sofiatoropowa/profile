/* create task */
document.querySelector('.popup__create').addEventListener('click', function(){
  document.querySelector('.popup').classList.add('popup_active');
});

document.querySelector('.close__popup').addEventListener('click', function(){
  document.querySelector('.popup').classList.remove('popup_active');
});

/* sort */
document.addEventListener('DOMContentLoaded', function(){
	let item = localStorage.getItem('selection');
	let select = document.getElementById("selection");
	select.value = item;
});

function submitForm(){
	let select = document.getElementById("selection");
	let value = select.options[select.selectedIndex].value;
	localStorage.setItem('selection', value);
}

/* select */
function format_date() {
    const zero_started = n => n < 10 ? `0${n}`: n;
    date = new Date();
    return `${date.getFullYear()}-${zero_started(date.getMonth() + 1)}-${zero_started(date.getDate())}`;
}

const select = document.getElementById("selection__status");
const task_cards = document.querySelectorAll(".task-card");

for(const card of task_cards){
	card.querySelector(".selection__status").addEventListener("change", (e)=> {
		if (e.target.value === "select__completed"){
			today_date = format_date();
			card.querySelector(".calendar__date").value = today_date;
		} else if (e.target.value === "select__work"){
			e.target.style.background = "#D8F1FF";
		}
});
}

/* open-delete */
for(const card of task_cards) {
	card.querySelector(".open__menu").addEventListener("click", function() {
		const delete_btn = card.querySelector(".delete__task");
		if(delete_btn.classList.contains("hidden")) delete_btn.classList.remove("hidden");
		else delete_btn.classList.add("hidden"); 
    });
}

/* select post */
for(const card of task_cards){
	card.querySelector('#selection__status').addEventListener('change', function() {
		card.querySelector('.status__form').submit();
	});
}

/* expiration */
let actual_date = new Date();

function getDateFromString(el) {

  let dateParts = el.split('-');
  let date = new Date();
  
  date.setDate(dateParts[2]);
  date.setMonth(dateParts[1] - 1);
  date.setFullYear(dateParts[0]);
  
  return date;
};

for(const card of task_cards){
	let elem = card.querySelector('#calendar__period');
	if (getDateFromString(elem.value) <= actual_date) {
		card.style.background = "#FFF4F4";
	}
};

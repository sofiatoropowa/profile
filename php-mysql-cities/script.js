/* table */

let lyp = document.querySelector('.show-table');
let pole = document.querySelector('.table');
let exit = document.querySelector('.close-table');

lyp.addEventListener('click', function(){
  pole.classList.remove('table-active');
});

exit.addEventListener('click', function(){
  pole.classList.add('table-active');
});

/* form validation */

//Если форма заполнена, разрешить отправку формы

let btnSubmit = document.getElementById('btnSubmit');

const inputs = document.querySelectorAll('.modal-input')

const hasInvalidInput = inputList => inputList.some((inputElement) => !inputElement.validity.valid);


const setIsDisabled = () => {
  const isValid = !hasInvalidInput(Array.from(inputs))
  if (!(isValid)) {
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = "0.4";
  } else {
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = "1";
  }
}

inputs.forEach(input => input.addEventListener('input', setIsDisabled))
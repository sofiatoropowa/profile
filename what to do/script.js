/* my actions */
let myActions = JSON.parse(localStorage.getItem("myActions")) || [];

document.querySelector(".btn-add").addEventListener("click", () => {
    document.querySelector(".my-actions").innerHTML = `<input type="text" class="my-actions__input"></input>
                                                       <button class="btn my-actions__btn">Add</button>`;

    document.querySelector(".my-actions__btn").addEventListener("click", () => {
        addMyActions();
        document.querySelector(".my-actions__input").value = "";
    })
})

addMyActions = () => {
    let inputText = document.querySelector(".my-actions__input").value;

    if (inputText !== "") {
        myActions.push(inputText);
    }

    localStorage.setItem("myActions", JSON.stringify(myActions));
}

/* request */
let filters = [];

async function make_request() {
    const url = 'https://www.boredapi.com/api/activity/';
    let response;
    newFilters = filters.filter(item => item != 'my-action');
    let randomElement = Math.floor(Math.random() * newFilters.length);

    if (newFilters.length) {
        response = await fetch(`${url}?type=${newFilters[randomElement]}`);
    } else {
        response = await fetch(url);
    }

    if(!response.ok) return;
    const data = await response.json();

    return {
        activity: data.activity,
        type: data.type
    }
}

async function main() {
    const data = await make_request();
    document.querySelector('.activity__name').innerHTML = data.activity;
    document.querySelector("div").dataset.type = data.type;
}

document.querySelector(".btn-next").addEventListener("click", function(){
    let randomAction = Math.random()
    if (filters.includes('my-action') && myActions.length && (filters.length == 1 || randomAction < 0.1)) {
        const random_index = Math.floor(Math.random() * myActions.length);
        document.querySelector('.activity__name').innerHTML = myActions[random_index];
        document.querySelector("div").setAttribute("data-type", "my");
    } else {
        main();
    }
    
    document.querySelector('.activity__btn-done').disabled = false;
    document.querySelector('.activity__btn-done').style.opacity = "1";
    document.querySelector('.activity__btn-done').style.cursor = "pointer";

    document.querySelector('.activity__btn-copy').disabled = false;
    document.querySelector('.activity__btn-copy').style.opacity = "1";
    document.querySelector('.activity__btn-copy').style.cursor = "pointer";
})

/* filter */
let btns = document.querySelectorAll(".filter__list-btn");
        
for (let btn of btns) {
    btn.addEventListener("click", function() {
        if (btn.classList.contains("filter-active")) {
            btn.classList.remove("filter-active");
            filters = filters.filter(function(f) { return f !== btn.value});
        } else {
            btn.classList.add("filter-active");
            filters.push(btn.value);
        }
    })
}

/* copy */
async function copyToClipboard() {
    await navigator.clipboard.writeText(document.querySelector('.activity__name').innerText);
}

/* copy-button */
document.querySelector(".activity__btn-copy").addEventListener("click", function() {
    document.querySelector('.activity__btn-copy').classList.add('btn-active');
    document.querySelector('.activity__btn-copy').innerHTML="Copied";

    setTimeout(function() {
        document.querySelector('.activity__btn-copy').classList.remove('btn-active');
        document.querySelector('.activity__btn-copy').innerHTML="Copy";
    }, 2000);
})

/* activity done */
let history = JSON.parse(localStorage.getItem("history")) || [];

document.querySelector(".activity__btn-done").addEventListener("click", function() {
    let item = document.querySelector('.activity__name').innerText;
    let date = new Date();
    let type = document.querySelector("div").dataset.type;
    todayDate = date.toLocaleDateString();
    history.push([item, todayDate, type]);
    localStorage.setItem("history", JSON.stringify(history));
})

eval('var obj='+localStorage.rating);
let table = document.querySelector('.history__table');

for (const item in history) {
    let tr = document.createElement('tr');
    tr.className = "history__tr";
    let stars_html = "";
    for (let i = 1; i <= 5; i++) {
        if (!obj) {
            stars_html += `<button data-rate="${i}" class="fa-regular fa-star"></button>`;
        } else if (i <= obj[history[item][0]]) {
            stars_html += `<button data-rate="${i}" class="fa-solid fa-star"></button>`;
        } else {
            stars_html += `<button data-rate="${i}" class="fa-regular fa-star"></button>`;
        }
    }
    tr.innerHTML = `<td class="history__td">${Number(item)+1}</td>
                    <td class="history__td history__name">${history[item][0]}</td>
                    <td class="history__td">${history[item][1]}</td>
                    <td class="history__td">${history[item][2]}</td>
                    <td class="history__td cell">${stars_html}</td>`;

    table.append(tr);
}

/* diagram */
register = {};

for (let number = 0; number < history.length; number++) {
    let type = history[number][2];
    if (type in register) {
        register[type] += 1;
    } else {
        register[type] = 1;
    }
}

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork', 'my'],
        datasets: [{
            label: 'Activity frequency',
            data: [register['education'], register['recreational'], register['social'], register['diy'], register['charity'], register['cooking'], register['relaxation'], register['music'], register['busywork'], register['my']],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

/* rating */
let rating = JSON.parse(localStorage.getItem("rating")) || {};
const favourites = JSON.parse(localStorage.getItem("favourites")) || {};
let stars = document.querySelectorAll(".fa-star");
let topList = document.querySelector(".top__list");

topFive = (object) => {
    if(!Object.keys(object).length) return topList.innerHTML = "<li class='top__list-no-activities'>No activities yet</li>";

    let sortable = [];
    let favourites = {};
    for (let top in object) {
        if(sortable.length === 5) break;
        sortable.push([top, object[top]])
    }

    sortable.sort((a, b) => (b[1] - a[1]));

    for (let i = 0; i < sortable.length; i++) { 
        favourites[sortable[i][0]] = sortable[i][1];
    }

    topList.innerHTML = "";
    for (let item in favourites) {
        topList.innerHTML += `<li class="top__list-item">${item}</li>`;
    }
}

topFive(rating);

changeClassList = (el, newClass, oldClass) => {
    el.classList.add(newClass);
    el.classList.remove(oldClass);
}

for (let star of stars) {
    star.addEventListener("click", e => {
        let name = e.target.closest(".history__tr").querySelector(".history__name").innerHTML;
        let rate = e.target.dataset.rate;
        let faStar = e.target.closest(".cell").querySelectorAll(".fa-star")

        if (+rate > +rating[name]) {
            for (let i = +rating[name]; i < rate; i++) {
                changeClassList(faStar[i], 'fa-solid', 'fa-regular');
            }
        } else if (+rate < +rating[name]) {
            for (let i = +rate; i < rating[name]; i++) {
                changeClassList(faStar[i], 'fa-regular', 'fa-solid');
            }
        } else if (!rating[name]) {
            for (let i = 0; i < +rate; i++) {
                changeClassList(faStar[i], 'fa-solid', 'fa-regular');
            }
        }

        rating[name] = +rate;
        topFive(rating);
        localStorage.setItem("rating", JSON.stringify(rating));
        localStorage.setItem("favourites", JSON.stringify(favourites));
    })
}

/* clear the history */
document.querySelector(".history__clear").addEventListener("click", () => {
    history = {};
    localStorage.removeItem("history");
    rating = {};
    localStorage.removeItem("rating");
    topList.innerHTML = "";
    myActions = [];
    localStorage.removeItem("myActions");
}) 

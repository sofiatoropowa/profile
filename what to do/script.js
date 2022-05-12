/* request */
let filters = [];

async function make_request() {
    const url = 'https://www.boredapi.com/api/activity/';
    let response;
    randomElement = Math.floor(Math.random() * filters.length);

    if (filters.length) {
        response = await fetch(`${url}?type=${filters[randomElement]}`);
    } else {
        response = await fetch(url);
    }

    if(!response.ok) return;
    const data = await response.json();

    return {
        activity: data.activity,
        type: data.type
    };
}

async function main() {
    document.querySelector('.activity__name').innerHTML = (await make_request()).activity;
    document.querySelector("div").dataset.type = (await make_request()).type;
}

document.querySelector(".btn-next").addEventListener("click", function(){
    main();
    
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
const history = JSON.parse(localStorage.getItem("history")) || [];

document.querySelector(".activity__btn-done").addEventListener("click", function() {
    let item = document.querySelector('.activity__name').innerText;
    let date = new Date();
    let type = document.querySelector("div").dataset.type;
    todayDate = date.toLocaleDateString();
    history.push([item, todayDate, type]);
    localStorage.setItem("history", JSON.stringify(history));
})

for (const item in history) {
    let table = document.querySelector('.history__table');
    let tr = document.createElement('tr')
    tr.innerHTML = `<td class="history__td">${Number(item)+1}</td><td class="history__td">${history[item][0]}</td><td class="history__td">${history[item][1]}</td><td class="history__td">${history[item][2]}</td>`;
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
    console.log(register);
}

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'],
        datasets: [{
            label: 'Activity frequency',
            data: [register['education'], register['recreational'], register['social'], register['diy'], register['charity'], register['cooking'], register['relaxation'], register['music'], register['busywork']],
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



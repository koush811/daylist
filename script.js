const inputyear = document.getElementById('year')
const inputtable = document.getElementById('table')
const datedisplay = document.getElementById('date')
const list = document.getElementById('list')
const closebtn = document.getElementById('close')
const scheduledisplay = document.getElementById('schedule')
const input = document.querySelector('input')
const btn = document.getElementById('btn')

let day = new Date();
let currentyear = day.getFullYear();
let currentmonth = day.getMonth();
let date = 0
let selectDate = null

const STORAGE_KEY = 'daylist_schedules_v1'
let schedules = {}

function loadSchedules(){
    try{
        const raw = localStorage.getItem(STORAGE_KEY)
        if(raw){
            schedules = JSON.parse(raw)
        }
    }catch(e){
        console.error('loadSchedules error', e)
        schedules = {}
    }
}

function saveSchedules(){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules))
    }catch(e){
        console.error('saveSchedules error', e)
    }
}

function showcalender(year,month){
    inputyear.textContent = `${year}年${month+1}月`

    const firstday = new Date(year,month,1).getDay();
    const lastData = new Date(year,month+1,0).getDate();

    inputtable.innerHTML = ""

    const header = document.createElement("tr")
    const days = ["日","月","火","水","木","金","土"]
    days.forEach(i =>{
        const th = document.createElement("th")
        th.textContent = i
        header.appendChild(th)
        if(th.textContent == "日"){
            th.style.color = "red"
        }
        if(th.textContent == "土"){
            th.style.color = "blue"
        }

    })
    inputtable.appendChild(header)

    let dayElement = document.createElement("tr")

    for(let i = 0;i < firstday;i++){
        dayElement.appendChild(document.createElement("td"))
    }

    for(let date = 1;date <= lastData; date++){
        const td = document.createElement("td")
        td.textContent = date;

        td.onclick = () => {

            selectDate = `${year}-${String(month +1).padStart(2,"0")}-${String(date).padStart(2,"0")}`
            list.style.display = "flex"
            datedisplay.textContent = selectDate   
            showSchedule(selectDate)  
        }

        closebtn.addEventListener('click',()=>{
            list.style.display = "none"
        })

        const key = `${year}-${String(month +1).padStart(2,"0")}-${String(date).padStart(2,"0")}`
        if(schedules[key] && schedules[key].length > 0){
            td.classList.add('has-schedule')
        }

        dayElement.appendChild(td)

        if((firstday + date -1)%7 === 6){
            inputtable.appendChild(dayElement)
            dayElement = document.createElement("tr")
            
        }
    }

    if(dayElement.children.length > 0){
        inputtable.appendChild(dayElement)
    }
}

function showSchedule(datekey){
    scheduledisplay.innerHTML = ""
    if(schedules[datekey] && schedules[datekey].length > 0){
        scheduledisplay.innerHTML = schedules[datekey]
        .map((item ,idx) => `<div class="viewlist">${idx+1} ${item} <button class="delete" data-idx="${idx}">削除</button></div>`)
        .join("");
    } else {
        scheduledisplay.innerHTML = '<div>予定はありません</div>'
    }
}

btn.onclick = () => {
    if(!selectDate)return;
    const text = input.value.trim()
    if(text === "")return;

    if(!schedules[selectDate]){
        schedules[selectDate] = []
    }
    schedules[selectDate].push(text)
    input.value = ""
    saveSchedules()
    showSchedule(selectDate)
    showcalender(currentyear,currentmonth)
}

scheduledisplay.addEventListener('click', (e) => {
    if(!selectDate) return
    if(e.target && e.target.matches('.delete')){
        const idx = Number(e.target.dataset.idx)
        if(!isNaN(idx) && schedules[selectDate]){
            schedules[selectDate].splice(idx,1)
            if(schedules[selectDate].length === 0){
                delete schedules[selectDate]
            }
            saveSchedules()
            showSchedule(selectDate)
            showcalender(currentyear,currentmonth)
        }
    }
})



document.getElementById('next').onclick=()=>{
    currentmonth++
    if(currentmonth > 11){
        currentmonth = 0
        currentyear++
    }
    showcalender(currentyear,currentmonth)
}

document.getElementById('prev').onclick=()=>{
    currentmonth--
    if(currentmonth < 0){
        currentmonth = 11
        currentyear--
    }
    showcalender(currentyear,currentmonth)
}

loadSchedules()
showcalender(currentyear,currentmonth)

const inputyear = document.getElementById('year')
const inputtable = document.getElementById('table')

let day = new Date();
let correntyear = day.getFullYear();
let correntmonth = day.getMonth();
let date = 0

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
    })
    inputtable.appendChild(header)

    let dayElement = document.createElement("tr")

    for(let i = 1;i < firstday;i++){
        const td = document.createElement("td")
        dayElement.appendChild(td)
    }
    for(let date = 0;date <= lastData; date++){
        const td = document.createElement("td")
        td.textContent = date;
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

document.getElementById('next').onclick=()=>{
    correntmonth++
    if(correntmonth > 11){
        correntmonth = 0
        correntyear++
    }
    showcalender(correntyear,correntmonth)
}

document.getElementById('prev').onclick=()=>{
    correntmonth--
    if(correntmonth < 0){
        correntmonth = 11
        correntyear--
    }
    showcalender(correntyear,correntmonth)
}

showcalender(correntyear,correntmonth)

document.getElementById('date').textContent = `${correntyear}年${correntmonth}月`
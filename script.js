const inputyear = document.getElementById('year')
const inputtable = document.getElementById('table')

let day = new Date();
let correntyear = day.getFullYear();
let correntmonth = day.getMonth();

function showcalender(year,month){
    inputyear.textContent = `${year}年${month+1}月`

    const firstday = new Date(year,month,1).getDay();
    const lastData = new Date(year,month+1,0).getDate();

    let html = 
    `<tr>
      <th>日</th><th>月</th><th>火</th><th>水</th>
      <th>木</th><th>金</th><th>土</th>
    </tr>`

    let row = "<tr>"

    for(let i = 0;i < firstday; i++){
        row += "<td></td>"
    }

    for(let date = 1; date<=lastData;date++){
        if((firstday+date-1)%7 === 0 && date !=1){
            row += "<tr></tr>"
        }
        row += `<td>${date}</td>`
    }

    row += "</tr>"
    html += row

    inputtable.innerHTML = html

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
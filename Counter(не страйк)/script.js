const htl = document.getElementById("html")
const grades = document.getElementById("grades");
const hope = document.getElementById("hope");
const met = document.getElementById("method");
const button = document.getElementById("click")
const output = document.getElementById("output");
const need = document.getElementById("need");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const clear = document.getElementById("clear");
let active = false;

const limits = { 5: 4.66, 4: 3.66, 3: 2.66};

function showMessage(text) {
    modalText.textContent = text;
    modal.showModal();
}

document.getElementById("modal-close").addEventListener("click", () => {
    modal.close();
})

function getList() {
    const list = grades.value.split(" ").filter(x => x !== "").map(Number);
    if(list.length > 10 & active === true) {
        showMessage("В ПИЗДУ ПОШЛА!!!!")
        htl.className = "badboy"
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
        }, true);
    }
    else if(list.length > 10 & active === false) {
        warn.textContent = "У вас не могло быть столько оценок, введите корректное число пожалуйста"
        output.textContent = ""
    }
    else if(list.includes(6) & active === true) {
        showMessage("КАКОГО ХУЯ 6!!!!!")
        htl.className = "badboy"
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
        }, true);
    }
    else if(list.some(g => g < 2 || g > 5 & g < 10) & active === false) {
        warn.textContent = "В России не существует такой оценки, пожалуйста перепроверьте вводимые данные"
        output.textContent = ""
    }
    else if(list.some(g => g < 2 || g > 6 & g < 10 & active === true)) {
        showMessage("ИДИ НАХУЙ ЗАЕБАЛ САЙТ ЕБАТТТТТ!!!!!!!!")
        htl.className = "badboy"
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
        }, true);
    }
    else if(list.some(isNaN) & active === true) {
    showMessage("ЕСЛИ ТЫ БУКВЫ ПОЛУЧЧАЕШЬ ТО ТОЛЬКО ПО Е БАЛЛУ!!!!!!!!!!!")
        htl.className = "badboy"
        document.addEventListener("keydown", (e) => {
            e.preventDefault();
        }, true);
    }
    else if(list.some(isNaN) & active === false) {
        warn.textContent = "Буквы получают в Америке, а вы допустили ошибку, пожалуйста перепроверьте вводимые данные"
        output.textContent = ""
    }
    else if(list.some(g => g >= 10) & active === true){
        warn.textContent = "БЛЯТЬ ПРОБЕЛЫ ЕБАННЫЙ РОТ"
        output.textContent = ""   
    }
    else if(list.some(g => g>= 10) & active === false) {
       warn.textContent = "Введите через пробелы пожалуйста"
        output.textContent = ""
    }
    else return list
}

function getGrade(avg) {
    if(avg >= 4.66) return 5
    else if(avg >= 3.66) return 4
    else if(avg >= 2.66) return 3
    return 2
};

grades.addEventListener("input", () => {
    const list = getList();
    if (list.length === 0) {
        output.textContent = ""
        return
    }
    const sum = list.reduce((a,b) => a + b, 0);
    const avg = sum / list.length;
    if(avg > 5 & active === true) {
        warn.textContent = "БЛЯТЬ ПРОБЕЛЫ ЕБАННЫЙ РОТ"
        output.textContent = ""
    }
    else if(avg > 5 & active === false) {
        warn.textContent = "Введите через пробелы пожалуйста"
        output.textContent = ""
    }
    else { 
        warn.textContent = ""
        output.textContent = "Среднее: " + avg.toFixed(2) + "\nЧетвертная: " + getGrade(avg)
         }    
});


button.addEventListener("click", () => {
    const list = getList();
    const sum = list.reduce((a,b) => a + b, 0);
    const n = list.length;
    
    const wish = Number(hope.value);
    const g = Number(met.value);
    const T = limits[wish];
    
    if (n  === 0 || T === undefined) {
        need.textContent = "Проверьте введеные данные"
        return;
    }
    
    else if (sum / n >= T) {
        need.textContent = "Живи и радуйся жизни все хорошо"
    }
    else if (g <= T) {
        need.textContent = "Ты так не наберешь, меняй подход и получаемые оценки"
    }
    else {
        const k = Math.ceil((T * n - sum) / (g - T));
        need.textContent = "Тебе нужно еще " + k + " штук " + g;
    }
})

clear.addEventListener("click", () => {
    grades.value = "";
    hope.value = "";
    met.value = "";
    
    output.textContent = "Среднее: \n Четвертная: ";
    need.textContent = "";
})
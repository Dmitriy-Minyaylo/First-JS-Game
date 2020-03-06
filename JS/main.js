function start() {
    // создаем стартовую кнопку
    createStartBlock();
    //стартуем в игре при клике
    startButton.onclick = Begin;
};
function Begin() {
    // удаление стартового блока
    deleteStartBlock();
    // Рабочее поле с обратным осчетом
    createField();
    // создаем ball
    createBall();
    // Создаем елемент <div id="stars"> 0 </div>
    createStars();
    // создаем жизни
    createLifes();
    // создаем блок с часами 
    time();
    // запуск таймера 
    timerGame();
};
start();
//==============================================
// функция конца игры 
function GameOver() {
    // удаление жизней
    deleteLifes()
    // удаление очков
    deleteStars();
    // очистка поля Game
    clearGame();
    //создаем последнее окно
    createGameOver();
    again.onclick = restart;

};
//===============================================
// блок сьиграем еще?
function restart() {
    newLifes = 3;
    score = 0;
    actualLife = 0;
    //удаление GameOver Блока
    deleteGameOver();
    // Рабочее поле с обратным осчетом
    createField();
    // создаем ball
    createBall();
    // Создаем елемент <div id="stars"> 0 </div>
    createStars();
    // создаем жизни
    createLifes();
    // создаем блок с часами 
    time();
    // запуск таймера 
    timerGame();
};
//====================================================
// функция таймера игры и условия конца игры
function timerGame() {
    // создаем переменную и ложим внутрь интервал, чтоб потом
    // могли его остановить через clearInterval
    var timer = setInterval(function () {
        seconds.innerText = seconds.innerText - 1;
        // условие, если <5 то красный цвет
        if (seconds.innerText == 5) {
            console.log("Время на пределе! и у Вас только ", score, "очков");
            seconds.style.color = "red";
        }
        // условие, при достижение 30 очков
        if (stars.innerText >= 30) {
            console.log("Вы достигли счета ", score, "очков - Game Over!");
            clearInterval(timer);

            GameOver();
        }
        // условие, если время вышло, стоп игра!
        if (seconds.innerText == 0) {
            console.log("Ваши 20 секунд вышли и Вы достигли счета ", score, "очков - Game Over!");
            clearInterval(timer);
            GameOver();
        }
        // при отсутствии жизни
        if (newLifes == 0) {
            clearInterval(timer);
            GameOver();
        }

    }, 1000);
};
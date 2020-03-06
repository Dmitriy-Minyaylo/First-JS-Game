//==========================================================      
// создаем стартовую кнопку
function createStartBlock() {
    //пишим без var. потому что var есть в var.js со значением null 
    startBlock = document.createElement("div");
    // присвоение id
    startBlock.id = "startBlock";
    // создаем в родительском блоке <div id="field">
    game.appendChild(startBlock);
    //===============================================
    //создаем класс <div class="container"> в startBlock
    var container = document.createElement("div");
    // присвоение class
    container.id = "container";
    //ребенок в родительском блоке
    startBlock.appendChild(container);
    //================================================
    // создаем кнопку в контейнере
    startButton = document.createElement("button");
    // присваиваем id и class
    startButton.id = "startButton";
    // родитель id container внутрь id button
    container.appendChild(startButton);
    //================================================
    // создаем иконку
    var icon = document.createElement("i");
    // класс 
    icon.className = "fab fa-xbox";
    // вложение в родительский блок
    startButton.appendChild(icon);
    //================================================
    // создаем текст в иконке
    var textStart = document.createElement("div");
    // класс 
    textStart.className = "text";
    // задаем значение текста
    textStart.innerText = "START";
    // вложение в родительский блок
    startButton.appendChild(textStart);
    //---------------------------------------------
    // создаем текст в иконке
    var textPlay = document.createElement("div");
    // класс 
    textPlay.className = "play_text";
    // задаем значение текста
    textPlay.innerText = "PLAY!";
    // вложение в родительский блок
    startButton.appendChild(textPlay);
};
//====================================================
/* <div id="field"> 
        <div id="time">20</div>
    </div>  */
//====================================================
// Рабочее поле с обратным осчетом
function createField() {
    field = document.createElement("div");
    // назначаем класс
    field.id = "field";
    // вкладываем класс в родителя
    game.appendChild(field);
};
//-------------------------------------------------
function time() {
    //создаем вложение со временем
    seconds = document.createElement("div");
    // присвоенние класса
    seconds.id = "time";
    //текст
    seconds.innerText = "20";
    // вложение в родительский блок
    field.appendChild(seconds);
};
//======================================================
// Создаем елемент <div id="ball"></div> 
function createBall() {
    // создаем блок Div
    var ball = document.createElement("div");
    // присваиваем id  шарику div >>> id="ball" 
    ball.className = "ball";
    // присвоение наведения к функции
    ball.onmousemove = function clickBall() {
        if (ball.className != "WaitDell") {
            // прозрачность шарика перед удалением
            ball.style.opacity = 0.1;
            // функция удаления с задержкой в 1 сек
            setTimeout(function () {
                //удалили шарик
                ball.remove();
                // пока есть шары, новые не появятся
                var realBall = document.querySelector(".ball");
                if (realBall == null) {
                    // создаем рандом шаров
                    var any = 0;
                    var newBall = random(3);
                    while (any <= newBall) {
                        createBall();
                        any = any + 1;
                    };
                };
                //увеличиваем счет при кликах
                score = score + 1 + random(2);
                //текст stars равен значению score
                stars.innerText = score;
            }, 200);
        };
        ball.className = "WaitDell";
    };
    // создаем в родительском блоке <div id="field">  ребенка, т.е. шарик
    field.appendChild(ball);
    // сторона вылета шарика
    var way = random(2); // 1 - left; 2 - right;
    if (way == 1) {
        ball.className = "ball left";
    } else {
        ball.className = "ball right";
    };
    setTimeout(function () {
        // вылет мячика из координат, что в css через 200мсек
        ball.style.top = random(440) + "px";
        ball.style.left = random(740) + "px";
    }, 200);
    // падение шарика
    setTimeout(function () {
        // стиль css с задержкой
        ball.style.transition = "all 0s";
        // таймер, который каждые 10 мсек опускает шарик вниз
        var downBall = setInterval(function () {
            // шарик вниз
            ball.style.top = ball.offsetTop + 1 + "px";
            // если шарик вышел за пределы
            if (ball.offsetTop > 500) {
                // удалили шар, потому что ниже игрового поля
                ball.remove();
                // создали новый
                createBall();
                actualLife = 0;
                // упал шарик .. минус 1 жизнь
                newLifes = newLifes - 1;
                // удалили жизнь
                deleteLifes();
                // создаем жизни
                createLifes();
                // останавливаем таймер
                clearInterval(downBall);
            }
        }, 10);
    }, 1000);
};
//======================================================
// Создаем елемент <div id="stars"> 0 </div>
function createStars() {
    // создаем блок Div
    stars = document.createElement("div");
    // присваиваем id  жизням <div id="stars">
    stars.id = "stars";
    // 0 выводим в созданый блок stars
    stars.innerHtml = 0;
    //текст stars равен значению i
    stars.innerText = score;
    // создаем в родительском блоке <div id="field">  ребенка, т.е. шарик
    field.appendChild(stars);
};
//====================================================
// Создаем в div lifes вложения span
function createLifes() {
    // создаем блок Div с классом lifes
    lifes = document.createElement("div");
    // присваиваем id  жизням <div id="lifes">
    lifes.id = "lifes";
    // создаем блок жизней
    while (actualLife < newLifes) {
        var span = document.createElement("span");
        span.className = "span";
        lifes.appendChild(span);
        actualLife = actualLife + 1;
    };
    // создаем в родительском блоке <div id="lifes">  ребенка, т.е. сердце
    field.appendChild(lifes);
};
//========================================================
// создание функции случайного числа
function random(max) {
    // переменная со случайным числом
    var rand = Math.random() * (max + 1);
    // округление случайного числа
    rand = Math.floor(rand);
    // возврат функции
    return rand;
};
//===================================================
/* <div id="GameOver"> 
        <h3>Вы набрали: 100 очков </h3>
            <button id="again"> Еще? </button>
    </div>  */
//====================================================
// создание конца игры
function createGameOver() {
    // блок конца игры
    var GameOver = document.createElement("div");
    // назначаем класс
    GameOver.id = "GameOver";
    // вкладываем класс в родителя
    game.appendChild(GameOver);
    //-------------------------------
    //тескт 
    var h3 = document.createElement("h3");
    h3.innerText = "Вы набрали: " + score + " очков";
    GameOver.appendChild(h3);
    //----------------------------------
    var again = document.createElement("button");
    again.id = "again";
    again.innerText = "Еще?";
    GameOver.appendChild(again);
};
//===================================================
// удаление стартового блока
function deleteStartBlock() {
    // выбираем стартовый блок
    StartBlock = document.querySelector("#startBlock");
    // удаление шариков
    StartBlock.remove();
};
//=====================================================
// удаление жизней
function deleteLifes() {
    // удаление жизни
    lifes.remove();
};
//==================================================
// удаление очков
function deleteStars() {
    // удаление 
    stars.remove();
};
// ==============================================
// очистка поля Game
function clearGame() {
    game.innerText = "";
};
// удаление последнего блока
function deleteGameOver() {
    // выбираем стартовый блок
    var GameOver = document.querySelector("#GameOver");
    // удаление шариков
    GameOver.remove();
};






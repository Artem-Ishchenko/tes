/* Данный обработчик убирает слайдер, когда расширение экрана становится 
больше заданного, а также возвращает его при уменьшении*/
window.addEventListener('DOMContentLoaded', () => {

  const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {

    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function(className, settings) {
      swiper = new Swiper(className, settings);
    }

    //Функция ниже удаляет свайпер при определенном разрешении
    const checker = function() {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        changFlex(point); // Эта функция объявлена ниже, и она нужна здесь для корректной работы свайпера (обновляет данные. Без нее при переходе от 320px до 768 (впервые) отобразиться весь список)
        return;
      }
    };

    breakpoint.addEventListener('change', checker);
    checker();
  }
  // Ниже задаю параметры в обработчки
    resizableSwiper(
      '(max-width: 767px)', //breakpoint
      '.block-repair-slider', //swipperClass
      {                       //swiperSetting
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 'auto',   
        dynamicMainBullets: 10,    
      }
    );
  });
// Ниже работа с кнопкой "Показать еще"
let btnCardAll = document.querySelector('.block-repair__button-next'); //Сама кнопка
let listSlidesAll = document.querySelectorAll('.block-repair-slider__slide'); //Список слайдов
let point = listSlidesAll.length;//Переменная которая изначальна равна списку слайдов
let activeText = document.querySelectorAll('.block-repair__text'); // Текст в кнопке Показать/скрыть
let decoratedButton = document.querySelector('.block-repair__arrow'); //Декоративный элемент в кнопке

// Функция которая будет применяться потом
let changFlex = function (point) {
  for(let i = 0; i < listSlidesAll.length; i++) { //Каждому элементу дает отображение слайда
    listSlidesAll[i].style.display = 'flex'; 
  }
//данное if помогает не выполнять перебор элементов(о point потом)
  if (point !== listSlidesAll.length){ 
//ниже - для Элементов которые не должны отображаться задается стиль 'none'.
    for(let i = 0; (point + i) < listSlidesAll.length; i++) { 
      listSlidesAll[point + i].style.display = 'none';        
      if (btnCardAll.classList.contains('activeAll')) {  //Если же прожата кнопка, то отображаем
        listSlidesAll[point + i].style.display = 'flex';
      }
    }
}
};
//Это функция которая задает значение point - то, сколько элементов должно бать на странице.
let widthWindow = function() {
  if ((window.innerWidth >= 768) && (window.innerWidth < 1120)) { //при разрешении ОТ 768 до 1120
    point = 6; //Поинту даем аргумент, при котором changeFlex выполнится частично
    changFlex(point); //ChangeFlex отобразит 6 карточек а остальные скроет 
  }
  else if ((window.innerWidth >= 1120) && (window.innerWidth < 1664)) {
    point = 8; //Здесь говорим покажи 8 карточек
    changFlex(point); //скрой остальные
  }
  else {
    point = listSlidesAll.length; //это условие при котором все карточки видны
    changFlex(point);//ChangeFlex даст всем картачккам display: flex - то есть на 320 и более 1664 отобразяться все карточки
  }
  return point;
}

//Обработчки кнопки
btnCardAll.addEventListener('click', function () {
  if (btnCardAll.classList.contains('activeAll')) {
    btnCardAll.classList.remove('activeAll');
    changFlex(point); //для корректной работы пересчитываем отображение еще раз
  }
  else {
    btnCardAll.classList.add('activeAll');
    changFlex(point);
  }

// Здесь просто скрываем один span и отображаем другой
  for (let item of activeText) {
    if (item.classList.contains('disable')) {
      item.classList.remove('disable');
      decoratedButton.style.transform = 'rotateX(180deg)'; // а также меняем направление стрелок
    }
    else {
      item.classList.add('disable');
      decoratedButton.style.transform = 'rotateX(0deg)';
    }
  }
})

widthWindow(); //Сразу вызываем функцию при запуске сайта, для корректной работы
window.addEventListener('resize', () => widthWindow(), true); //затем делаем обработчик на изменение ширины














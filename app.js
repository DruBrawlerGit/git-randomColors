const colums = document.querySelectorAll('.colums')

//Отслеживает нажатий клавиатуры
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    //Если нажали проблел то сбросить цвета
    setRandomsColors() //вызываем функцию замены цвета
  }
  // console.log(event.code)
})

//Переключение замка
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type //Свойство опускаем в нижний регистр (тк оно всегда в верхнем)
  if (type === 'lock') {
    //Если кликнули по значку замка
    const node =
      event.target.tagName.toLowerCase() === 'i' //Если кликнули по символу замка то
        ? event.target //
        : event.target.children[0] //а если по фону замка то,то получаем первого ребенка из массива (сам символ значка)

    node.classList.toggle('fa-lock-open') //переключить замок (смену класса)
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent) //Если нажали на
  }
})

//Функция генерации случайного цвета (отключено)
function generateRndColor() {
  const hexCodes = '0123456789ABCDEF'

  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    // Math.floor(Округляет до целого) Math.random (получаем случайное число от 0 до 1 например 0,33311 и  умножаем его до максимального значения)
    // Получаем hexCodes[5]. Т.е.  Math.random генерирует число 0.333111 * на длинну массива 16 получаем число 5.32 и округляем его до 5 и берем на каждой
    //итерации по этой схеме 6 случайных значений
  }
  return '#' + color
}

function copyToClickboard(lable) {
  return navigator.clipboard.writeText(lable)
}

function setRandomsColors(isInitial) {
  const colors = isInitial ? getColorsfromHash() : []

  colums.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock') //Проверка класса заблокирован или нет
    const lable = col.querySelector('h2') // выбираем заголовок
    const button = col.querySelector('button') // выбираем кнопку

    if (isLocked) {
      //Если заблокирован то не менять
      colors.push(lable.textContent)
      return
    }

    //const color = generateRndColor() //генерируем цвет
    const color = isInitial
      ? colors[index]
        ? colors[index] //Проверка пустого массива
        : chroma.random() //то
      : chroma.random() //генерируем цвет с помощью доп библиотеки

    if (!isInitial) {
      colors.push(color)
    }

    lable.textContent = color //вписываем в лейб
    col.style.background = color //делаем цвет фона
    setTextColor(lable, color) // переопределяем цвет кнопки и текста согласно фону
    setTextColor(button, color) //
  })

  updateColorsHash(colors)
}

//функция определения яркости фона и выбора цвета текста для его комфортного отоборажения
function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'while'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1)
    })
    .join('-')
}

function getColorsfromHash() {
  if (document.location.hash.length > 1) {
    document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
  return []
}

setRandomsColors(true) //вызываем функцию замены цвета

console.log('test')

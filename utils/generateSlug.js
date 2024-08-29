// utils/generateSlug.js Функция для генерации slug из заголовка

const cyrillicToLatinMap = {
  '\u0430': 'a',
  '\u0431': 'b',
  '\u0432': 'v',
  '\u0433': 'g',
  '\u0434': 'd',
  '\u0435': 'e',
  '\u0451': 'e',
  '\u0436': 'zh',
  '\u0437': 'z',
  '\u0438': 'i',
  '\u0439': 'y',
  '\u043a': 'k',
  '\u043b': 'l',
  '\u043c': 'm',
  '\u043d': 'n',
  '\u043e': 'o',
  '\u043f': 'p',
  '\u0440': 'r',
  '\u0441': 's',
  '\u0442': 't',
  '\u0443': 'u',
  '\u0444': 'f',
  '\u0445': 'kh',
  '\u0446': 'ts',
  '\u0447': 'ch',
  '\u0448': 'sh',
  '\u0449': 'shch',
  '\u044b': 'y',
  '\u044d': 'e',
  '\u044e': 'yu',
  '\u044f': 'ya',
  ' ': '-',
  '-': '-',
  _: '-',
  '\u044c': '',
  '\u044a': '',
}

export const generateSlug = title => {
  return title
    .toLowerCase()
    .split('')
    .map(char => cyrillicToLatinMap[char] || char) // Транслитерация кириллических символов
    .join('')
    .replace(/[^a-z0-9\s-]/g, '') // Удалить все символы, кроме букв, цифр, пробелов и дефисов
    .trim() // Убрать пробелы в начале и конце строки
    .replace(/\s+/g, '-') // Заменить пробелы на дефисы
    .replace(/-+/g, '-') // Убрать повторяющиеся дефисы
}

// Функция для добавления или обновления slug в каждом продукте массива
export const addSlugToProducts = products => {
  return products.map(product => ({
    ...product, // сохранить все существующие поля объекта
    slug: generateSlug(product.title), // Добавить или обновляем поле `slug`
  }))
}

// utils/generateSlug.js Функция для генерации slug из заголовка
export const generateSlug = (title) => {
  return title
    .toLowerCase() // Преобразуем в нижний регистр
    .replace(/[^a-z0-9\s-]/g, '') // Удалить все символы, кроме букв, цифр, пробелов и дефисов
    .trim() // Убрать пробелы в начале и конце строки
    .replace(/\s+/g, '-') // заменить пробелы на дефисы
    .replace(/-+/g, '-'); // убрать повторяющиеся дефисы
};

// Функция для добавления или обновления slug в каждом продукте массива
export const addSlugToProducts = (products) => {
  return products.map(product => ({
    ...product, // сохранить все существующие поля объекта
    slug: generateSlug(product.title), // Добавить или обновляем поле `slug`
  }));
};

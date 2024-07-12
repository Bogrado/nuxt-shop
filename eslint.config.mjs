// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default withNuxt([
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false, // Отключить использование точек с запятой в конце строк
          singleQuote: true, // Использовать одинарные кавычки для строк
          trailingComma: 'es5', // Добавлять запятые в конце последнего элемента в объектах и массивах (ES5 синтаксис)
          arrowParens: 'avoid', // Убирать скобки вокруг параметра стрелочной функции, если параметр один
        },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Предупреждать о console в production
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Предупреждать о debugger в production,
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // Всегда использовать самозакрывающиеся теги для void элементов
            normal: 'always', // Всегда использовать самозакрывающиеся теги для нормальных элементов
            component: 'always', // Всегда использовать самозакрывающиеся теги для компонентов
          },
          svg: 'always', // Всегда использовать самозакрывающиеся теги для SVG
          math: 'always', // Всегда использовать самозакрывающиеся теги для MathML
        },
      ],
    },
  },
])

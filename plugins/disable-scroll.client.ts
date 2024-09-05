export default defineNuxtPlugin(() => {
  const disableScroll = () => {
    document.documentElement.style.overflow = 'hidden' // для <html>
    document.body.style.overflow = 'hidden' // для <body>

    // Блокировка прокрутки для колесика мыши и тачпада
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
  }

  const enableScroll = () => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.removeEventListener('wheel', preventScroll)
    window.removeEventListener('touchmove', preventScroll)
  }

  const preventScroll = (event: { preventDefault: () => void }) => {
    event.preventDefault() // Предотвращает прокрутку страницы
  }

  return {
    provide: {
      disableScroll,
      enableScroll,
    },
  }
})

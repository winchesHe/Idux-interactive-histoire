let vueuseColorScheme = useLocalStorage('vueuse-color-scheme', 'auto')
export const isDark = useDark({ valueDark: '' })
const setDarkMode = () => {
  setTimeout(() => {
    const classList = Array.from(document.documentElement.classList)
    const vueuseColorScheme = useLocalStorage('vueuse-color-scheme', 'auto')
    let colorMode
    if (vueuseColorScheme.value === 'auto')
      colorMode = 'dark'
    else if (vueuseColorScheme.value === 'dark')
      colorMode = 'dark'
    else
      colorMode = ''

    if (classList.length && !classList.includes(colorMode)) {
      const classNames = colorMode === 'dark' ? 'htw-dark no-touch dark' : 'no-touch'
      document.documentElement.setAttribute('class', classNames)
    }
  }, 0)
}
setDarkMode()

useMutationObserver(document.documentElement, (mutations) => {
  mutations.forEach((mutation) => {
    if (vueuseColorScheme.value !== useLocalStorage('vueuse-color-scheme', 'auto').value) {
      vueuseColorScheme = useLocalStorage('vueuse-color-scheme', 'auto')
      if (mutation.attributeName === 'class')
        setDarkMode()
    }
  })
}, {
  attributes: true,
})

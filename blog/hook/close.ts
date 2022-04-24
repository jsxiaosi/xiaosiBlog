export const useDemoLeftBox = () => {
  const leftDemo = ref<HTMLElement[]>([])
  onMounted(() => {
    leftDemo.value = document.getElementsByClassName('left-box') as unknown as HTMLElement[]
  })
  const closeLeftBox = () => {
    leftDemo.value[0].style.transform = 'translateX(-288px)'
  }
  const showLeftBox = () => {
    leftDemo.value[0].style.transform = 'translateX(0px)'
  }
  return { showLeftBox, closeLeftBox }
}

import Icon from '../assets/icons/index.svg'
export default function useIcons() {
  fetch(Icon).then(val => {
    return val.text()
  }).then(res => {
    const dom = document.createElement('div')
    dom.innerHTML = res
    const svg = dom.querySelector('svg')
    if (!svg) return
    svg.setAttribute("aria-hidden", "true")
    svg.style.position = "absolute"
    svg.style.width = '0'
    svg.style.height = '0'
    svg.style.overflow = "hidden"
    document.body.appendChild(svg)
  })
}
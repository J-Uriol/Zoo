const scene = document.querySelector('.scene')

const SETS = {
  ori: 32,
  nes: 22,
  maks: 29,
  faro: 29,
  uriol: 31,
  ezq: 35
}

const HIDDEN = 'polygon(50% 50%,50% 50%,50% 50%)'
const MAX = Math.max(...Object.values(SETS))
let currentSet = null

/* Crear triángulos */
const tris = Array.from({ length: MAX }, (_, i) => {
  const t = document.createElement('div')
  t.className = 'tri'
  t.dataset.i = i + 1
  scene.appendChild(t)
  return t
})

/* Aplicar set */
function applySet(name) {
  if (name === currentSet) return
  currentSet = name
  const count = SETS[name]

  for (const tri of tris) {
    const i = tri.dataset.i
    const num = String(i).padStart(2, '0')

    if (i <= count) {
      tri.style.opacity = 1
      tri.style.background = `var(--tri${num}-${name}-bg)`
      tri.style.clipPath = `var(--tri${num}-${name}-polygon)`
    } else {
      tri.style.opacity = 0
      tri.style.background = 'transparent'
      tri.style.clipPath = HIDDEN
    }
  }
}

/* Scroll */
function onScroll() {
  const p = scrollY / (document.body.scrollHeight - innerHeight)
  const keys = Object.keys(SETS)
  const segment = 1 / keys.length
  const index = Math.min(Math.floor(p / segment), keys.length - 1)
  applySet(keys[index])
}

addEventListener('scroll', onScroll, { passive: true })

/* Init */
applySet(Object.keys(SETS)[0])
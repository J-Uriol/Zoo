const scene = document.querySelector('.scene')
const buttons = document.querySelector('.buttons')
const displayName = document.querySelector('.name')

const SETS = {
  ori: [32, 'Abel Oriach - Slowloris', '#e7e73fff'],
  nes: [22, 'Nestor Aísa - Zorro Ártico', '#fff'],
  maks: [29, 'Maksym Hrynenko - Murciélago', '#fff'],
  faro: [29, 'Alberto Faro - Koala', '#fff'],
  uriol: [31, 'Javier Uriol - Pingüino', '#fff'],
  ezq: [35, 'Adrian Ezquerra - Toucannon', '#a4e5a4ff']
}

const C = 0, N = 1, B = 2;

const HIDDEN = 'polygon(50% 50%,50% 50%,50% 50%)'
const keys = Object.keys(SETS)

// Encontrar el máximo número de triángulos entre todos los sets
const MAX = Math.max(...Object.values(SETS).map(set => set[C]))
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
  const set = SETS[name]

  const count = set[C]
  displayName.innerText = set[N]
  document.body.style.backgroundColor = set[B]

  tris.forEach(tri => {
    const i = +tri.dataset.i
    if (i <= count) {
      const num = String(i).padStart(2, '0')
      tri.style.opacity = '1'
      tri.style.background = `var(--tri${num}-${name}-bg)` // puedes mantener esta lógica si tienes variables CSS
      tri.style.clipPath = `var(--tri${num}-${name}-polygon)` // idem
    } else {
      tri.style.opacity = '0'
      tri.style.background = 'transparent'
      tri.style.clipPath = HIDDEN
    }
  })
}

/* Scroll */
function onScroll() {
  const p = scrollY / (document.body.scrollHeight - innerHeight)
  const index = Math.min(Math.floor(p * keys.length), keys.length - 1)
  applySet(keys[index])
}

addEventListener('scroll', onScroll, { passive: true })

/* Botones */
function scrollToIndex(index) {
  const segmentHeight = (document.body.scrollHeight - innerHeight) / keys.length
  window.scrollTo({ top: index * segmentHeight, behavior: 'smooth' })
}

buttons.addEventListener('click', e => {
  const segmentHeight = (document.body.scrollHeight - innerHeight) / keys.length
  const currentIndex = Math.min(Math.floor(scrollY / segmentHeight), keys.length - 1)

  if (e.target.id === 'next') scrollToIndex(Math.min(currentIndex + 1, keys.length - 1))
  if (e.target.id === 'previous') scrollToIndex(Math.max(currentIndex - 1, 0))
})

/* Init */
applySet(keys[0])

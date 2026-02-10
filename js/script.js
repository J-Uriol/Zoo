const scene = document.querySelector('.scene')
const buttons = document.querySelector('.buttons')
const displayName = document.querySelector('.name')
const signature = document.querySelector('.signature')

const SETS = {
  logo: [37, 'IES José Mor de Fuentes', '#ddd'],
  ori: [32, 'Abel Oriach - Slowloris', '#d3cb9cff'],
  nes: [22, 'Nestor Aísa - Zorro Ártico', ' #a0d9deff'],
  maks: [29, 'Maksym Hrynenko - Murciélago', '#ddd9ffff'],
  faro: [29, 'Alberto Faro - Koala', '#9ecd94ff'],
  uriol: [31, 'Javier Uriol - Pingüino', '#f2fbffff'],
  ezq: [35, 'Adrian Ezquerra - Tucán', '#76a877ff'],
  jimenez: [35, 'Adrián Jiménez - Cocodrilo', '#eff0acff'],
  karla: [35, 'Karla - Llamicornio', '#f1daf3ff'],
  fofana: [40, 'Founeke Fofana - Camaleón', '#aba']
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
  if (index > 0) signature.style.opacity = 0
  else signature.style.opacity = 0.9
}

addEventListener('scroll', onScroll, { passive: true })

/* Init */
applySet(keys[0])
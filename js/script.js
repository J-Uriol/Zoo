const scene = document.querySelector('.scene')
const buttons = document.querySelector('.buttons')
const displayName = document.querySelector('.name')
const signature = document.querySelector('.signature')

const SETS = {
  daw: [11, '', '100, 200, 250'],
  logo: [37, 'IES José Mor de Fuentes', '125,219,228'],
  ori: [32, 'Abel Oriach - Slowloris', '104,95,184'],
  nes: [22, 'Nestor Aísa - Zorro Ártico', '124,189,109'],
  maks: [29, 'Maksym Hrynenko - Murciélago', '229,112,240'],
  faro: [29, 'Alberto Faro - Koala', '214,204,144'],
  uriol: [31, 'Javier Uriol - Pingüino', '224,219,168'],
  ezq: [35, 'Adrian Ezquerra - Tucán', '125,219,228'],
  jimenez: [35, 'Adrián Jiménez - Cocodrilo', '240,241,124'],
  karla: [35, 'Karla - Llamicornio', '104,95,184'],
  fofana: [40, 'Founeke Fofana - Camaleón', '141,221,255']
}

const C = 0, N = 1, B = 2

const HIDDEN = 'polygon(50% 50%,50% 50%,50% 50%)'
const keys = Object.keys(SETS)
const MAX = Math.max(...Object.values(SETS).map(s => s[C]))

let currentSet = null

/* Crear triángulos */
const tris = Array.from({ length: MAX }, (_, i) => {
  const t = document.createElement('div')
  t.className = 'tri'
  t.dataset.i = i + 1
  scene.appendChild(t)
  return t
})

/* Animar fondo */
function animateGradient(from, to, steps = 30) {
  const fromArr = from.split(',').map(Number)
  const toArr = to.split(',').map(Number)
  let stepCount = 0

  function step() {
    const t = stepCount / steps
    const color = fromArr.map((v, i) =>
      Math.round(v + (toArr[i] - v) * t)
    )
    document.body.style.background =
      `radial-gradient(at center, rgba(196,196,196,0.5), rgb(${color.join(',')}))`

    stepCount++
    if (stepCount <= steps) requestAnimationFrame(step)
  }

  step()
}

/* Aplicar set */
function applySet(name) {
  if (name === currentSet) return
  const previousColor = currentSet ? SETS[currentSet][B] : '224,219,168'
  currentSet = name
  const set = SETS[name]

  const count = set[C]
  displayName.innerText = set[N]

  animateGradient(previousColor, set[B], 60)

  tris.forEach(tri => {
    const i = +tri.dataset.i
    if (i <= count) {
      const num = String(i).padStart(2, '0')
      tri.style.transitionDelay = `${i * 0.02}s`
      tri.style.opacity = '1'
      tri.style.background = `var(--tri${num}-${name}-bg)`
      tri.style.clipPath = `var(--tri${num}-${name}-polygon)`
    } else {
      tri.style.opacity = '0'
      tri.style.background = 'transparent'
      tri.style.clipPath = HIDDEN
    }
  })
}

/* ---------------------
   Auto-scroll simple
---------------------- */
let autoIndex = 0

function goToNextSet() {
  autoIndex = (autoIndex + 1) % keys.length
  window.scrollTo({
    top: innerHeight * autoIndex,
    behavior: 'smooth'
  })
}

setInterval(goToNextSet, 3000)

/* Scroll manual */
function onScroll() {
  const index = Math.min(Math.floor(scrollY / innerHeight), keys.length - 1)
  autoIndex = index
  applySet(keys[index])
  signature.style.opacity = index === 1 ? 0.9 : 0
}

addEventListener('scroll', onScroll, { passive: true })

/* Init */
applySet(keys[0])
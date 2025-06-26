// Navegação Mobile
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animação de contadores
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Animação das barras de habilidades
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width + "%"
    }, 500)
  })
}

// Intersection Observer para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animar contadores quando a seção sobre aparecer
      if (entry.target.id === "sobre") {
        animateCounters()
      }

      // Animar barras de habilidades quando a seção aparecer
      if (entry.target.id === "habilidades") {
        animateSkillBars()
      }
    }
  })
}, observerOptions)

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar classes de animação
  const fadeElements = document.querySelectorAll(
    ".section-header, .text-card, .skill-card, .project-card, .contact-form",
  )
  fadeElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Observar seções específicas
  const sections = document.querySelectorAll("#sobre, #habilidades")
  sections.forEach((section) => {
    observer.observe(section)
  })
})

// Formulário de contato
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Simular envio
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML

  submitBtn.innerHTML = "<span>ENVIANDO...</span>"
  submitBtn.disabled = true

  setTimeout(() => {
    submitBtn.innerHTML = "<span>MENSAGEM ENVIADA!</span>"
    submitBtn.style.background = "#16a34a"

    setTimeout(() => {
      submitBtn.innerHTML = originalText
      submitBtn.style.background = ""
      submitBtn.disabled = false
      contactForm.reset()

      // Mostrar alerta
      alert("Mensagem enviada com sucesso! Em breve entrarei em contato.")
    }, 2000)
  }, 1500)
})

// Efeito de partículas no fundo
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = Math.random() * 3 + 1 + "px"
    particle.style.height = particle.style.width
    particle.style.background = "rgba(220, 38, 38, 0.3)"
    particle.style.borderRadius = "50%"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`
    particle.style.animationDelay = Math.random() * 10 + "s"

    particlesContainer.appendChild(particle)
  }
}

// CSS para animação das partículas
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Inicializar partículas
document.addEventListener("DOMContentLoaded", createParticles)

// Efeito de typing no hero
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Inicializar efeito de typing
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    setTimeout(() => {
      typeWriter(typingElement, "DESENVOLVEDOR FRONTEND", 150)
    }, 1000)
  }
})

// Adicionar efeito de hover nos cards de projeto
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Efeito parallax simples
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Adicionar classe active ao link da navegação baseado na seção atual
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

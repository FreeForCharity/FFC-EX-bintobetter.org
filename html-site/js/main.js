/**
 * BinToBetter - Main JavaScript
 * Pure vanilla JavaScript for interactive functionality
 */

// ===========================
// Utility
// ===========================

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// ===========================
// Header / Navigation
// ===========================

function initHeader() {
  const header = document.getElementById('header')
  if (!header) return

  const mobileMenuToggle = document.getElementById('mobileMenuToggle')
  const mobileMenu = document.getElementById('mobileMenu')
  const mobileMenuClose = document.getElementById('mobileMenuClose')
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link')

  function closeMobileMenu() {
    if (!mobileMenu) return
    mobileMenu.classList.remove('active')
    document.body.style.overflow = ''
  }

  const handleScroll = debounce(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
    updateActiveNavLink()
  }, 50)

  window.addEventListener('scroll', handleScroll)

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active')
      document.body.style.overflow = 'hidden'
    })
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu)
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu)
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu)
  })

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/#')) return

      const targetId = href.substring(2)
      const targetSection = document.getElementById(targetId)
      if (!targetSection) return

      e.preventDefault()
      const headerHeight = header.offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    })
  })

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]')
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `/#${sectionId}`) {
            link.classList.add('active')
          }
        })
      }
    })
  }

  updateActiveNavLink()
}

// ===========================
// Testimonials Carousel
// ===========================

function initTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card')
  const prevBtn = document.querySelector('.testimonial-prev')
  const nextBtn = document.querySelector('.testimonial-next')
  const dots = document.querySelectorAll('.testimonial-dot')

  if (!testimonialCards.length) return

  let currentIndex = 0
  const totalTestimonials = testimonialCards.length
  let autoAdvanceTimer

  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove('active'))
    dots.forEach((dot) => dot.classList.remove('active'))

    testimonialCards[index].classList.add('active')
    if (dots[index]) dots[index].classList.add('active')

    if (prevBtn) prevBtn.disabled = index === 0
    if (nextBtn) nextBtn.disabled = index === totalTestimonials - 1

    currentIndex = index
  }

  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % totalTestimonials
    showTestimonial(nextIndex)
    resetAutoAdvance()
  }

  function prevTestimonial() {
    const prevIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials
    showTestimonial(prevIndex)
    resetAutoAdvance()
  }

  function goToTestimonial(index) {
    showTestimonial(index)
    resetAutoAdvance()
  }

  function startAutoAdvance() {
    autoAdvanceTimer = setInterval(() => {
      nextTestimonial()
    }, 5000)
  }

  function stopAutoAdvance() {
    if (autoAdvanceTimer) clearInterval(autoAdvanceTimer)
  }

  function resetAutoAdvance() {
    stopAutoAdvance()
    startAutoAdvance()
  }

  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial)
  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial)

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToTestimonial(index))
  })

  const testimonialsWrapper = document.querySelector('.testimonials-wrapper')
  if (testimonialsWrapper) {
    testimonialsWrapper.addEventListener('mouseenter', stopAutoAdvance)
    testimonialsWrapper.addEventListener('mouseleave', startAutoAdvance)
  }

  document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.testimonials-section:hover')) return
    if (e.key === 'ArrowLeft') prevTestimonial()
    if (e.key === 'ArrowRight') nextTestimonial()
  })

  showTestimonial(0)
  startAutoAdvance()
}

// ===========================
// Contact Form (mailto)
// ===========================

function initContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    const subjectParts = ['BinToBetter website inquiry']
    if (name) subjectParts.push(`from ${name}`)
    const subject = subjectParts.join(' ')

    const bodyLines = []
    if (name) bodyLines.push(`Name: ${name}`)
    if (email) bodyLines.push(`Email: ${email}`)
    if (bodyLines.length) bodyLines.push('')
    bodyLines.push(message || '(no message provided)')

    const mailto = `mailto:outreach@bintobetter.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join('\n'),
    )}`

    window.location.href = mailto
  })
}

// ===========================
// Footer Year
// ===========================

function updateFooterYear() {
  const yearElement = document.getElementById('currentYear')
  if (yearElement) yearElement.textContent = new Date().getFullYear()
}

// ===========================
// Init
// ===========================

function initApp() {
  initHeader()
  initTestimonials()
  initContactForm()
  updateFooterYear()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

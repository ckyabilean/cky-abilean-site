/**
 * Terminal text scramble effect
 */
class TerminalScramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    this.originalText = el.innerText;
    this.scrambledText = '';
    this.isScrambling = false;
  }

  setText(newText) {
    this.originalText = newText;
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  scramble(duration = 1500) {
    if (this.isScrambling) return;
    this.isScrambling = true;
    
    // Start with random characters
    this.scrambledText = Array(this.originalText.length)
      .fill('')
      .map(this.randomChar.bind(this))
      .join('');
    
    this.el.innerText = this.scrambledText;
    
    // Gradually unscramble
    const iterations = 15;
    const interval = duration / iterations;
    let count = 0;
    
    const unscramble = () => {
      if (count >= iterations) {
        this.el.innerText = this.originalText;
        this.isScrambling = false;
        return;
      }
      
      this.scrambledText = this.scrambledText
        .split('')
        .map((char, i) => {
          const shouldReveal = Math.random() < (count / iterations);
          return shouldReveal ? this.originalText[i] : this.randomChar();
        })
        .join('');
      
      this.el.innerText = this.scrambledText;
      count++;
      
      setTimeout(unscramble, interval);
    };
    
    unscramble();
  }
}

/**
 * Initialize terminal effects when scrolling
 */
function initTerminalEffects() {
  // Find all elements with the terminal-scramble class
  const scrambleElements = document.querySelectorAll('.terminal-scramble');
  const scrambleInstances = [];
  
  // Create scramble instances
  scrambleElements.forEach(el => {
    const instance = new TerminalScramble(el);
    scrambleInstances.push(instance);
    
    // Add a scroll event to trigger the scramble
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          instance.scramble();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(el);
  });
  
  // Handle typewriter elements
  const typewriterElements = document.querySelectorAll('.terminal-typewriter');
  
  typewriterElements.forEach(el => {
    const originalText = el.innerText;
    el.innerText = '';
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let i = 0;
          const speed = parseInt(el.dataset.speed || 50);
          
          function typeWriter() {
            if (i < originalText.length) {
              el.innerText += originalText.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
            } else {
              // Add cursor at the end
              if (el.dataset.cursor === 'true') {
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                el.appendChild(cursor);
              }
            }
          }
          
          typeWriter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(el);
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', initTerminalEffects);

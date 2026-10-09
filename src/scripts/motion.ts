/**
 * Animacoes de scroll. Cada uma tem um motivo:
 * - [data-split]: titulos entram linha a linha (hierarquia: o titulo e lido primeiro).
 * - [data-reveal]: blocos entram suaves quando chegam na tela (sequencia de leitura).
 * - [data-parallax]: fotos andam um pouco mais devagar que o texto (profundidade leve).
 * - [data-strike]: os problemas sao riscados antes da solucao aparecer (narrativa problema -> solucao).
 * Com prefers-reduced-motion nada disso roda e o conteudo aparece estatico.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

function init() {
  const root = document.documentElement;
  if (reduce.matches) {
    root.classList.add('motion-off');
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Lenis integrado ao ticker do GSAP (um unico loop de frames)
  const lenis = new Lenis({ duration: 1.05, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.addEventListener('lenis:stop', () => lenis.stop());
  window.addEventListener('lenis:start', () => lenis.start());

  const ease = 'expo.out';

  // Titulos
  const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    if (!belowFold(el)) return;
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      aria: 'none',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.1,
          ease,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      },
    });
  });

  // Blocos
  const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]').filter(belowFold);
  gsap.set(reveals, { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch(reveals, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease, stagger: 0.08, overwrite: true }),
  });

  // Parallax leve
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax || 8);
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Problemas riscados
  gsap.utils.toArray<HTMLElement>('[data-strike]').forEach((el, i) => {
    gsap.fromTo(
      el,
      { backgroundSize: '0% 0.08em' },
      {
        backgroundSize: '100% 0.08em',
        duration: 0.9,
        ease: 'power3.inOut',
        delay: i * 0.15,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      },
    );
  });

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

init();

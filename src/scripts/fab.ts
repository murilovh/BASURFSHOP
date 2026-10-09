// Botao flutuante do WhatsApp (mobile): aparece depois que o hero sai da tela. Roda tambem sem animacao.
export function floatingButton() {
  const fab = document.querySelector<HTMLElement>('[data-fab]');
  const hero = document.querySelector('#topo');
  if (!fab || !hero) return;
  new IntersectionObserver(([entry]) => fab.classList.toggle('is-visible', !entry.isIntersecting), {
    rootMargin: '0px 0px -40% 0px',
  }).observe(hero);
}

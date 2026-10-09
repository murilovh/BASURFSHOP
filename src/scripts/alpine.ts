import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

Alpine.plugin(collapse);
// expoe para debug no console e para o motion.ts pausar o Lenis com o menu aberto
(window as unknown as { Alpine: typeof Alpine }).Alpine = Alpine;
Alpine.start();

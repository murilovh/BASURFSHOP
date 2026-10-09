/**
 * Dados reais da BA Surfboards. Tudo que estiver marcado com TODO depende de confirmacao com o Beto.
 * Nao inventar precos, numeros, horarios ou depoimentos.
 */
export { SITE_URL } from './site-url.mjs';

export const business = {
  name: 'BA Surfboards',
  altNames: ['BA Surf Shop', 'Beto Alemão Surf Consertos'],
  owner: 'Beto Alemão',
  bio: 'Conserto, acessórios, pranchas novas e usadas, aluguel de pranchas e roupas.',
  phoneDisplay: '(48) 98841-1270',
  phoneE164: '+5548988411270',
  email: 'betohoffmann28@gmail.com',
  instagram: { url: 'https://www.instagram.com/basurfboards_/', handle: '@basurfboards_' },
  facebook: { url: 'https://www.facebook.com/betoalemaosurfconsertos/' },
  address: {
    street: 'Estrada do Vale, Galeria Centrinho',
    district: 'Praia do Rosa',
    city: 'Imbituba',
    state: 'SC',
    postalCode: '88780-000',
    country: 'BR',
  },
  // TODO(horario): horario de funcionamento nao encontrado. Confirmar com o Beto (inclusive alta/baixa temporada).
  hours: null as null | { days: string; time: string }[],
};

export const addressOneLine = `${business.address.street}, ${business.address.district}, ${business.address.city} - ${business.address.state}`;

const mapsQuery = encodeURIComponent(
  `BA Surfboards, ${business.address.street}, ${business.address.district}, ${business.address.city} - ${business.address.state}, ${business.address.postalCode}`,
);
export const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed&hl=pt-BR&z=16`;

const WA_NUMBER = '5548988411270';
const WA_BASE = 'Olá! Vim pelo site da BA Surfboards e queria saber sobre';

/** Link do WhatsApp com mensagem pre-preenchida por assunto. */
export const wa = (assunto = '...') => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`${WA_BASE} ${assunto}`)}`;

export const waLinks = {
  geral: wa('...'),
  conserto: wa('conserto de prancha.'),
  pranchas: wa('pranchas novas e usadas.'),
  shape: wa('uma prancha shapeada pelo Beto.'),
  acessorios: wa('acessórios.'),
  aluguel: wa('aluguel de prancha e roupa. Tem disponibilidade?'),
};

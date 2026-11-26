// Endereco publico do site, usado no sitemap, nas URLs canonicas, no Open Graph e no robots.txt.
// Sem dominio proprio: na Vercel, usa o endereco .vercel.app de producao do projeto
// (variavel VERCEL_PROJECT_PRODUCTION_URL, definida pela Vercel no build).
// TODO(dominio): quando houver dominio proprio, defina SITE_URL nas variaveis do projeto na Vercel.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:4321');

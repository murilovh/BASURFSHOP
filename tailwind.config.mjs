/**
 * Design system BA Surfboards.
 * Carregado pelo Tailwind v4 via `@config` em src/styles/global.css.
 *
 * Regras do sistema (seguir em todas as secoes):
 * - Tema unico escuro (herdado da logo). Uma unica faixa clara deliberada: Servicos, como "etiqueta de prancha".
 * - Um acento so: `rosa`. Em fundo escuro pode ser texto; em fundo claro, so como fundo com texto `ink`.
 * - Formas: botoes sempre `rounded-pill`; blocos/fotos sempre `rounded-board`. Nada de cantos retos misturados.
 * - Assinatura visual: contorno branco duplo da logo (`ring-ba`) em fotos de destaque.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0B0A', // fundo da pagina (preto da logo, sem ser #000)
          900: '#0B0B0A',
          800: '#131312', // superficie elevada
          700: '#1C1C1A', // placeholders, bordas fortes
          600: '#2A2A27',
        },
        bone: {
          DEFAULT: '#EDEDE8', // texto principal / branco da logo, sem ser #fff
          200: '#D9D9D3',
        },
        mute: '#A6A69F', // texto secundario sobre ink (contraste ~8:1)
        stone: '#55554F', // texto secundario sobre bone (contraste ~7:1)
        rosa: {
          DEFAULT: '#FF5C8A', // acento: Praia do Rosa + decal fluor das pranchas
          deep: '#E8457A',
        },
      },
      fontFamily: {
        display: ['"Unbounded Variable"', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // escala tipografica fluida (mobile -> desktop)
        'display-xl': ['clamp(2.5rem, 5.1vw, 4.75rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.125rem, 5.4vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3.6vw, 3rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.25rem, 2.2vw, 1.75rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        lead: ['clamp(1.0625rem, 1.4vw, 1.25rem)', { lineHeight: '1.55' }],
        label: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      spacing: {
        gutter: 'clamp(1rem, 4vw, 3rem)', // margem lateral (16px no mobile)
        section: 'clamp(4rem, 8vw, 7rem)', // respiro vertical entre secoes
        nav: '4.25rem',
      },
      maxWidth: {
        page: '88rem',
        prose: '62ch',
      },
      borderRadius: {
        board: '1.375rem', // blocos e fotos (eco dos cantos do "BA")
        pill: '999px', // botoes
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      zIndex: {
        grain: '60',
        nav: '50',
        float: '40',
      },
    },
  },
};

/**
 * Galeria (substitui depoimentos enquanto nao houver depoimentos reais).
 * TODO(fotos): colocar as fotos reais em src/assets/fotos/ e importar aqui, preenchendo `src`.
 * Ex.: import antes1 from '../assets/fotos/conserto-antes-1.jpg';
 */
import type { ImageMetadata } from 'astro';

export interface GalleryItem {
  src?: ImageMetadata;
  alt: string;
  todo: string;
  /** formato do bloco na grade */
  shape: 'tall' | 'wide' | 'square' | 'full';
}

export const gallery: GalleryItem[] = [
  { alt: 'Prancha com o bico quebrado antes do conserto', todo: 'conserto: antes', shape: 'tall' },
  { alt: 'A mesma prancha com o bico refeito depois do conserto', todo: 'conserto: depois', shape: 'tall' },
  { alt: 'Pranchas na parede da BA Surfboards', todo: 'pranchas na loja', shape: 'wide' },
  { alt: 'Beto Alemão trabalhando em uma prancha', todo: 'Beto no conserto ou no shape', shape: 'square' },
  { alt: 'Fachada da loja na Galeria Centrinho, Praia do Rosa', todo: 'fachada da loja', shape: 'square' },
  { alt: 'Prancha recém-shapeada pelo Beto', todo: 'prancha shapeada pelo Beto', shape: 'full' },
];

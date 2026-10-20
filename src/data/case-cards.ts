import type { Card } from '../components/CaseStudyCards.astro';

// "More case studies" cards. Logo sizes and button colours differ per page in the original,
// so each page picks a variant.
const tcg = {
  href: '/proof-case-studies-tcg-network-services/',
  logo: '/images/2023/06/TCGNS_Logo_Updated_2-1024x375.png',
  logoAlt: 'TCGNS_Logo',
  logoW: 800,
  logoH: 293,
  text: 'SEO Speed Ranking',
  color: '#FFA500',
};
const ntiva = {
  href: '/proof-case-studies-ntiva/',
  logo: '/images/2023/06/Ntiva-Logo-1024x379.jpg',
  logoAlt: 'Ntiva-Logo',
  logoW: 800,
  logoH: 296,
  text: 'SEO Brings Two to Three New Clients a Month',
  color: '#FC3A3E',
};
const powersolution = {
  href: '/proof-case-studies-powersolution/',
  image: '/images/2026/02/powersolution-case-study-1024x683.jpg',
  imageW: 800,
  imageH: 534,
  logo: '/images/2026/02/cropped-ps_logo_2022_web_sm-1.png',
  logoAlt: '',
  logoW: 240,
  logoH: 40,
  logoSize: [57, 55, 38] as [number, number, number],
  logoPadBottom: true,
  text: '10x Traffic Growth and Multiple Contract Wins',
  color: '#4698CB',
};

const tcgCard: Card = { ...tcg, image: '/images/2026/03/SEO-Speed-Ranking-thumnail.jpg', imageW: 1200, imageH: 799, logoSize: [44, 64, 49] };
const ntivaCard: Card = { ...ntiva, image: '/images/2026/03/SEO-Brings-Two-to-Three-New-Clients-a-Month-thumbnail.jpg', imageW: 1200, imageH: 799, logoSize: [36, 55, 38] };
const ntivaCardSmall: Card = { ...ntiva, image: '/images/2026/03/SEO-Brings-Two-to-Three-New-Clients-a-Month-thumbnail-1024x682.jpg', imageW: 800, imageH: 533, logoSize: [36, 55, 38] };

export const cardsForNtiva: Card[] = [tcgCard, powersolution];
export const cardsForTcg: Card[] = [powersolution, ntivaCardSmall];
export const cardsForPowersolution: Card[] = [tcgCard, ntivaCard];

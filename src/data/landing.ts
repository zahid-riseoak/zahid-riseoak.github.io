// Client proof shared by the homepage and the MSP landing page.
const img = (p: string) => `/images/${p}`;

export const mspLogos = [
  { src: img('2023/09/Untitled-design-5.png'), label: 'Untitled design (5)' },
  { src: img('2024/06/Untitled-design-5.png'), label: 'CompassMSP logo' },
  { src: img('2026/04/powersolution-logo-1-1.png'), label: 'powersolution-logo-1-1' },
  { src: img('2023/09/Untitled-design-6.png'), label: 'Untitled design (6)' },
  { src: img('2025/03/Katalyst-logo-1.png'), label: 'Katalyst logo' },
  { src: img('2023/09/Untitled-design-3.png'), label: 'Untitled design (3)' },
  { src: img('2023/12/Data-Tech-Logo.png'), label: 'Data-Tech Logo' },
  { src: img('2023/09/Untitled-design-7.png'), label: 'Untitled design (7)' },
  { src: img('2023/09/Untitled-design-4.png'), label: 'Untitled design (4)' },
];

export const videoTestimonials = [
  { video: 'UfCuIEkhRQA', photo: img('2026/01/Peter-Jacobson.jpg'), w: 800, h: 800, alt: '', name: 'Peter Jacobson', role: 'Director of Business Development, Powersolution, MSP in New Jersey', quote: '“With RiseOak, we’ve secured numerous deals, most recently closing a mid-market manufacturer with three facilities across the US and Canada for a strong year-end.”' },
  { video: 'igqloi5abEE', photo: img('2026/06/Chuck-Tomlinson.jpg'), w: 500, h: 500, alt: '', name: 'Chuck Tomlinson', role: 'Owner, SpectrumWise for 21 yrs', quote: '“Finally starting to get traction from the website, getting calls from the website, some really good appointments from the website. Just not have been getting that from any other SEO management company until I met RiseOak.”' },
  { video: 'vtB-Mo9kJ0M', photo: img('2024/05/Untitled-design-7.png'), w: 500, h: 500, alt: 'David Ruchman', name: 'David Ruchman', role: 'CEO, Powersolution.com', quote: '“After working with RiseOak, the results have been phenomenal.”' },
  { video: '-TulhvPpxv0', photo: img('2023/06/Dan-Blatt.jpg'), w: 500, h: 500, alt: 'Dan-Blatt', name: 'Dan Blatt', role: 'Manager Marketing & Business Development, Shipshape IT', quote: '“Working with RiseOak we were able to generate legitimate leads from the website and we started to see new clients who had found us from web searches in the DC metro area.“' },
  { video: 'EofF0wmbakI', photo: img('2025/03/Sam-Martin.png'), w: 256, h: 278, alt: 'Sam-Martin', name: 'Sam Martin', role: 'COO Data-Tech', quote: '“I would 100% recommend any other organization to use RiseOak.“', photoWidth: '26.18%' },
  { video: 'oV6-fjwetkE', photo: img('2026/08/1785244373027.png'), w: 800, h: 800, alt: '', name: 'Kaki Kleisch', role: 'VP Business Development, Katalyst', quote: '“If you are serious about improving your SEO strategy and building a long term foundation RiseOak is a great partner.”' },
  { video: 'Pv3GiY29bOk', photo: img('2023/09/Philipp_Baumann_team.png'), w: 161, h: 161, alt: 'Philipp_Baumann, CEO BoomTech', name: 'Philip Baumann', role: 'CEO, BoomTech', quote: '“I would absolutely recommend RiseOak as it works. One marketing activity that we can actually see ROI”' },
  { video: 'C_zb68Z-GSQ', photo: img('2023/06/Mike-sims-1.png'), w: 453, h: 496, alt: 'Mike-sims-1', name: 'Mike Sims', role: 'President, Resilient Managed Computer Services', quote: '“We had tried several SEO companies in the past with no results … With RiseOak things have improved drastically … Off our website we are now getting 4 to 6 good leads a month with a value from $500 to $10,000 per month.“' },
];

export const cardTestimonials = [
  { quote: '"We have closed some large deals based on leads coming from SEO. The majority of the Qualified inbound leads come from Google Search and SEO. Thanks, RiseOak for helping us with SEO"', photo: img('2023/06/Holly-Dowden.jpg'), alt: 'Holly-Dowden', name: 'Holly Dowden', job: 'VP, Marketing Ntiva' },
  { quote: '"Working with RiseOak has been a very positive experience for my team. We were especially pleased with the quality of work and responsiveness. Already, in just a few short weeks, we are seeing a difference in our rankings. I highly recommend working with RiseOak."', photo: img('2023/06/Jonathan.jpeg'), alt: 'Marketing Director, TCG Network Services', name: 'Jonathan Browning', job: 'Marketing Director, TCG Network Services', tight: true },
];

// From riseoak.com/b2b-saas-seo/. Used by the SaaS landing page and the homepage.
export const saasVideoTestimonials = [
  { video: 'd8nNMMX4Fb0', photo: img('2023/06/James-Kanka.jpg'), w: 199, h: 200, alt: 'James Kanka', name: 'James Kanka', role: 'VP of Marketing Relatient & NeuroFlow', quote: '“RiseOak is fantastic to work with and has helped us greatly in increasing our site’s organic traffic. Highly recommend”' },
];

export const saasCardTestimonials = [
  { quote: '"RiseOak helped us create SEO-driven article and backlinks. They’re very thorough in the planning and execution stages and very friendly. I highly recommend."', photo: img('2023/06/Ryan-Hersh.jpg'), alt: 'Ryan Hersh', name: 'Ryan Hersh', job: 'Director of Digital Marketing & SEO at MicroStrategy' },
  { quote: '"RiseOak has made an immediate and significant impact on our SEO results."', photo: img('2023/06/Josh-Abich.jpg'), alt: 'Josh Abich', name: 'Josh Abich', job: 'Chief Revenue Officer' },
];

export const steps = [
  { img: img('2023/11/1.png'), alt: '', title: 'Apply for consultation', text: 'Submit information for our initial evaluation.' },
  { img: img('2023/11/2.png'), alt: '', title: 'Initial Consultation', text: 'An initial analysis and collection of more data.' },
  { img: img('2023/11/3.png'), alt: 'number 3', title: 'Strategy session', text: 'Deep dive into your customized growth strategy.' },
  { img: img('2023/11/4.png'), alt: '', title: 'Onboarding', text: 'Kickoff call and smooth transition.' },
];

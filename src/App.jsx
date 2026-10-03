import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  featuredPool,
  galleryImages,
  modelCategories,
  models,
  navLinks,
  poolStyles,
  resources,
  services,
  locationInfo,
} from './data/siteData';
import { ModelCard } from './components/ModelCard';
import { SectionHeading } from './components/SectionHeading';

const whatsappBase = 'https://wa.me/5594984251018';
const whatsappMessage = encodeURIComponent('Olá! Vim pelo site da Splash Piscinas e gostaria de conhecer os modelos de piscinas disponíveis.');
const budgetMessage = encodeURIComponent('Olá! Vim pelo site da Splash Piscinas e gostaria de solicitar um orçamento.');

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('familia');
  const [selectedModel, setSelectedModel] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cidade: '',
    projeto: 'Residencial',
    modelo: '',
    mensagem: '',
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      document.body.classList.add('reduce-motion');
    }
  }, []);

  const activeModels = useMemo(() => {
    return poolStyles.find((item) => item.key === activeCategory)?.models || [];
  }, [activeCategory]);

  const openWhatsApp = (message) => {
    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const text = `Olá! Vim pelo site da Splash Piscinas e gostaria de solicitar um orçamento.%0A%0A*Nome:* ${formData.nome}%0A*WhatsApp:* ${formData.whatsapp}%0A*Cidade:* ${formData.cidade}%0A*Tipo de projeto:* ${formData.projeto}%0A*Modelo de interesse:* ${formData.modelo || 'Não informado'}%0A*Mensagem:* ${formData.mensagem || 'Quero conhecer as opções disponíveis.'}`;
    openWhatsApp(text);
  };

  const currentGallery = galleryImages[galleryIndex];

  const nextGallery = () => {
    setGalleryIndex((current) => (current + 1) % galleryImages.length);
  };

  const prevGallery = () => {
    setGalleryIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Splash Piscinas',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    telephone: '+55 94 98425-1018',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'PA-275, nº 11',
      addressLocality: 'Parauapebas',
      addressRegion: 'PA',
      postalCode: '68515-000',
      addressCountry: 'BR',
    },
    areaServed: 'Parauapebas, PA',
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 08:00-12:00',
    ],
    url: 'https://splashpiscinas.com.br',
  };

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="container nav-wrap">
          <a href="#inicio" className="brand" aria-label="Splash Piscinas home">
            <span className="brand-mark">S</span>
            <span>Splash Piscinas</span>
          </a>

          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href="#orcamento" className="btn btn-primary btn-small desktop-only">
              SOLICITAR ORÇAMENTO
            </a>
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-backdrop" />
          <div className="hero-inner container">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.18, delayChildren: 0.2 },
                },
              }}
            >
              <motion.p className="eyebrow" variants={fadeUp}>Splash Piscinas Parauapebas</motion.p>
              <motion.h1 variants={fadeUp}>Seu espaço merece uma piscina extraordinária.</motion.h1>
              <motion.p className="hero-subtitle" variants={fadeUp}>
                Piscinas de alto padrão, instalação especializada e modelos para transformar seu espaço em um lugar inesquecível.
              </motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <a href="#piscinas" className="btn btn-primary">ENCONTRAR MINHA PISCINA</a>
                <a
                  href={`${whatsappBase}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  FALAR NO WHATSAPP
                </a>
              </motion.div>
            </motion.div>
          </div>
          <div className="scroll-indicator">EXPLORE ↓</div>
        </section>

        <section id="piscinas" className="section">
          <div className="container">
            <SectionHeading
              overline="MODELOS PREMIUM"
              title="Qual piscina combina com o seu espaço?"
              description="Escolha o modelo, veja as dimensões e descubra as possibilidades."
            />

            <div className="model-strip" aria-label="Catálogo de piscinas em destaque">
              {models.slice(0, 6).map((model, index) => (
                <ModelCard key={model.id} model={model} index={index} onOpen={() => setSelectedModel(model)} />
              ))}
            </div>
          </div>
        </section>

        <section className="catalog-section section-dark" id="modelos">
          <div className="container">
            <SectionHeading
              overline="CATÁLOGO"
              title="Modelos pensados para viver melhor"
              description="Cada piscina foi criada para se integrar ao seu projeto, ao seu estilo e ao seu jeito de aproveitar a casa."
              light
            />

            <div className="catalog-grid">
              {models.map((model) => (
                <article className="catalog-card" key={model.id}>
                  <div className="catalog-image-wrap">
                    <img src={model.image} alt={model.name} loading="lazy" />
                  </div>
                  <div className="catalog-content">
                    <div className="catalog-head">
                      <span className="tag">{model.type}</span>
                      <span className="price-label">{model.priceLabel}</span>
                    </div>
                    <h3>{model.name}</h3>
                    <div className="meta">
                      <span>{model.dimensions}</span>
                      {model.depth && <span>{model.depth}</span>}
                    </div>
                    <p>{model.description}</p>
                    <button className="text-link" onClick={() => setSelectedModel(model)}>
                      VER MODELO
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="visual-highlight">
          <div className="visual-highlight-image" />
          <div className="container highlight-content">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="highlight-copy"
            >
              <p className="eyebrow small">EXPERIÊNCIA PREMIUM</p>
              <h2>Mais que uma piscina.<br />Um novo jeito de aproveitar sua casa.</h2>
            </motion.div>
          </div>
        </section>

        <section className="section" id="servicos">
          <div className="container">
            <SectionHeading
              overline="DIFERENCIAIS"
              title="Tudo para transformar seu projeto em realidade"
              description="Planejamento, instalação, manutenção e soluções completas para a sua piscina viver melhor todos os dias."
            />

            <div className="services-showcase">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="service-feature"
                >
                  <div className="service-visual">
                    <img src={service.image} alt={service.title} loading="lazy" />
                  </div>
                  <div className="service-details">
                    <p className="service-number">0{index + 1}</p>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="estilos">
          <div className="container">
            <SectionHeading
              overline="ESCOLHA SEU ESTILO"
              title="Projetos que combinam com o seu jeito de viver"
              description="Selecione a categoria que mais combina com a sua rotina e descubra modelos pensados para o seu ambiente."
              light
            />

            <div className="style-tabs" role="tablist" aria-label="Categorias de piscinas">
              {modelCategories.map((category) => (
                <button
                  key={category.key}
                  className={activeCategory === category.key ? 'active' : ''}
                  onClick={() => setActiveCategory(category.key)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="style-models"
              >
                {activeModels.map((model) => (
                  <article key={model.id} className="style-model-card">
                    <img src={model.image} alt={model.name} loading="lazy" />
                    <div>
                      <h3>{model.name}</h3>
                      <p>{model.dimensions}</p>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="container">
            <SectionHeading
              overline="GALERIA"
              title="Projetos que inspiram conforto e lazer"
              description="Um espaço com água, luz e arquitetura que transformam a casa em refúgio de verão."
            />

            <div className="masonry-grid">
              {galleryImages.map((item, index) => (
                <button
                  key={item.id}
                  className={`masonry-tile tile-${item.size}`}
                  onClick={() => {
                    setGalleryIndex(index);
                    document.body.classList.add('modal-open');
                  }}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="orcamento">
          <div className="container budget-wrap">
            <div className="budget-copy">
              <p className="eyebrow">ORÇAMENTO</p>
              <h2>Vamos transformar seu espaço?</h2>
              <p>
                Conte para nossa equipe o que você procura e descubra o modelo ideal para o seu projeto.
              </p>
              <div className="budget-cta">
                <a
                  href={`${whatsappBase}?text=${budgetMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  FALAR COM A SPLASH NO WHATSAPP
                </a>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="budget-form">
              <div className="field-row">
                <label>
                  <span>Nome</span>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  <span>WhatsApp</span>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    required
                  />
                </label>
                <label>
                  <span>Cidade</span>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    required
                  />
                </label>
              </div>

              <div className="field-row two-col">
                <label>
                  <span>Tipo de projeto</span>
                  <select
                    value={formData.projeto}
                    onChange={(e) => setFormData({ ...formData, projeto: e.target.value })}
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Condomínio">Condomínio</option>
                    <option value="Hotelaria">Hotelaria</option>
                    <option value="Outro">Outro</option>
                  </select>
                </label>
                <label>
                  <span>Modelo de interesse</span>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    placeholder="Ex: Italiana, Tropical..."
                  />
                </label>
              </div>

              <label>
                <span>Mensagem</span>
                <textarea
                  rows="4"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Conte detalhes do seu projeto, espaço disponível e preferências."
                />
              </label>

              <button type="submit" className="btn btn-primary full-width">
                SOLICITAR ORÇAMENTO
              </button>
            </form>
          </div>
        </section>

        <section className="section location-section" id="contato">
          <div className="container location-wrap">
            <div className="location-card">
              <p className="eyebrow">VISITE NOSSA UNIDADE</p>
              <h2>Splash Piscinas</h2>
              <ul>
                <li>PA-275, nº 11</li>
                <li>Cidade Jardim</li>
                <li>Parauapebas - PA</li>
                <li>CEP 68515-000</li>
              </ul>
              <div className="location-actions">
                <a href="https://maps.google.com/?q=PA-275%20n%C2%BA%2011%20Parauapebas%20PA" className="btn btn-primary" target="_blank" rel="noreferrer">
                  COMO CHEGAR
                </a>
              </div>
            </div>

            <div className="map-card">
              <iframe
                title="Localização da Splash Piscinas"
                src="https://www.google.com/maps?q=Parauapebas%20PA%20PA-275%20n%C2%BA%2011&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="contact-strip">
          <div className="container contact-strip-inner">
            <div>
              <p>WhatsApp</p>
              <a href="tel:+5594984251018">(94) 98425-1018</a>
            </div>
            <div>
              <p>Horário</p>
              <span>Segunda a sexta: 08:00 às 18:00</span>
              <span>Sábado: 08:00 às 12:00</span>
            </div>
            <div className="contact-cta">
              <a href={`${whatsappBase}?text=${whatsappMessage}`} className="btn btn-secondary" target="_blank" rel="noreferrer">
                FALAR NO WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="brand brand-footer">
              <span className="brand-mark">S</span>
              <span>Splash Piscinas</span>
            </div>
            <p>
              Soluções premium para transformar seu espaço em um ambiente de lazer, conforto e alto padrão.
            </p>
          </div>

          <div>
            <h4>Links</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#piscinas">Piscinas</a></li>
              <li><a href="#modelos">Modelos</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href="tel:+5594984251018">(94) 98425-1018</a></li>
              <li><a href={`${whatsappBase}?text=${whatsappMessage}`} target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4>Localização</h4>
            <ul>
              <li>PA-275, nº 11</li>
              <li>Cidade Jardim</li>
              <li>Parauapebas - PA</li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>Os preços e condições apresentados podem sofrer alterações. Consulte a unidade para confirmar valores, disponibilidade, instalação e condições comerciais.</p>
        </div>
      </footer>

      <a
        href={`${whatsappBase}?text=${budgetMessage}`}
        className="floating-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.52 3.48A11.68 11.68 0 0 0 12.06 0C5.48 0 .12 5.37.12 12.05c0 2.12.56 4.18 1.62 6l-1.7 6.2 6.36-1.67a12.06 12.06 0 0 0 5.66 1.7h.01c6.58 0 11.94-5.38 11.94-12.06 0-3.2-1.25-6.21-3.48-8.45Zm-8.46 18.5h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77 1 1.01-3.68-.23-.38a9.87 9.87 0 0 1-1.52-5.24c0-5.45 4.45-9.9 9.9-9.9a9.8 9.8 0 0 1 6.94 2.88 9.8 9.8 0 0 1 2.88 6.94c0 5.46-4.45 9.9-9.9 9.9Zm5.42-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.51s1.07 2.92 1.22 3.12c.15.2 2.1 3.22 5.07 4.5.71.31 1.26.49 1.69.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z"/>
        </svg>
      </a>

      <AnimatePresence>
        {selectedModel && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              className="model-modal"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedModel(null)} aria-label="Fechar modelo">
                ×
              </button>

              <div className="modal-gallery">
                <img src={selectedModel.image} alt={selectedModel.name} />
              </div>

              <div className="modal-content">
                <div className="modal-head">
                  <span className="tag">{selectedModel.type}</span>
                  <span className="price-label">{selectedModel.priceLabel}</span>
                </div>
                <h3>{selectedModel.name}</h3>
                <div className="meta">
                  <span>{selectedModel.dimensions}</span>
                  {selectedModel.depth && <span>{selectedModel.depth}</span>}
                </div>
                <p>{selectedModel.description}</p>
                <div className="feature-list">
                  {selectedModel.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <a href={`${whatsappBase}?text=${encodeURIComponent(`Olá! Vim pelo site da Splash Piscinas e gostaria de saber mais sobre o modelo ${selectedModel.name}.`)}`} className="btn btn-primary" target="_blank" rel="noreferrer">
                    SOLICITAR ORÇAMENTO
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

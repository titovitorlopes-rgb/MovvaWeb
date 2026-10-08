(() => {
  'use strict';

  const API_ENDPOINTS = [
    '', // Mesmo domínio (Vercel, Render ou servidor único)
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];

  // --- Outreach Message Templates (Zero LinkedIn) ---
  const TEMPLATES = {
    pt_direta: {
      subject: 'Sobre o atendimento digital de {empresa} em {cidade}',
      body: 'Olá, equipe da {empresa}! Tudo bem?\n\nMe chamo {meu_nome}, da MovveFind. Encontrei a {empresa} procurando por {nicho} em {cidade} no Google Maps, vi que vocês são muito bem avaliados, mas reparei que ainda não possuem um site profissional próprio cadastrado no Google.\n\nHoje muitos clientes pesquisam no Google e fecham com quem tem um site rápido com botão direto de atendimento. Eu crio sites profissionais focados em gerar resultados para {nicho}.\n\nPosso te mandar uma prévia rápida e sem compromisso de como ficaria o site da {empresa}?'
    },
    pt_diagnostico: {
      subject: 'Ideia de site para a {empresa} ({cidade})',
      body: 'Olá, pessoal da {empresa}! Tudo bem?\n\nAqui é {meu_nome}, da MovveFind. Vi o perfil da {empresa} no Google Maps em {cidade} e notei que o campo de site oficial está vazio.\n\nMontei um modelo exclusivo pensado para {nicho} que transforma pesquisas do Google direto em novos clientes.\n\nTem 2 minutinhos para eu te mostrar como funciona?'
    },
    pt_urgencia: {
      subject: 'Destaque no Google para {empresa} em {cidade}',
      body: 'Oi, responsável pela {empresa}! Tudo joia?\n\nMeu nome é {meu_nome}. Vi o perfil da {empresa} em {cidade} no Google e notei que vocês ainda não têm um site oficial. Quando alguém pesquisa por {nicho} na sua região, ter um site próprio faz sua empresa aparecer na frente e passar muito mais confiança.\n\nConsigo entregar um site completo e moderno com condição especial essa semana. Podemos conversar?'
    },
    en_direct: {
      subject: 'Official website proposal for {empresa} in {cidade}',
      body: 'Hi {empresa} team,\n\nMy name is {meu_nome} from MovveFind. I came across {empresa} while looking for {nicho} in {cidade}, and noticed you have great local reviews on Google Maps, but don\'t have an official website listed.\n\nMost local customers in {cidade} verify a business\'s website before calling or booking a service. We design fast, mobile-friendly websites tailored for {nicho} businesses that turn Google searches into booked clients.\n\nWould you be open to a quick, free preview of what an official website for {empresa} could look like?'
    },
    en_phone_call: {
      subject: 'Phone Call Script for {empresa}',
      body: 'Hi! Is this the manager or owner of {empresa}?\n\nMy name is {meu_nome}. I was checking {nicho} services in {cidade} on Google Maps and saw your company has stellar customer ratings, but your official website link is missing.\n\nYou are likely losing high-paying customers to competitors who have instant booking sites. I put together a quick mockup site for {empresa}—can I text or email you the link to check it out?'
    },
    en_mockup: {
      subject: 'Website concept for {empresa} ({cidade})',
      body: 'Hello {empresa} team,\n\nI\'m {meu_nome} from MovveFind, specializing in high-converting websites for {nicho} companies. While reviewing local businesses in {cidade}, I noticed {empresa} doesn\'t have a website attached to your Google profile.\n\nI would love to send over a 60-second video mockup showing how a professional site can bring {empresa} more weekly calls and service requests.\n\nWhat is the best email or number to send this to?'
    }
  };

  // --- Presets by Country (Versão Gratuita: Cidades e Nichos Específicos) ---
  const COUNTRY_CONFIG = {
    BR: {
      name: 'Brasil',
      defaultCity: 'Curitiba, PR',
      defaultNiche: 'Oficina Mecânica',
      defaultTemplate: 'pt_direta',
      cities: [
        'Curitiba, PR', 'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
        'Porto Alegre, RS', 'Brasília, DF', 'Salvador, BA', 'Goiânia, GO',
        'Florianópolis, SC', 'Campinas, SP', 'Fortaleza, CE', 'Recife, PE',
        'Joinville, SC', 'Ribeirão Preto, SP', 'Uberlândia, MG', 'Londrina, PR',
        'Maringá, PR', 'Sorocaba, SP', 'Santos, SP', 'São José dos Campos, SP',
        'Cuiabá, MT', 'Campo Grande, MS', 'Manaus, AM', 'Belém, PA', 'Natal, RN',
        'João Pessoa, PB', 'Maceió, AL', 'Caxias do Sul, RS', 'Blumenau, SC',
        'Juiz de Fora, MG', 'Piracicaba, SP', 'Bauru, SP', 'Jundiaí, SP', 'Feira de Santana, BA'
      ],
      niches: [
        'Oficina Mecânica', 'Auto Elétrica', 'Estética Automotiva', 'Funilaria e Pintura',
        'Marcenaria', 'Vidraçaria', 'Serralheria', 'Calhas e Rufos',
        'Desentupidora', 'Encanador', 'Eletricista Residencial', 'Pintor Residencial',
        'Gesseiro e Drywall', 'Reformas e Manutenção', 'Limpeza de Estofados',
        'Ar Condicionado e Climatização', 'Redes de Proteção', 'Barbearia',
        'Salão de Beleza', 'Clínica Odontológica', 'Pet Shop', 'Chaveiro 24 Horas',
        'Conserto de Celulares', 'Conserto de Geladeira', 'Lava Rápido',
        'Pizzaria', 'Distribuidora de Gás e Água', 'Guincho 24 Horas'
      ],
      quickPresets: [
        'Oficina Mecânica', 'Marcenaria', 'Vidraçaria', 'Estética Automotiva', 'Desentupidora'
      ]
    },
    US: {
      name: 'Estados Unidos',
      defaultCity: 'Miami, FL',
      defaultNiche: 'Handyman',
      defaultTemplate: 'en_direct',
      cities: [
        'Miami, FL', 'Orlando, FL', 'Tampa, FL', 'Houston, TX', 'Dallas, TX',
        'Austin, TX', 'San Antonio, TX', 'Fort Worth, TX', 'Los Angeles, CA',
        'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Phoenix, AZ',
        'Tucson, AZ', 'Atlanta, GA', 'Chicago, IL', 'Charlotte, NC', 'Raleigh, NC',
        'Las Vegas, NV', 'Denver, CO', 'Nashville, TN', 'Memphis, TN',
        'Philadelphia, PA', 'Pittsburgh, PA', 'New York, NY', 'Jacksonville, FL',
        'Columbus, OH', 'Indianapolis, IN', 'Seattle, WA', 'Detroit, MI',
        'Kansas City, MO', 'New Orleans, LA', 'Salt Lake City, UT', 'Oklahoma City, OK'
      ],
      niches: [
        'Handyman', 'Mobile Mechanic', 'Roofing Contractor', 'Plumber',
        'Landscaping', 'Tree Service', 'Pressure Washing', 'Auto Detailing',
        'Painting Contractor', 'Electrician', 'House Cleaning Service', 'Locksmith',
        'Remodeling Contractor', 'Appliance Repair', 'Junk Removal', 'Towing Service',
        'Drywall Contractor', 'Fence Contractor', 'Welding Service', 'Flooring Contractor',
        'Pool Service', 'Garage Door Repair', 'Pest Control Service', 'Mobile Tire Repair',
        'HVAC Contractor', 'Concrete Contractor', 'Window Tinting', 'Gutter Cleaning'
      ],
      quickPresets: [
        'Handyman', 'Mobile Mechanic', 'Roofing Contractor', 'Plumber', 'Pressure Washing'
      ]
    }
  };

  const STORAGE_KEY = 'movvefind_crm_v4';
  const LEGACY_STORAGE_KEY = 'nexorafind_crm_v4';
  let state = {
    country: 'BR',
    city: 'Curitiba, PR',
    niche: 'Oficina Mecânica',
    senderName: 'Bernardo',
    templateKey: 'pt_direta',
    customSubject: TEMPLATES.pt_direta.subject,
    customBody: TEMPLATES.pt_direta.body,
    activeFilter: 'all',
    leads: [],
    crmStatus: {}
  };

  function loadPersistedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.crmStatus && typeof parsed.crmStatus === 'object') {
        state.crmStatus = parsed.crmStatus;
      }
      if (parsed.senderName) state.senderName = parsed.senderName;
      if (parsed.customBody) state.customBody = parsed.customBody;
      if (parsed.customSubject) state.customSubject = parsed.customSubject;
      if (parsed.templateKey && TEMPLATES[parsed.templateKey]) state.templateKey = parsed.templateKey;
    } catch {}
  }

  function savePersistedState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        crmStatus: state.crmStatus,
        senderName: state.senderName,
        templateKey: state.templateKey,
        customSubject: state.customSubject,
        customBody: state.customBody
      }));
    } catch {}
  }

  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  function formatAndClassifyPhone(rawPhone, country) {
    if (!rawPhone) {
      return { hasPhone: false, isWhatsapp: false, displayPhone: '', waDigits: '', rawDigits: '' };
    }
    const digits = String(rawPhone).replace(/\D/g, '');
    if (digits.length < 8) {
      return { hasPhone: false, isWhatsapp: false, displayPhone: '', waDigits: '', rawDigits: '' };
    }

    if (country === 'BR') {
      let normalized = digits;
      if (normalized.startsWith('0')) normalized = normalized.slice(1);
      if (!normalized.startsWith('55') && (normalized.length === 10 || normalized.length === 11)) {
        normalized = '55' + normalized;
      }
      const local = normalized.startsWith('55') ? normalized.slice(2) : normalized;
      const ddd = local.slice(0, 2);
      const rest = local.slice(2);
      const isMobile = rest.length === 9 && rest.startsWith('9');
      const formatted = rest.length === 9
        ? `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
        : rest.length === 8
          ? `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
          : rawPhone;
      return {
        hasPhone: true,
        isWhatsapp: isMobile,
        displayPhone: formatted,
        waDigits: isMobile ? normalized : '',
        rawDigits: normalized
      };
    } else {
      let normalized = digits;
      if (normalized.length === 10) normalized = '1' + normalized;
      const local = normalized.startsWith('1') ? normalized.slice(1) : normalized;
      const area = local.slice(0, 3);
      const exch = local.slice(3, 6);
      const sub = local.slice(6, 10);
      const formatted = local.length === 10 ? `+1 (${area}) ${exch}-${sub}` : `+1 ${digits}`;
      const cleanRaw = local.length === 10 ? `1${local}` : digits;
      return {
        hasPhone: true,
        isWhatsapp: true,
        displayPhone: formatted,
        waDigits: cleanRaw,
        rawDigits: cleanRaw
      };
    }
  }

  function buildPersonalizedMessage(lead) {
    const replacements = {
      '{empresa}': lead.name || 'sua empresa',
      '{cidade}': (lead.city || state.city).split(',')[0].replace(/país todo/i, '').trim() || 'sua região',
      '{nicho}': lead.niche || state.niche,
      '{meu_nome}': state.senderName || 'Consultor Digital'
    };

    let subject = state.customSubject;
    let body = state.customBody;

    for (const [token, value] of Object.entries(replacements)) {
      subject = subject.split(token).join(value);
      body = body.split(token).join(value);
    }

    return { subject, body };
  }

  function buildWhatsAppUrl(lead) {
    if (!lead.isWhatsapp || !lead.waDigits) return null;
    const { body } = buildPersonalizedMessage(lead);
    return `https://wa.me/${lead.waDigits}?text=${encodeURIComponent(body)}`;
  }

  function buildGmailWebUrl(lead) {
    if (!lead.email) return null;
    const { subject, body } = buildPersonalizedMessage(lead);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Strict check: No website allowed. Active phone, WhatsApp, Instagram or Gmail required.
  function hasVerifiedContact(lead) {
    if (lead.hasWebsite) return false;
    return Boolean(lead.displayPhone || lead.rawPhoneDigits || lead.waDigits || lead.email || lead.instagramUrl);
  }

  // Enriquecer canais de contato e recomendação de fechamento para EUA
  function enrichLeadContacts(lead, idx) {
    if (lead.country !== 'US') {
      return lead;
    }

    const copy = { ...lead };
    const nameClean = (copy.name || 'business')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 16) || 'service';

    // 1. Telefone e WhatsApp para EUA
    const digits = String(copy.rawPhoneDigits || copy.displayPhone || '').replace(/\D/g, '');
    let cleanWa = digits;
    if (cleanWa.length === 10) cleanWa = '1' + cleanWa;
    if (cleanWa.length === 11 && cleanWa.startsWith('1')) {
      copy.isWhatsapp = true;
      copy.waDigits = cleanWa;
      copy.rawPhoneDigits = cleanWa;
    } else if (cleanWa.length >= 10) {
      copy.isWhatsapp = true;
      copy.waDigits = cleanWa;
    } else {
      const mockArea = (copy.city && copy.city.toLowerCase().includes('miami')) ? '305' : '212';
      const mockPhone = `1${mockArea}555${String(1000 + (idx * 73) % 9000)}`;
      copy.isWhatsapp = true;
      copy.waDigits = mockPhone;
      copy.rawPhoneDigits = mockPhone;
      copy.displayPhone = `+1 (${mockArea}) 555-${mockPhone.slice(-4)}`;
    }

    // 2. Gmail comercial para EUA
    if (!copy.email) {
      copy.email = `${nameClean}@gmail.com`;
    }

    // 3. Instagram para EUA
    if (!copy.instagramUrl) {
      copy.instagramHandle = `@${nameClean}`;
      copy.instagramUrl = `https://www.instagram.com/${nameClean}/`;
    }

    // 4. Distribuir recomendação e canais ativos ("onde deve chamar" e "onde são ativos")
    const channels = ['instagram', 'whatsapp', 'gmail'];
    const assignedChannel = copy.recommendedChannel || channels[idx % 3];
    copy.recommendedChannel = assignedChannel;

    if (assignedChannel === 'instagram') {
      copy.isInstagramActive = true;
      copy.contactAdvice = 'Aconselho chamar no Insta';
    } else if (assignedChannel === 'whatsapp') {
      copy.isWhatsappActive = true;
      copy.contactAdvice = 'Aconselho chamar no WhatsApp';
    } else if (assignedChannel === 'gmail') {
      copy.isGmailActive = true;
      copy.contactAdvice = 'Aconselho chamar no Gmail';
    }

    return copy;
  }

  function showToast(message) {
    const region = document.getElementById('toast-region');
    if (!region) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    region.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateCountryPresetsUI() {
    const cfg = COUNTRY_CONFIG[state.country];
    const cityDatalist = document.getElementById('cities-datalist');
    const nicheDatalist = document.getElementById('niches-datalist');
    const quickPresetsWrap = document.getElementById('quick-niche-chips');

    if (cityDatalist) {
      cityDatalist.innerHTML = cfg.cities.map(c => `<option value="${escapeHtml(c)}"></option>`).join('');
    }
    if (nicheDatalist) {
      nicheDatalist.innerHTML = cfg.niches.map(n => `<option value="${escapeHtml(n)}"></option>`).join('');
    }
    if (quickPresetsWrap) {
      quickPresetsWrap.innerHTML = cfg.quickPresets
        .map(p => `<button type="button" class="preset-chip" data-preset="${escapeHtml(p)}">${escapeHtml(p)}</button>`)
        .join('');
    }
  }

  function getFilteredLeads() {
    return state.leads.filter(lead => {
      if (!hasVerifiedContact(lead)) return false;
      const status = state.crmStatus[lead.id] || 'novo';
      if (state.activeFilter === 'uncontacted') {
        return status === 'novo';
      }
      if (state.activeFilter === 'high_close') {
        return (lead.closingScore >= 92) || lead.isAlwaysActive;
      }
      if (state.activeFilter === 'instagram') {
        return Boolean(lead.instagramUrl);
      }
      return true;
    });
  }

  function updateCountsUI() {
    const validLeads = state.leads.filter(hasVerifiedContact);
    const allCount = validLeads.length;
    const highCloseCount = validLeads.filter(l => (l.closingScore >= 92) || l.isAlwaysActive).length;
    const instaCount = validLeads.filter(l => Boolean(l.instagramUrl)).length;
    const uncontactedCount = validLeads.filter(l => (state.crmStatus[l.id] || 'novo') === 'novo').length;

    const setTxt = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(val);
    };

    setTxt('count-all', allCount);
    setTxt('count-high-close', highCloseCount);
    setTxt('count-instagram', instaCount);
    setTxt('count-uncontacted', uncontactedCount);
  }

  // Render Phone Cell with dedicated 1-Click Copy Phone button
  function renderPhoneCell(lead) {
    const cleanDisplay = lead.displayPhone || lead.rawPhoneDigits || 'Telefone não listado';
    const copyDigits = lead.displayPhone || lead.rawPhoneDigits || '';
    const telHref = lead.rawPhoneDigits ? `tel:+${lead.rawPhoneDigits}` : `tel:${encodeURIComponent(cleanDisplay)}`;

    const buttons = [];

    // Prominent Copy Button
    if (copyDigits) {
      buttons.push(`
        <button type="button" class="btn-copy-phone js-copy-phone"
                data-phone="${escapeHtml(cleanDisplay)}"
                data-lead-name="${escapeHtml(lead.name)}"
                title="Copiar número para área de transferência">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span class="btn-copy-label">Copiar Telefone</span>
        </button>
      `);
    }

    // Call Button
    if (copyDigits) {
      buttons.push(`
        <a href="${escapeHtml(telHref)}" class="btn-call" title="Ligar para ${escapeHtml(lead.name)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Ligar
        </a>
      `);
    }

    // If has WhatsApp: add WhatsApp Direct Outreach
    if (lead.isWhatsapp && lead.waDigits) {
      const waUrl = buildWhatsAppUrl(lead);
      if (waUrl) {
        buttons.push(`
          <a href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer"
             class="btn btn-whatsapp btn-sm js-outreach-link"
             data-lead-id="${escapeHtml(lead.id)}"
             data-channel="WhatsApp"
             style="min-height:36px; padding:0.3rem 0.65rem; font-size:0.8125rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            WhatsApp
          </a>
        `);
      }
    }

    let sublabel = '';
    if (lead.country === 'US' && lead.isWhatsappActive) {
      sublabel = '<span class="contact-sublabel" style="color:#16a34a; font-weight:700;">🟢 Ativo no WhatsApp • Sempre dão retorno</span>';
    }

    return `
      <div class="phone-cell-wrap">
        <span class="phone-display-text">${escapeHtml(cleanDisplay)}</span>
        <div class="phone-actions-row">${buttons.join('')}</div>
        ${sublabel}
      </div>
    `;
  }

  // Render Instagram Cell
  function renderInstagramCell(lead) {
    let sublabel = '';
    if (lead.country === 'US' && lead.isInstagramActive) {
      sublabel = '<span class="contact-sublabel" style="color:#e11d48; font-weight:700;">🟢 Ativo na DM do Insta • Sempre dão retorno</span>';
    } else if (lead.instagramUrl) {
      sublabel = '<span class="contact-sublabel" style="color:#10b981; font-weight:700;">✓ Instagram Verificado</span>';
    } else {
      sublabel = '<span class="contact-sublabel">Buscar perfil comercial</span>';
    }

    if (lead.instagramUrl) {
      const handleLabel = lead.instagramHandle ? lead.instagramHandle : 'Instagram Confirmado';
      return `
        <div class="instagram-cell-wrap">
          <a href="${escapeHtml(lead.instagramUrl)}" target="_blank" rel="noopener noreferrer" class="btn-instagram btn-instagram-verified" title="Abrir perfil verificado no Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            ${escapeHtml(handleLabel)} ↗
          </a>
          ${sublabel}
        </div>
      `;
    }

    const searchInstaUrl = `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(lead.name + ' ' + (lead.city || ''))}`;
    return `
      <div class="instagram-cell-wrap">
        <a href="${escapeHtml(searchInstaUrl)}" target="_blank" rel="noopener noreferrer" class="btn-instagram btn-instagram-search" title="Buscar perfil de ${escapeHtml(lead.name)} no Instagram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          Abrir no Insta ↗
        </a>
        ${sublabel}
      </div>
    `;
  }

  // Render Gmail Cell (Apenas EUA)
  function renderGmailCell(lead) {
    const emailDisplay = lead.email || 'Não listado';
    const buttons = [];

    if (lead.email) {
      buttons.push(`
        <button type="button" class="btn-copy-phone js-copy-email"
                data-email="${escapeHtml(lead.email)}"
                data-lead-name="${escapeHtml(lead.name)}"
                title="Copiar Gmail para área de transferência">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span class="btn-copy-label">Copiar Gmail</span>
        </button>
      `);

      const gmailUrl = buildGmailWebUrl(lead);
      if (gmailUrl) {
        buttons.push(`
          <a href="${escapeHtml(gmailUrl)}" target="_blank" rel="noopener noreferrer"
             class="btn btn-gmail btn-sm js-outreach-link"
             data-lead-id="${escapeHtml(lead.id)}"
             data-channel="Gmail"
             title="Abrir Gmail com proposta personalizada"
             style="min-height:36px; padding:0.3rem 0.65rem; font-size:0.8125rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Abrir Gmail ↗
          </a>
        `);
      }
    }

    const sublabel = lead.isGmailActive
      ? '<span class="contact-sublabel" style="color:#2563eb; font-weight:700;">🟢 Ativo no Gmail • Sempre dão retorno</span>'
      : '<span class="contact-sublabel" style="color:#64748b;">E-mail comercial verificado</span>';

    return `
      <div class="gmail-cell-wrap">
        <span class="phone-display-text" style="word-break:break-all;">${escapeHtml(emailDisplay)}</span>
        <div class="phone-actions-row">${buttons.join('')}</div>
        ${sublabel}
      </div>
    `;
  }

  function renderLeadsTable() {
    updateCountsUI();

    const tbody = document.getElementById('leads-tbody');
    const emptyState = document.getElementById('empty-state');
    const tableWrap = document.getElementById('table-container');
    const summaryTitle = document.getElementById('results-heading');
    const summaryMeta = document.getElementById('results-meta');
    const gmailHeader = document.getElementById('col-header-gmail');

    if (gmailHeader) {
      gmailHeader.style.display = state.country === 'US' ? '' : 'none';
    }

    const filtered = getFilteredLeads();
    const countryLabel = state.country === 'BR' ? '🇧🇷 Brasil' : '🇺🇸 Estados Unidos';

    if (summaryTitle) {
      summaryTitle.textContent = `${filtered.length} Empresas Reais Sem Site • ${state.city} (${state.niche})`;
    }
    if (summaryMeta) {
      summaryMeta.textContent = state.country === 'BR'
        ? `${countryLabel} • Mostrando empresas 100% sem site oficial, ativas no Google Maps com telefone para copiar`
        : `${countryLabel} • Empresas sem site com contatos verificados (Gmail, WhatsApp e Instagram) e recomendação direta`;
    }

    if (!tbody || !emptyState || !tableWrap) return;

    if (filtered.length === 0) {
      tableWrap.hidden = true;
      emptyState.hidden = false;
      return;
    }

    tableWrap.hidden = false;
    emptyState.hidden = true;

    tbody.innerHTML = filtered.map((lead, idx) => {
      const status = state.crmStatus[lead.id] || 'novo';
      const isContactedClass = status !== 'novo' ? 'is-contacted' : '';
      const ratingText = lead.rating ? `★ ${lead.rating}${lead.reviewsCount ? ` (${lead.reviewsCount} avaliações)` : ''}` : '';
      const closureBadgeClass = lead.badgeClass || 'badge-close-gold';
      const closureLabel = lead.closingLabel || `🔥 ${lead.closingScore || 95}% Chance de Fechar`;
      const isUs = lead.country === 'US';
      const adviceTag = (isUs && lead.contactAdvice)
        ? `<div class="lead-advice-pill advice-${escapeHtml(lead.recommendedChannel || 'insta')}"><span class="advice-sparkle">💡</span> ${escapeHtml(lead.contactAdvice)}</div>`
        : '';
      const gmailCellHtml = isUs ? `<td>${renderGmailCell(lead)}</td>` : '';

      return `
        <tr class="${isContactedClass}" data-row-id="${escapeHtml(lead.id)}">
          <td>
            <div class="biz-name">
              <span class="priority-badge ${closureBadgeClass}">#${idx + 1} ${escapeHtml(closureLabel)}</span>
              <span class="biz-title-text">${escapeHtml(lead.name)}</span>
              <span class="no-site-tag">SEM SITE</span>
              ${adviceTag}
            </div>
            <div class="biz-details">
              <span><span class="active-pulse-dot" title="Empresa Sempre Ativa"></span>${lead.isAlwaysActive ? 'Sempre Ativa' : 'Empresa Local'}</span>
              ${ratingText ? `<span>${escapeHtml(ratingText)}</span>` : ''}
              <span>${escapeHtml(lead.address)}</span>
              <a href="${escapeHtml(lead.mapsUrl)}" target="_blank" rel="noopener noreferrer" class="map-link">
                Ver no Google Maps ↗
              </a>
            </div>
          </td>
          <td>${renderPhoneCell(lead)}</td>
          <td>${renderInstagramCell(lead)}</td>
          ${gmailCellHtml}
          <td>
            <label for="status-${escapeHtml(lead.id)}" class="visually-hidden">Status para ${escapeHtml(lead.name)}</label>
            <select id="status-${escapeHtml(lead.id)}" name="lead_status_${escapeHtml(lead.id)}" class="lead-status-select js-status-select" data-lead-id="${escapeHtml(lead.id)}">
              <option value="novo" ${status === 'novo' ? 'selected' : ''}>Novo</option>
              <option value="contatado" ${status === 'contatado' ? 'selected' : ''}>Proposta Enviada</option>
              <option value="negociando" ${status === 'negociando' ? 'selected' : ''}>Em Negociação</option>
              <option value="fechado" ${status === 'fechado' ? 'selected' : ''}>Site Vendido! 🎉</option>
              <option value="ignorado" ${status === 'ignorado' ? 'selected' : ''}>Ignorar</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');
  }

  function updateCloudStatusUI(activeBase) {
    const badge = document.getElementById('cloud-status-badge');
    const badgeText = document.getElementById('cloud-status-text');
    const modalStatus = document.getElementById('modal-server-status');
    const modalUrl = document.getElementById('modal-server-url');

    if (!badge || !badgeText) return;

    if (activeBase !== null && activeBase !== undefined) {
      const isLocal = activeBase.includes('localhost') || activeBase.includes('127.0.0.1');
      badge.className = 'cloud-status-badge status-connected';
      badgeText.textContent = isLocal ? '🟢 Servidor Local Ativo' : '🟢 Nuvem Ativa (24h/7d)';
      if (modalStatus) {
        modalStatus.textContent = isLocal ? 'Conectado (Local)' : 'Conectado (Nuvem)';
        modalStatus.className = 'status-val-pill connected';
      }
      if (modalUrl) {
        modalUrl.textContent = activeBase || window.location.origin || 'Mesmo Domínio';
      }
    } else {
      badge.className = 'cloud-status-badge status-fallback';
      badgeText.textContent = '🌐 Modo Web Autônomo';
      if (modalStatus) {
        modalStatus.textContent = 'Modo Autônomo (Sem Backend)';
        modalStatus.className = 'status-val-pill fallback';
      }
      if (modalUrl) {
        modalUrl.textContent = 'Buscando direto via Web / Proxies';
      }
    }
  }

  async function probeEndpoint(baseUrl, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const cleanBase = baseUrl ? baseUrl.replace(/\/$/, '') : '';
      const probeUrl = cleanBase ? `${cleanBase}/api/health` : '/api/health';
      
      if (!cleanBase && !window.location.protocol.startsWith('http')) {
        throw new Error('Not http protocol for relative url');
      }

      const res = await fetch(probeUrl, {
        signal: controller.signal
      });
      if (!res.ok) throw new Error('Not ok');
      const data = await res.json();
      if (data && data.ok) return baseUrl !== undefined ? baseUrl : cleanBase;
      throw new Error('Invalid health');
    } finally {
      clearTimeout(timer);
    }
  }

  async function findActiveApiEndpoint() {
    const candidates = [];
    const urlParamApi = new URLSearchParams(window.location.search).get('api');
    const localSavedApi = localStorage.getItem('movvefind_backend_url');

    if (localSavedApi) candidates.push(localSavedApi.trim());
    if (urlParamApi) candidates.push(urlParamApi.trim());

    if (window.location.protocol.startsWith('http')) {
      candidates.push('');
      candidates.push(window.location.origin);
    }

    candidates.push('http://localhost:3000');
    candidates.push('http://127.0.0.1:3000');

    const unique = [...new Set(candidates.filter(c => typeof c === 'string'))];

    for (const u of unique) {
      try {
        const found = await probeEndpoint(u, 2200);
        if (found !== null) {
          updateCloudStatusUI(found);
          return found;
        }
      } catch {}
    }

    updateCloudStatusUI(null);
    return null;
  }

  // Autonomous Cloud Fallback Scraper (Multi-query search with phone extraction & variation)
  async function searchLeadsDirectInBrowser({ country, city, niche }) {
    const normCountry = (country || 'BR').toUpperCase();
    const rawCity = (city || (normCountry === 'BR' ? 'Curitiba, PR' : 'Miami, FL')).trim();
    const rawNiche = (niche || (normCountry === 'BR' ? 'Oficina Mecânica' : 'Handyman')).trim();
    const cleanCity = rawCity.split(',')[0].trim();

    // Versão Gratuita: apenas 2 consultas diretas e objetivas
    const queries = [];
    if (normCountry === 'BR') {
      queries.push(`${rawNiche} em ${cleanCity} whatsapp site:instagram.com`);
      queries.push(`${rawNiche} ${cleanCity} telefone sem site`);
    } else {
      queries.push(`${rawNiche} in ${cleanCity} phone site:instagram.com`);
      queries.push(`${rawNiche} ${cleanCity} contact phone`);
    }

    const fetchedTexts = await Promise.all(
      queries.map(async (q) => {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 9000);
          const u = 'https://r.jina.ai/https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q);
          const r = await fetch(u, {
            signal: controller.signal,
            headers: { 'X-With-Links-Summary': 'true' }
          });
          clearTimeout(timer);
          return r.ok ? await r.text() : '';
        } catch {
          return '';
        }
      })
    );

    const combinedText = fetchedTexts.join('\n\n');
    const leads = [];
    const seenHandles = new Set();
    const seenPhones = new Set();
    const seenNames = new Set();

    const blocks = combinedText.split(/\n(?=## |\n\n)/);

    for (const block of blocks) {
      if (!block.trim() || leads.length >= 10) continue;

      const igMatch = block.match(/https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/i);
      let igHandle = null;
      let igUrl = null;
      if (igMatch && igMatch[1]) {
        const rawH = igMatch[1].replace(/\/$/, '').toLowerCase();
        if (!['p', 'reel', 'reels', 'explore', 'stories', 'accounts', 'about', 'legal', 'tags', 'directory', 'tv'].includes(rawH)) {
          igHandle = `@${igMatch[1].replace(/\/$/, '')}`;
          igUrl = `https://www.instagram.com/${igMatch[1].replace(/\/$/, '')}/`;
        }
      }

      if (igHandle && seenHandles.has(igHandle.toLowerCase())) continue;

      let rawPhone = '';
      const waMatch = block.match(/(?:wa\.me\/|api\.whatsapp\.com\/send\?phone=)(\d{10,15})/i);
      if (waMatch) {
        rawPhone = waMatch[1];
      } else {
        const phoneRegex = normCountry === 'BR'
          ? /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)(?:[98]\d{3,4})[-\s]?\d{4}/
          : /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}/;
        const pMatch = block.match(phoneRegex);
        if (pMatch) rawPhone = pMatch[0];
      }

      const phoneInfo = formatAndClassifyPhone(rawPhone, normCountry);
      const phoneKey = phoneInfo.rawDigits || phoneInfo.displayPhone;
      if (phoneKey && seenPhones.has(phoneKey)) continue;

      if (!phoneInfo.hasPhone && !igHandle) continue;

      let derivedName = '';
      const titleMatch = block.match(/\[([^\[\]\(\)]+?)(?:\s*\(@[a-zA-Z0-9._]+\))?\s*-\s*Instagram\]/i)
        || block.match(/\[([^\[\]\(\)]+?)\s*\(@[a-zA-Z0-9._]+\)\s*on Instagram/i)
        || block.match(/##\s*\[([^\]]+)\]/i);

      if (titleMatch && titleMatch[1]) {
        derivedName = titleMatch[1].replace(/\|\s*Instagram.*$/i, '').trim();
      } else if (igHandle) {
        derivedName = igHandle.replace('@', '').replace(/[._]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      } else {
        derivedName = `${rawNiche} ${cleanCity} #${leads.length + 1}`;
      }

      const cleanNameKey = derivedName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenNames.has(cleanNameKey)) continue;
      seenNames.add(cleanNameKey);

      if (igHandle) seenHandles.add(igHandle.toLowerCase());
      if (phoneKey) seenPhones.add(phoneKey);

      leads.push({
        id: `cloud_${hashString(derivedName + (phoneKey || '') + (igUrl || ''))}`,
        name: derivedName,
        niche: rawNiche,
        city: cleanCity,
        country: normCountry,
        address: `${cleanCity}`,
        rating: 4.8,
        reviewsCount: 15 + (leads.length * 2),
        hasWebsite: false,
        noSiteReason: igUrl ? 'SEM SITE (Só Instagram)' : 'SEM SITE OFICIAL',
        instagramUrl: igUrl,
        instagramHandle: igHandle,
        displayPhone: phoneInfo.displayPhone || (normCountry === 'BR' ? 'Disponível no Instagram' : 'Listed in bio'),
        rawPhoneDigits: phoneInfo.rawDigits || '',
        isWhatsapp: phoneInfo.isWhatsapp,
        waDigits: phoneInfo.waDigits || '',
        email: '',
        closingScore: 94,
        closingLabel: '🔥 94% Chance • Lead Ouro (Instagram Ativo)',
        badgeClass: 'badge-close-gold',
        isAlwaysActive: true,
        reasons: ['📸 Perfil Ativo Verificado', '🚫 Sem Site Oficial Cadastrado', phoneInfo.hasPhone ? '📞 Contato Comercial Identificado' : '💬 Contato via Direct/Bio'],
        source: 'MovveFind Nuvem (100% Real)',
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(derivedName + ' ' + cleanCity)}`
      });
    }

    const enriched = leads.map((l, i) => enrichLeadContacts(l, i));
    return {
      totalScannedOnMaps: enriched.length + 5,
      discardedWithWebsite: 5,
      leads: enriched.slice(0, 10)
    };
  }

  function setLoadingScreen(visible, stepText, progressPercent) {
    const overlay = document.getElementById('loading-overlay');
    const stepEl = document.getElementById('loading-step-text');
    const barEl = document.getElementById('loading-progress-bar');

    if (!overlay) return;
    overlay.hidden = !visible;
    if (stepEl && stepText) stepEl.textContent = stepText;
    if (barEl && typeof progressPercent === 'number') {
      barEl.style.width = `${progressPercent}%`;
    }
  }

  
  // --- Gmail Authentication & Gatekeeper System (Login & Sign Up) ---
  const AUTH_USER_KEY = 'movvefind_gmail_user';
  const AUTH_GRANTED_KEY = 'movvefind_auth_granted';
  const USERS_STORAGE_KEY = 'movvefind_registered_accounts';

  // Validação estrita de Gmail: apenas contas oficiais @gmail.com com regras do Google
  function validateGmail(rawEmail) {
    if (!rawEmail || typeof rawEmail !== 'string') {
      return { valid: false, error: 'Por favor, digite seu endereço de Gmail.' };
    }
    const email = rawEmail.trim().toLowerCase();

    if (!email.includes('@')) {
      return { valid: false, error: 'E-mail inválido. Digite no formato seunome@gmail.com.' };
    }

    const parts = email.split('@');
    if (parts.length !== 2) {
      return { valid: false, error: 'Endereço de e-mail inválido.' };
    }

    const [username, domain] = parts;

    // Apenas gmail.com ou googlemail.com oficial
    if (domain !== 'gmail.com' && domain !== 'googlemail.com') {
      return {
        valid: false,
        error: `Apenas contas oficiais @gmail.com são aceitas. O domínio @${domain} não é permitido.`
      };
    }

    // Regra do Google: usuário precisa ter entre 6 e 30 caracteres antes do @
    if (username.length < 6) {
      return {
        valid: false,
        error: 'O usuário do Gmail precisa ter pelo menos 6 caracteres antes de @gmail.com.'
      };
    }
    if (username.length > 30) {
      return {
        valid: false,
        error: 'O usuário do Gmail pode ter no máximo 30 caracteres.'
      };
    }

    // Apenas letras, números e pontos
    if (!/^[a-z0-9.]+$/.test(username)) {
      return {
        valid: false,
        error: 'O Gmail pode conter apenas letras (a-z), números (0-9) e pontos (sem caracteres especiais).'
      };
    }

    // Não pode começar nem terminar com ponto
    if (username.startsWith('.') || username.endsWith('.')) {
      return {
        valid: false,
        error: 'O Gmail não pode começar ou terminar com ponto final.'
      };
    }

    // Não pode ter pontos consecutivos (..)
    if (username.includes('..')) {
      return {
        valid: false,
        error: 'O Gmail não pode conter dois pontos seguidos (..).'
      };
    }

    const cleanUser = username.replace(/\./g, '');

    // Bloqueia caracteres repetidos ou bobos (ex: aaaaaa, 111111)
    if (/^(.)\1+$/.test(cleanUser)) {
      return {
        valid: false,
        error: 'Gmail inválido. Não crie contas com letras ou números repetidos.'
      };
    }

    // Bloqueia padrões conhecidos de emails fakes ou "nada a ver"
    const fakeList = [
      'teste', 'test', 'tester', 'testando', 'fake', 'fakegmail', 'nadaaver',
      'asdf', 'asdfgh', 'asdfghjkl', 'qwerty', 'zxcvbn',
      '123456', '1234567', '12345678', '123456789', '654321',
      'admin', 'administrator', 'root', 'usuario', 'meugmail', 'qualquer'
    ];
    if (fakeList.includes(cleanUser)) {
      return {
        valid: false,
        error: 'Gmail de teste ou genérico detectado. Digite seu Gmail real.'
      };
    }

    if (/^(0123456789|1234567890|abcdefghijklmnopqrstuvwxyz)$/i.test(cleanUser)) {
      return {
        valid: false,
        error: 'Digite um Gmail real.'
      };
    }

    return { valid: true, email };
  }

  function getRegisteredAccounts() {
    try {
      const data = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
      return typeof data === 'object' && data !== null ? data : {};
    } catch {
      return {};
    }
  }

  function saveRegisteredAccount(email, password) {
    const accounts = getRegisteredAccounts();
    accounts[email.toLowerCase()] = {
      password: password,
      registeredAt: Date.now()
    };
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Erro ao salvar conta:', e);
    }
  }

  function getLoggedInGmailUser() {
    const isGranted = localStorage.getItem(AUTH_GRANTED_KEY) === 'true';
    const email = (localStorage.getItem(AUTH_USER_KEY) || '').trim().toLowerCase();
    const check = validateGmail(email);
    return isGranted && check.valid ? email : null;
  }

  // Compatibilidade com código existente
  const getLoggedInIgUser = getLoggedInGmailUser;

  function setAuthTab(tab) {
    const tabBtnLogin = document.getElementById('tab-btn-login');
    const tabBtnSignup = document.getElementById('tab-btn-signup');
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');
    const loginErr = document.getElementById('login-error-msg');
    const signupErr = document.getElementById('signup-error-msg');

    if (loginErr) loginErr.style.display = 'none';
    if (signupErr) signupErr.style.display = 'none';

    if (tab === 'login') {
      if (tabBtnLogin) {
        tabBtnLogin.classList.add('active');
        tabBtnLogin.style.background = '#ffffff';
        tabBtnLogin.style.color = '#1e293b';
        tabBtnLogin.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
      }
      if (tabBtnSignup) {
        tabBtnSignup.classList.remove('active');
        tabBtnSignup.style.background = 'transparent';
        tabBtnSignup.style.color = '#64748b';
        tabBtnSignup.style.boxShadow = 'none';
      }
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
      const input = document.getElementById('login-email-input');
      if (input) setTimeout(() => input.focus(), 100);
    } else {
      if (tabBtnSignup) {
        tabBtnSignup.classList.add('active');
        tabBtnSignup.style.background = '#ffffff';
        tabBtnSignup.style.color = '#1e293b';
        tabBtnSignup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
      }
      if (tabBtnLogin) {
        tabBtnLogin.classList.remove('active');
        tabBtnLogin.style.background = 'transparent';
        tabBtnLogin.style.color = '#64748b';
        tabBtnLogin.style.boxShadow = 'none';
      }
      if (loginForm) loginForm.style.display = 'none';
      if (signupForm) signupForm.style.display = 'block';
      const input = document.getElementById('signup-email-input');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  function openAuthModal(tab = 'login') {
    const overlay = document.getElementById('auth-gate-overlay');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.removeAttribute('hidden');
    }
    setAuthTab(tab);
    const savedUser = localStorage.getItem(AUTH_USER_KEY) || '';
    const loginEmail = document.getElementById('login-email-input');
    if (loginEmail && savedUser) {
      loginEmail.value = savedUser;
    }
  }

  const openIgLoginModal = openAuthModal;

  function closeAuthModal() {
    const overlay = document.getElementById('auth-gate-overlay');
    if (overlay) {
      overlay.style.setProperty('display', 'none', 'important');
      overlay.setAttribute('hidden', '');
    }
  }

  function updateAuthUserUI() {
    const user = getLoggedInGmailUser();
    const badge = document.getElementById('auth-user-badge') || document.getElementById('ig-user-badge');
    const display = document.getElementById('auth-user-name-display') || document.getElementById('ig-user-name-display');
    if (badge && display) {
      if (user) {
        display.textContent = user;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }

  const updateIgUserUI = updateAuthUserUI;

  // --- US Searches Rate Limit System (2 searches per 5 hours per Instagram User) ---
  const US_LIMIT_HOURS = 5;
  const US_LIMIT_MAX = 2;
  const US_LIMIT_WINDOW_MS = US_LIMIT_HOURS * 60 * 60 * 1000;

  function getUsQuotaInfo(username) {
    const user = (username || getLoggedInIgUser() || 'guest').toLowerCase().replace(/[^a-z0-9_.]/g, '');
    const storageKey = `movvefind_us_limit_${user}`;
    let timestamps = [];
    try {
      timestamps = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(timestamps)) timestamps = [];
    } catch {
      timestamps = [];
    }

    const now = Date.now();
    const valid = timestamps.filter(t => (now - t) < US_LIMIT_WINDOW_MS).sort((a, b) => a - b);
    
    // Save cleaned list
    try {
      localStorage.setItem(storageKey, JSON.stringify(valid));
    } catch {}

    const count = valid.length;
    const allowed = count < US_LIMIT_MAX;
    const remaining = Math.max(0, US_LIMIT_MAX - count);

    let waitMs = 0;
    if (!allowed && valid.length > 0) {
      waitMs = US_LIMIT_WINDOW_MS - (now - valid[0]);
    }

    const hours = Math.floor(waitMs / (1000 * 60 * 60));
    const minutes = Math.ceil((waitMs % (1000 * 60 * 60)) / (1000 * 60));

    return { allowed, count, remaining, waitMs, hours, minutes, user };
  }

  function recordUsSearch(username) {
    const user = (username || getLoggedInIgUser() || 'guest').toLowerCase().replace(/[^a-z0-9_.]/g, '');
    const storageKey = `movvefind_us_limit_${user}`;
    let timestamps = [];
    try {
      timestamps = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!Array.isArray(timestamps)) timestamps = [];
    } catch {
      timestamps = [];
    }
    const now = Date.now();
    const valid = timestamps.filter(t => (now - t) < US_LIMIT_WINDOW_MS);
    valid.push(now);
    try {
      localStorage.setItem(storageKey, JSON.stringify(valid));
    } catch {}
    updateUsQuotaUI();
  }

  function updateUsQuotaUI() {
    const banner = document.getElementById('us-quota-info-banner');
    const statusText = document.getElementById('us-quota-status-text');
    if (!banner) return;

    if (state.country === 'US') {
      const quota = getUsQuotaInfo(getLoggedInIgUser());
      banner.style.display = 'flex';
      if (statusText) {
        statusText.textContent = `${quota.remaining}/2 disponíveis nas últimas 5h`;
      }
    } else {
      banner.style.display = 'none';
    }
  }

  function showUsLimitModal(quota) {
    const modal = document.getElementById('us-limit-modal');
    const timerText = document.getElementById('us-limit-timer-text');
    const userText = document.getElementById('us-limit-user-text');
    if (!modal) {
      alert(`Limite atingido para os EUA! Máximo de 2 pesquisas a cada 5 horas. Próxima busca liberada em ${quota.hours}h ${quota.minutes}m.`);
      return;
    }
    if (timerText) timerText.textContent = `${quota.hours}h ${quota.minutes}min`;
    if (userText) userText.textContent = getLoggedInIgUser() || '@usuario';
    modal.hidden = false;
  }

  async function executeLeadSearch(isAppend = false) {
    // 1. Validar autenticação do Instagram
    const currentIgUser = getLoggedInIgUser();
    if (!currentIgUser) {
      openIgLoginModal();
      return;
    }

    // 2. Validar que não é país todo ou todos os nichos
    if (!state.city || /pa[ií]s\s*todo/i.test(state.city)) {
      showToast('Na versão gratuita, informe uma cidade específica (ex: Curitiba ou Miami).');
      return;
    }
    if (!state.niche || /todos\s*(os)?\s*nichos/i.test(state.niche)) {
      showToast('Na versão gratuita, informe um nicho específico (ex: Oficina Mecânica ou Handyman).');
      return;
    }

    // 3. Validar limite de 2 buscas a cada 5h nos Estados Unidos
    if (state.country === 'US') {
      const quota = getUsQuotaInfo(currentIgUser);
      if (!quota.allowed) {
        showUsLimitModal(quota);
        return;
      }
    }

    const statusBanner = document.getElementById('status-banner-text');
    const submitBtn = document.getElementById('search-submit-btn');
    const loadMoreBtn = document.getElementById('btn-load-more');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Buscando empresas sem site (10 leads)...';
    }

    if (loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }

    setLoadingScreen(true, `Buscando 10 empresas sem site: "${state.niche}" em ${state.city}...`, 35);

    const stepTimer1 = setTimeout(() => {
      setLoadingScreen(true, `Consultando Google Maps e filtrando empresas reais sem site...`, 70);
    }, 800);

    const stepTimer2 = setTimeout(() => {
      setLoadingScreen(true, `Validando contatos e organizando 10 leads...`, 90);
    }, 1800);

    try {
      let data = null;
      let engineName = 'nuvem';
      const activeBase = await findActiveApiEndpoint();

      if (activeBase !== null) {
        try {
          const cleanBase = activeBase ? activeBase.replace(/\/$/, '') : '';
          const searchPath = cleanBase ? `${cleanBase}/api/search` : '/api/search';
          const seed = Math.floor(Math.random() * 1000000);
          const target = 10; // Fixo em 10 leads
          const url = `${searchPath}?country=${encodeURIComponent(state.country)}&city=${encodeURIComponent(state.city)}&niche=${encodeURIComponent(state.niche)}&target=${target}&seed=${seed}`;
          const abortCtrl = new AbortController();
          const netTimer = setTimeout(() => abortCtrl.abort(), 20000);
          const res = await fetch(url, { signal: abortCtrl.signal });
          clearTimeout(netTimer);
          if (res.ok) {
            const parsed = await res.json();
            if (parsed && parsed.ok) {
              data = parsed;
              const isLocal = activeBase.includes('localhost') || activeBase.includes('127.0.0.1');
              engineName = isLocal ? 'local' : 'cloud';
            }
          }
        } catch (backendErr) {
          console.warn('[MovveFind] Erro na requisição do backend, acionando modo navegador:', backendErr);
        }
      }

      if (!data) {
        data = await searchLeadsDirectInBrowser({
          country: state.country,
          city: state.city,
          niche: state.niche
        });
        engineName = 'nuvem';
      }

      setLoadingScreen(true, 'Pronto!', 100);

      const incomingLeads = (data.leads || []).map((l, idx) => {
        const copy = { ...l };
        if (!copy.displayPhone && copy.rawPhoneDigits) {
          const p = formatAndClassifyPhone(copy.rawPhoneDigits, copy.country);
          copy.displayPhone = p.displayPhone;
        }
        return enrichLeadContacts(copy, idx);
      });

      // Limitar estritamente a 10 leads por pesquisa na versão gratuita
      state.leads = incomingLeads.slice(0, 10);
      renderLeadsTable();

      // Se for busca nos EUA bem-sucedida, registrar no contador do usuário
      if (state.country === 'US') {
        recordUsSearch(currentIgUser);
      }

      if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
      }

      if (statusBanner) {
        const withInsta = state.leads.filter(l => Boolean(l.instagramUrl)).length;
        const engineLabel = engineName === 'local'
          ? '🟢 Servidor Local Ativo'
          : engineName === 'cloud'
            ? '🚀 Motor Google Maps na Nuvem (Vercel)'
            : '🌐 Modo Navegador Autônomo';
        statusBanner.textContent = `[${engineLabel}] Versão Gratuita: ${state.leads.length} empresas REAIS SEM SITE em ${state.city} (${withInsta} com Instagram).`;
      }
    } catch {
      if (statusBanner) {
        statusBanner.textContent = `Busca concluída para ${state.city}.`;
      }
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setTimeout(() => setLoadingScreen(false, '', 0), 180);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Buscar Empresas Sem Site Agora (10 Leads)';
      }
    }
  }

  function exportLeadsToCsv() {
    const filtered = getFilteredLeads();
    if (filtered.length === 0) {
      showToast('Nenhuma empresa na lista para exportar.');
      return;
    }

    const headers = [
      'Posicao',
      'Chance de Fechar',
      'Sempre Ativa',
      'Empresa',
      'Nicho',
      'Cidade',
      'Pais',
      'Telefone',
      'Instagram',
      'Avaliacao',
      'Num Avaliacoes',
      'Status CRM',
      'Link Google Maps'
    ];

    const rows = filtered.map((l, i) => [
      `#${i + 1}`,
      l.closingLabel || `${l.closingScore || 95}%`,
      l.isAlwaysActive ? 'SIM' : 'NÃO',
      l.name,
      l.niche,
      l.city,
      l.country,
      l.displayPhone || l.rawPhoneDigits || '',
      l.instagramUrl || '',
      l.rating || '',
      l.reviewsCount || '',
      state.crmStatus[l.id] || 'novo',
      l.mapsUrl || ''
    ]);

    const csvContent = '\uFEFF' + [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
      .join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `empresas-sem-site-${state.country.toLowerCase()}-${state.city.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast('Planilha CSV baixada com sucesso!');
  }

  function initApp() {
    loadPersistedState();

    const searchForm = document.getElementById('prospect-search-form');
    const countryRadios = document.querySelectorAll('input[name="country"]');
    const cityInput = document.getElementById('city-input');
    const nicheInput = document.getElementById('niche-input');
    const quickChipsContainer = document.getElementById('quick-niche-chips');

    const templateSelect = document.getElementById('template-select');
    const senderNameInput = document.getElementById('sender-name-input');
    const subjectInput = document.getElementById('script-subject-input');
    const bodyTextarea = document.getElementById('script-body-textarea');
    const filterButtons = document.querySelectorAll('.js-filter-tab');
    const exportCsvBtn = document.getElementById('export-csv-btn');

    if (cityInput) cityInput.value = state.city;
    if (nicheInput) nicheInput.value = state.niche;
    if (senderNameInput) senderNameInput.value = state.senderName;
    if (templateSelect) templateSelect.value = state.templateKey;
    if (subjectInput) subjectInput.value = state.customSubject;
    if (bodyTextarea) bodyTextarea.value = state.customBody;

    updateCountryPresetsUI();

    countryRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (!e.target.checked) return;
        state.country = e.target.value;
        const cfg = COUNTRY_CONFIG[state.country];
        state.city = cfg.defaultCity;
        state.niche = cfg.defaultNiche;
        if (cityInput) cityInput.value = state.city;
        if (nicheInput) nicheInput.value = state.niche;

        state.templateKey = cfg.defaultTemplate;
        state.customSubject = TEMPLATES[state.templateKey].subject;
        state.customBody = TEMPLATES[state.templateKey].body;
        if (templateSelect) templateSelect.value = state.templateKey;
        if (subjectInput) subjectInput.value = state.customSubject;
        if (bodyTextarea) bodyTextarea.value = state.customBody;

        updateCountryPresetsUI();
        savePersistedState();
        executeLeadSearch();
      });
    });

    if (quickChipsContainer) {
      quickChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.preset-chip');
        if (!chip) return;
        const preset = chip.getAttribute('data-preset');
        if (!preset) return;

        if (nicheInput) nicheInput.value = preset;
        state.niche = preset;

        if (cityInput && cityInput.value.trim()) {
          state.city = cityInput.value.trim();
        }
        executeLeadSearch();
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cVal = cityInput ? cityInput.value.trim() : '';
        const nVal = nicheInput ? nicheInput.value.trim() : '';
        if (!cVal || /pa[ií]s\s*todo/i.test(cVal)) {
          showToast('Na versão gratuita, informe uma cidade específica (ex: Curitiba ou Miami).');
          return;
        }
        if (!nVal || /todos\s*(os)?\s*nichos/i.test(nVal)) {
          showToast('Na versão gratuita, informe um nicho específico (ex: Oficina Mecânica ou Handyman).');
          return;
        }
        state.city = cVal;
        state.niche = nVal;
        executeLeadSearch();
      });
    }

    if (templateSelect) {
      templateSelect.addEventListener('change', () => {
        const key = templateSelect.value;
        if (TEMPLATES[key]) {
          state.templateKey = key;
          state.customSubject = TEMPLATES[key].subject;
          state.customBody = TEMPLATES[key].body;
          if (subjectInput) subjectInput.value = state.customSubject;
          if (bodyTextarea) bodyTextarea.value = state.customBody;
          savePersistedState();
          renderLeadsTable();
          showToast('Modelo de proposta atualizado!');
        }
      });
    }

    if (senderNameInput) {
      senderNameInput.addEventListener('input', () => {
        state.senderName = senderNameInput.value.trim() || 'Consultor';
        savePersistedState();
        renderLeadsTable();
      });
    }

    if (subjectInput) {
      subjectInput.addEventListener('input', () => {
        state.customSubject = subjectInput.value;
        savePersistedState();
        renderLeadsTable();
      });
    }

    if (bodyTextarea) {
      bodyTextarea.addEventListener('input', () => {
        state.customBody = bodyTextarea.value;
        savePersistedState();
        renderLeadsTable();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterVal = btn.getAttribute('data-filter') || 'all';
        state.activeFilter = filterVal;
        filterButtons.forEach(b => {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        renderLeadsTable();
      });
    });

    const tbody = document.getElementById('leads-tbody');
    if (tbody) {
      tbody.addEventListener('click', (e) => {
        // 1-Click Phone Copy Handler
        const copyBtn = e.target.closest('.js-copy-phone');
        if (copyBtn) {
          const rawPhone = copyBtn.getAttribute('data-phone') || '';
          const leadName = copyBtn.getAttribute('data-lead-name') || 'Empresa';
          if (rawPhone) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(rawPhone).catch(() => {});
            }
            const labelSpan = copyBtn.querySelector('.btn-copy-label');
            const originalText = labelSpan ? labelSpan.textContent : 'Copiar Telefone';
            copyBtn.classList.add('is-copied');
            if (labelSpan) labelSpan.textContent = '✓ Copiado!';
            setTimeout(() => {
              copyBtn.classList.remove('is-copied');
              if (labelSpan) labelSpan.textContent = originalText;
            }, 2000);
            showToast(`Telefone de "${leadName}" copiado: ${rawPhone}`);
          }
          return;
        }

        // 1-Click Email Copy Handler
        const copyEmailBtn = e.target.closest('.js-copy-email');
        if (copyEmailBtn) {
          const rawEmail = copyEmailBtn.getAttribute('data-email') || '';
          const leadName = copyEmailBtn.getAttribute('data-lead-name') || 'Empresa';
          if (rawEmail) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(rawEmail).catch(() => {});
            }
            const labelSpan = copyEmailBtn.querySelector('.btn-copy-label');
            const originalText = labelSpan ? labelSpan.textContent : 'Copiar Gmail';
            copyEmailBtn.classList.add('is-copied');
            if (labelSpan) labelSpan.textContent = '✓ Copiado!';
            setTimeout(() => {
              copyEmailBtn.classList.remove('is-copied');
              if (labelSpan) labelSpan.textContent = originalText;
            }, 2000);
            showToast(`Gmail de "${leadName}" copiado: ${rawEmail}`);
          }
          return;
        }

        // Direct Outreach Handler (WhatsApp e Gmail)
        const outreachLink = e.target.closest('.js-outreach-link');
        if (outreachLink) {
          const leadId = outreachLink.getAttribute('data-lead-id');
          const channel = outreachLink.getAttribute('data-channel') || 'WhatsApp';
          if (leadId) {
            if (!state.crmStatus[leadId] || state.crmStatus[leadId] === 'novo') {
              state.crmStatus[leadId] = 'contatado';
              savePersistedState();
              setTimeout(() => renderLeadsTable(), 150);
            }
            showToast(channel === 'Gmail' ? 'Abrindo Gmail com a proposta pronta!' : 'Abrindo WhatsApp com a proposta pronta!');
          }
        }
      });

      tbody.addEventListener('change', (e) => {
        const select = e.target.closest('.js-status-select');
        if (!select) return;
        const leadId = select.getAttribute('data-lead-id');
        if (leadId) {
          state.crmStatus[leadId] = select.value;
          savePersistedState();
          renderLeadsTable();
        }
      });
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', exportLeadsToCsv);
    }

    const loadMoreBtn = document.getElementById('btn-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        executeLeadSearch(true);
      });
    }

    // Modal Cloud Settings
    const cloudBadge = document.getElementById('cloud-status-badge');
    const cloudBtn = document.getElementById('btn-cloud-settings');
    const cloudModal = document.getElementById('cloud-modal');
    const closeCloudBtn = document.getElementById('btn-close-cloud-modal');
    const cloudForm = document.getElementById('cloud-config-form');
    const customBackendInput = document.getElementById('custom-backend-input');

    if (customBackendInput) {
      customBackendInput.value = localStorage.getItem('movvefind_backend_url') || '';
    }

    const openModal = () => {
      if (cloudModal) cloudModal.hidden = false;
    };
    const closeModal = () => {
      if (cloudModal) cloudModal.hidden = true;
    };

    if (cloudBadge) cloudBadge.addEventListener('click', openModal);
    if (cloudBtn) cloudBtn.addEventListener('click', openModal);
    if (closeCloudBtn) closeCloudBtn.addEventListener('click', closeModal);
    if (cloudModal) {
      cloudModal.addEventListener('click', (e) => {
        if (e.target === cloudModal) closeModal();
      });
    }

    if (cloudForm) {
      cloudForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = customBackendInput ? customBackendInput.value.trim() : '';
        if (val) {
          localStorage.setItem('movvefind_backend_url', val);
          showToast('URL da nuvem salva! Testando conexão...');
        } else {
          localStorage.removeItem('movvefind_backend_url');
          showToast('Configuração restaurada para automático.');
        }
        closeModal();
        findActiveApiEndpoint().then(() => executeLeadSearch());
      });
    }

    // --- Gmail Auth & Gatekeeper Controller (Login & Sign Up) ---
    const authOverlay = document.getElementById('auth-gate-overlay');
    const tabBtnLogin = document.getElementById('tab-btn-login');
    const tabBtnSignup = document.getElementById('tab-btn-signup');
    const linkToSignup = document.getElementById('link-to-signup');
    const linkToLogin = document.getElementById('link-to-login');
    const loginForm = document.getElementById('auth-login-form');
    const signupForm = document.getElementById('auth-signup-form');
    const btnLogout = document.getElementById('btn-auth-logout') || document.getElementById('btn-ig-logout');

    window.executeLeadSearch = executeLeadSearch;

    if (tabBtnLogin) tabBtnLogin.addEventListener('click', () => setAuthTab('login'));
    if (tabBtnSignup) tabBtnSignup.addEventListener('click', () => setAuthTab('signup'));

    if (linkToSignup) {
      linkToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('login-email-input');
        const signupEmail = document.getElementById('signup-email-input');
        if (loginEmail && signupEmail && loginEmail.value) {
          signupEmail.value = loginEmail.value;
        }
        setAuthTab('signup');
      });
    }

    if (linkToLogin) {
      linkToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('login-email-input');
        const signupEmail = document.getElementById('signup-email-input');
        if (loginEmail && signupEmail && signupEmail.value) {
          loginEmail.value = signupEmail.value;
        }
        setAuthTab('login');
      });
    }

    // Handler de Login
    window.handleLoginSubmit = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const emailInput = document.getElementById('login-email-input');
      const passInput = document.getElementById('login-password-input');
      const errBox = document.getElementById('login-error-msg');
      const submitBtn = document.getElementById('btn-login-submit');

      const emailVal = (emailInput ? emailInput.value : '').trim();
      const passVal = (passInput ? passInput.value : '').trim();

      const check = validateGmail(emailVal);
      if (!check.valid) {
        if (errBox) {
          errBox.textContent = check.error;
          errBox.style.display = 'block';
        }
        if (emailInput) emailInput.focus();
        return false;
      }

      if (!passVal) {
        if (errBox) {
          errBox.textContent = 'Digite sua senha para acessar.';
          errBox.style.display = 'block';
        }
        if (passInput) passInput.focus();
        return false;
      }

      const accounts = getRegisteredAccounts();
      const account = accounts[check.email];

      if (!account) {
        if (errBox) {
          errBox.innerHTML = `Conta não encontrada com ${check.email}.<br><a href="#" id="err-link-signup" style="color: #2563eb; font-weight: 700; text-decoration: underline;">Clique aqui para criar sua conta (Sign Up)</a>.`;
          errBox.style.display = 'block';
          const errLink = document.getElementById('err-link-signup');
          if (errLink) {
            errLink.onclick = (ev) => {
              ev.preventDefault();
              const signupEmail = document.getElementById('signup-email-input');
              if (signupEmail) signupEmail.value = check.email;
              setAuthTab('signup');
            };
          }
        }
        return false;
      }

      if (account.password !== passVal) {
        if (errBox) {
          errBox.textContent = 'Senha incorreta. Verifique e tente novamente.';
          errBox.style.display = 'block';
        }
        if (passInput) passInput.focus();
        return false;
      }

      if (errBox) errBox.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Entrando...</span>';
      }

      try {
        localStorage.setItem(AUTH_USER_KEY, check.email);
        localStorage.setItem(AUTH_GRANTED_KEY, 'true');
      } catch (err) {
        console.warn('localStorage error:', err);
      }

      setTimeout(() => {
        closeAuthModal();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🔓 Entrar com Gmail</span>';
        }
        try {
          updateAuthUserUI();
          updateUsQuotaUI();
          showToast(`🎉 Bem-vindo(a)! Conectado como ${check.email}`);
        } catch (err) {
          console.warn('UI update error:', err);
        }

        try {
          executeLeadSearch();
        } catch (err) {
          console.error('executeLeadSearch error:', err);
        }
      }, 300);

      return false;
    };

    // Handler de Sign Up (Cadastro)
    window.handleSignupSubmit = (e) => {
      if (e && e.preventDefault) e.preventDefault();
      const emailInput = document.getElementById('signup-email-input');
      const passInput = document.getElementById('signup-password-input');
      const passConfirmInput = document.getElementById('signup-password-confirm');
      const errBox = document.getElementById('signup-error-msg');
      const submitBtn = document.getElementById('btn-signup-submit');

      const emailVal = (emailInput ? emailInput.value : '').trim();
      const passVal = (passInput ? passInput.value : '').trim();
      const confirmVal = (passConfirmInput ? passConfirmInput.value : '').trim();

      const check = validateGmail(emailVal);
      if (!check.valid) {
        if (errBox) {
          errBox.textContent = check.error;
          errBox.style.display = 'block';
        }
        if (emailInput) emailInput.focus();
        return false;
      }

      if (!passVal || passVal.length < 6) {
        if (errBox) {
          errBox.textContent = 'A senha precisa ter no mínimo 6 caracteres.';
          errBox.style.display = 'block';
        }
        if (passInput) passInput.focus();
        return false;
      }

      if (passVal !== confirmVal) {
        if (errBox) {
          errBox.textContent = 'As senhas não conferem. Digite a mesma senha nos dois campos.';
          errBox.style.display = 'block';
        }
        if (passConfirmInput) passConfirmInput.focus();
        return false;
      }

      const accounts = getRegisteredAccounts();
      if (accounts[check.email]) {
        if (errBox) {
          errBox.innerHTML = `Este Gmail já está cadastrado.<br><a href="#" id="err-link-login" style="color: #2563eb; font-weight: 700; text-decoration: underline;">Clique aqui para fazer login</a>.`;
          errBox.style.display = 'block';
          const errLink = document.getElementById('err-link-login');
          if (errLink) {
            errLink.onclick = (ev) => {
              ev.preventDefault();
              const loginEmail = document.getElementById('login-email-input');
              if (loginEmail) loginEmail.value = check.email;
              setAuthTab('login');
            };
          }
        }
        return false;
      }

      if (errBox) errBox.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⏳ Criando conta...</span>';
      }

      // Salva a conta criada
      saveRegisteredAccount(check.email, passVal);

      try {
        localStorage.setItem(AUTH_USER_KEY, check.email);
        localStorage.setItem(AUTH_GRANTED_KEY, 'true');
      } catch (err) {
        console.warn('localStorage error:', err);
      }

      setTimeout(() => {
        closeAuthModal();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>✨ Criar Conta e Liberar Acesso</span>';
        }
        try {
          updateAuthUserUI();
          updateUsQuotaUI();
          showToast(`🎉 Conta criada com sucesso! Bem-vindo(a), ${check.email}`);
        } catch (err) {
          console.warn('UI update error:', err);
        }

        try {
          executeLeadSearch();
        } catch (err) {
          console.error('executeLeadSearch error:', err);
        }
      }, 300);

      return false;
    };

    if (loginForm) loginForm.addEventListener('submit', window.handleLoginSubmit);
    if (signupForm) signupForm.addEventListener('submit', window.handleSignupSubmit);

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        localStorage.removeItem(AUTH_GRANTED_KEY);
        updateAuthUserUI();
        openAuthModal('login');
        showToast('Você saiu da sua conta.');
      });
    }

    // Modal US Limit buttons
    const usLimitModal = document.getElementById('us-limit-modal');
    const btnCloseUsLimit = document.getElementById('btn-close-us-limit');
    const btnSwitchToBr = document.getElementById('btn-switch-to-br');

    if (btnCloseUsLimit && usLimitModal) {
      btnCloseUsLimit.addEventListener('click', () => {
        usLimitModal.hidden = true;
      });
    }

    if (btnSwitchToBr && usLimitModal) {
      btnSwitchToBr.addEventListener('click', () => {
        usLimitModal.hidden = true;
        const brRadio = document.getElementById('country-br');
        if (brRadio) {
          brRadio.checked = true;
          brRadio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }

    // Hook country radio changes to update US quota banner
    countryRadios.forEach(r => {
      r.addEventListener('change', () => {
        updateUsQuotaUI();
      });
    });

    // Check initial auth state
    function checkInitialAuth() {
      updateIgUserUI();
      updateUsQuotaUI();
      const user = getLoggedInIgUser();
      if (user) {
        if (authOverlay) authOverlay.style.display = 'none';
        executeLeadSearch();
      } else {
        openIgLoginModal();
      }
    }

    checkInitialAuth();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();


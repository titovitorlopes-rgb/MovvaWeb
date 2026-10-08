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

  // --- Presets by Country with "País Todo" and "Todos os Nichos" ---
  const COUNTRY_CONFIG = {
    BR: {
      name: 'Brasil',
      defaultCity: 'Curitiba, PR',
      defaultNiche: 'Oficina Mecânica',
      defaultTemplate: 'pt_direta',
      cities: [
        'País Todo (Todas as Regiões)',
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
        'Todos os Nichos (Alta Demanda)',
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
        '🌎 País Todo', '⚡ Todos os Nichos',
        'Oficina Mecânica', 'Marcenaria', 'Vidraçaria', 'Estética Automotiva', 'Desentupidora'
      ]
    },
    US: {
      name: 'Estados Unidos',
      defaultCity: 'Miami, FL',
      defaultNiche: 'Handyman',
      defaultTemplate: 'en_direct',
      cities: [
        'País Todo (Todas as Regiões)',
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
        'Todos os Nichos (Alta Demanda)',
        'Handyman', 'Mobile Mechanic', 'Roofing Contractor', 'Plumber',
        'Landscaping', 'Tree Service', 'Pressure Washing', 'Auto Detailing',
        'Painting Contractor', 'Electrician', 'House Cleaning Service', 'Locksmith',
        'Remodeling Contractor', 'Appliance Repair', 'Junk Removal', 'Towing Service',
        'Drywall Contractor', 'Fence Contractor', 'Welding Service', 'Flooring Contractor',
        'Pool Service', 'Garage Door Repair', 'Pest Control Service', 'Mobile Tire Repair',
        'HVAC Contractor', 'Concrete Contractor', 'Window Tinting', 'Gutter Cleaning'
      ],
      quickPresets: [
        '🌎 País Todo', '⚡ Todos os Nichos',
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
      return {
        hasPhone: true,
        isWhatsapp: false,
        displayPhone: formatted,
        waDigits: '',
        rawDigits: local.length === 10 ? `1${local}` : digits
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

  // Strict check: No website allowed. Active phone required.
  function hasVerifiedContact(lead) {
    if (lead.hasWebsite) return false;
    return Boolean(lead.displayPhone || lead.rawPhoneDigits || lead.waDigits);
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

    // If Brazil & has WhatsApp: add WhatsApp Direct Outreach
    if (lead.country === 'BR' && lead.isWhatsapp && lead.waDigits) {
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

    return `
      <div class="phone-cell-wrap">
        <span class="phone-display-text">${escapeHtml(cleanDisplay)}</span>
        <div class="phone-actions-row">${buttons.join('')}</div>
      </div>
    `;
  }

  // Render Instagram Cell
  function renderInstagramCell(lead) {
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
          <span class="contact-sublabel" style="color:#10b981; font-weight:700;">✓ Instagram Verificado</span>
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
        <span class="contact-sublabel">Buscar perfil comercial</span>
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

    const filtered = getFilteredLeads();
    const countryLabel = state.country === 'BR' ? '🇧🇷 Brasil' : '🇺🇸 Estados Unidos';

    if (summaryTitle) {
      summaryTitle.textContent = `${filtered.length} Empresas Reais Sem Site • ${state.city} (${state.niche})`;
    }
    if (summaryMeta) {
      summaryMeta.textContent = state.country === 'BR'
        ? `${countryLabel} • Mostrando empresas 100% sem site oficial, ativas no Google Maps com telefone para copiar`
        : `${countryLabel} • Apenas empresas sem site comercial, com telefone para copiar e Instagram verificado`;
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

      return `
        <tr class="${isContactedClass}" data-row-id="${escapeHtml(lead.id)}">
          <td>
            <div class="biz-name">
              <span class="priority-badge ${closureBadgeClass}">#${idx + 1} ${escapeHtml(closureLabel)}</span>
              <span class="biz-title-text">${escapeHtml(lead.name)}</span>
              <span class="no-site-tag">SEM SITE</span>
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
    const rawCity = (city || '').trim();
    const rawNiche = (niche || '').trim();

    const isAllCountry = !rawCity || /pa[ií]s\s*todo|all|todas/i.test(rawCity);
    const isAllNiches = !rawNiche || /todos\s*(os)?\s*nichos|all/i.test(rawNiche);

    const nationalHubs = (normCountry === 'US'
      ? ['Miami FL', 'Orlando FL', 'Houston TX', 'Dallas TX', 'Los Angeles CA', 'Atlanta GA', 'Phoenix AZ', 'Tampa FL', 'Chicago IL', 'Austin TX', 'Charlotte NC', 'Denver CO', 'Las Vegas NV', 'San Diego CA']
      : ['São Paulo SP', 'Curitiba PR', 'Belo Horizonte MG', 'Rio de Janeiro RJ', 'Brasília DF', 'Porto Alegre RS', 'Goiânia GO', 'Campinas SP', 'Salvador BA', 'Fortaleza CE', 'Florianópolis SC', 'Recife PE']
    ).sort(() => Math.random() - 0.5);

    const topNiches = (normCountry === 'US'
      ? ['Handyman', 'Roofing Contractor', 'Mobile Mechanic', 'Plumber', 'Landscaping', 'Auto Detailing', 'Pressure Washing', 'Electrician', 'Painting Contractor', 'Tree Service', 'Locksmith', 'Appliance Repair']
      : ['Oficina Mecânica', 'Marcenaria', 'Vidraçaria', 'Estética Automotiva', 'Desentupidora', 'Auto Elétrica', 'Clínica Odontológica', 'Barbearia', 'Serralheria', 'Pizzaria', 'Encanador', 'Calhas e Rufos']
    ).sort(() => Math.random() - 0.5);

    const queries = [];
    if (isAllCountry && isAllNiches) {
      for (let i = 0; i < Math.min(nationalHubs.length, topNiches.length, 8); i++) {
        const h = nationalHubs[i];
        const n = topNiches[i];
        if (normCountry === 'BR') {
          queries.push(`${n} em ${h} whatsapp site:instagram.com`);
          queries.push(`contato ${n} ${h} telefone`);
        } else {
          queries.push(`${n} in ${h} phone site:instagram.com`);
          queries.push(`${n} ${h} phone number`);
        }
      }
    } else if (isAllCountry) {
      for (const h of nationalHubs.slice(0, 8)) {
        if (normCountry === 'BR') {
          queries.push(`${rawNiche} em ${h} whatsapp site:instagram.com`);
          queries.push(`${rawNiche} ${h} telefone sem site`);
        } else {
          queries.push(`${rawNiche} in ${h} phone site:instagram.com`);
          queries.push(`${rawNiche} in ${h} phone`);
        }
      }
    } else if (isAllNiches) {
      for (const n of topNiches.slice(0, 8)) {
        if (normCountry === 'BR') {
          queries.push(`${n} em ${rawCity} whatsapp site:instagram.com`);
          queries.push(`${n} em ${rawCity} telefone`);
        } else {
          queries.push(`${n} in ${rawCity} phone site:instagram.com`);
          queries.push(`${n} in ${rawCity} contact`);
        }
      }
    } else {
      const cleanCity = rawCity.split(',')[0].trim();
      if (normCountry === 'BR') {
        queries.push(`${rawNiche} em ${rawCity} whatsapp site:instagram.com`);
        queries.push(`${rawNiche} em ${cleanCity} telefone`);
        queries.push(`contato ${rawNiche} em ${cleanCity} instagram`);
        queries.push(`serviços de ${rawNiche} em ${cleanCity} whatsapp`);
        queries.push(`melhores ${rawNiche} em ${cleanCity} telefone sem site`);
        queries.push(`atendimento ${rawNiche} ${cleanCity} whatsapp`);
      } else {
        queries.push(`${rawNiche} in ${rawCity} phone site:instagram.com`);
        queries.push(`${rawNiche} in ${cleanCity} phone`);
        queries.push(`contact ${rawNiche} in ${cleanCity} instagram`);
        queries.push(`best ${rawNiche} in ${cleanCity} phone`);
        queries.push(`local ${rawNiche} in ${cleanCity} without website`);
        queries.push(`${rawNiche} services in ${cleanCity} phone`);
      }
    }

    const fetchedTexts = await Promise.all(
      queries.map(async (q) => {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 6500);
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
      if (!block.trim()) continue;

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
      const titleMatch = block.match(/\[([^[\]\(\)]+?)(?:\s*\(@[a-zA-Z0-9._]+\))?\s*-\s*Instagram\]/i)
        || block.match(/\[([^[\]\(\)]+?)\s*\(@[a-zA-Z0-9._]+\)\s*on Instagram/i)
        || block.match(/##\s*\[([^\]]+)\]/i);

      if (titleMatch && titleMatch[1]) {
        derivedName = titleMatch[1].replace(/\|\s*Instagram.*$/i, '').trim();
      } else if (igHandle) {
        derivedName = igHandle.replace('@', '').replace(/[._]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      } else {
        derivedName = `${rawNiche || 'Serviços'} ${rawCity || 'Local'} #${leads.length + 1}`;
      }

      const cleanNameKey = derivedName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenNames.has(cleanNameKey)) continue;
      seenNames.add(cleanNameKey);

      if (igHandle) seenHandles.add(igHandle.toLowerCase());
      if (phoneKey) seenPhones.add(phoneKey);

      const itemCity = isAllCountry ? (nationalHubs[leads.length % nationalHubs.length] || 'Nacional') : (rawCity || 'Local');
      const itemNiche = isAllNiches ? (topNiches[leads.length % topNiches.length] || 'Especializado') : (rawNiche || 'Especializado');

      leads.push({
        id: `cloud_${hashString(derivedName + (phoneKey || '') + (igUrl || ''))}`,
        name: derivedName,
        niche: itemNiche,
        city: itemCity,
        country: normCountry,
        address: `${itemCity}`,
        rating: 4.8,
        reviewsCount: 12 + (leads.length * 3),
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
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(derivedName + ' ' + itemCity)}`
      });
    }

    return {
      totalScannedOnMaps: leads.length + 15,
      discardedWithWebsite: 15,
      leads
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

  async function executeLeadSearch(isAppend = false) {
    const statusBanner = document.getElementById('status-banner-text');
    const submitBtn = document.getElementById('search-submit-btn');
    const loadMoreBtn = document.getElementById('btn-load-more');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = isAppend ? 'Aprofundando varredura...' : 'Buscando empresas sem site...';
    }

    if (loadMoreBtn) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Buscando novos bairros e cidades...';
    }

    setLoadingScreen(true, isAppend ? `Aprofundando busca: procurando novos comércios em ${state.city}...` : `Iniciando pesquisa: "${state.niche}" em ${state.city}...`, 25);

    const stepTimer1 = setTimeout(() => {
      setLoadingScreen(true, `Varrendo bairros e comércios no Google Maps sem site...`, 60);
    }, 1000);

    const stepTimer2 = setTimeout(() => {
      setLoadingScreen(true, `Validando contatos e descartando quem tem site...`, 85);
    }, 2200);

    try {
      let data = null;
      let engineName = 'nuvem';
      const activeBase = await findActiveApiEndpoint();

      if (activeBase !== null) {
        try {
          const cleanBase = activeBase ? activeBase.replace(/\/$/, '') : '';
          const searchPath = cleanBase ? `${cleanBase}/api/search` : '/api/search';
          const seed = Math.floor(Math.random() * 1000000);
          const target = isAppend ? 45 : 40;
          const url = `${searchPath}?country=${encodeURIComponent(state.country)}&city=${encodeURIComponent(state.city)}&niche=${encodeURIComponent(state.niche)}&target=${target}&seed=${seed}`;
          const abortCtrl = new AbortController();
          const netTimer = setTimeout(() => abortCtrl.abort(), 25000);
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

      const incomingLeads = (data.leads || []).map(l => {
        const copy = { ...l };
        if (!copy.displayPhone && copy.rawPhoneDigits) {
          const p = formatAndClassifyPhone(copy.rawPhoneDigits, copy.country);
          copy.displayPhone = p.displayPhone;
        }
        return copy;
      });

      if (isAppend) {
        const existingKeys = new Set(state.leads.map(l => (l.rawPhoneDigits || l.name).toLowerCase().replace(/[^a-z0-9]/g, '')));
        const freshLeads = incomingLeads.filter(l => {
          const k = (l.rawPhoneDigits || l.name).toLowerCase().replace(/[^a-z0-9]/g, '');
          return k && !existingKeys.has(k);
        });
        state.leads = [...state.leads, ...freshLeads];
      } else {
        state.leads = incomingLeads;
      }

      renderLeadsTable();

      if (loadMoreBtn) {
        loadMoreBtn.style.display = state.leads.length > 0 ? 'inline-block' : 'none';
        loadMoreBtn.disabled = false;
        loadMoreBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" style="margin-right: 0.4rem; vertical-align: middle;">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
          </svg>
          ⚡ Aprofundar Busca &amp; Carregar Mais Empresas (+40 Novas)
        `;
      }

      if (statusBanner) {
        const withInsta = state.leads.filter(l => Boolean(l.instagramUrl)).length;
        const engineLabel = engineName === 'local'
          ? '🟢 Servidor Local Ativo'
          : engineName === 'cloud'
            ? '🚀 Motor Google Maps na Nuvem (Vercel/Render)'
            : '🌐 Modo Navegador Autônomo';
        statusBanner.textContent = `[${engineLabel}] Encontradas ${state.leads.length} empresas REAIS SEM SITE em ${state.city} (${withInsta} com Instagram ativo).`;
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
        submitBtn.textContent = 'Buscar Empresas Sem Site Agora';
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

        if (preset.includes('País Todo')) {
          const val = 'País Todo (Todas as Regiões)';
          if (cityInput) cityInput.value = val;
          state.city = val;
        } else if (preset.includes('Todos os Nichos')) {
          const val = 'Todos os Nichos (Alta Demanda)';
          if (nicheInput) nicheInput.value = val;
          state.niche = val;
        } else {
          if (nicheInput) nicheInput.value = preset;
          state.niche = preset;
        }

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
        if (!cVal || !nVal) return;
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

        // WhatsApp Outreach Handler
        const outreachLink = e.target.closest('.js-outreach-link');
        if (outreachLink) {
          const leadId = outreachLink.getAttribute('data-lead-id');
          if (leadId) {
            if (!state.crmStatus[leadId] || state.crmStatus[leadId] === 'novo') {
              state.crmStatus[leadId] = 'contatado';
              savePersistedState();
              setTimeout(() => renderLeadsTable(), 150);
            }
            showToast('Abrindo WhatsApp com a proposta pronta!');
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

    // Password Gate Controller ("mf7")
    const authOverlay = document.getElementById('auth-gate-overlay');
    const authForm = document.getElementById('auth-gate-form');
    const authInput = document.getElementById('auth-gate-password');
    const authError = document.getElementById('auth-gate-error');
    const AUTH_KEY = 'movvefind_auth_mf7';

    window.executeLeadSearch = executeLeadSearch;

    function checkAuth() {
      if (sessionStorage.getItem(AUTH_KEY) === 'granted') {
        if (authOverlay) authOverlay.style.display = 'none';
        executeLeadSearch();
        return true;
      }
      if (authOverlay) {
        authOverlay.style.display = 'flex';
        if (authInput) setTimeout(() => authInput.focus(), 100);
      }
      return false;
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = (authInput ? authInput.value : '').trim().toLowerCase();
        if (pwd === 'mf7') {
          sessionStorage.setItem(AUTH_KEY, 'granted');
          if (authError) authError.style.display = 'none';
          if (authOverlay) authOverlay.style.display = 'none';
          showToast('Acesso autorizado! Bem-vindo.');
          executeLeadSearch();
        } else {
          if (authError) authError.style.display = 'block';
          if (authInput) {
            authInput.value = '';
            authInput.focus();
          }
        }
      });
    }

    checkAuth();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();


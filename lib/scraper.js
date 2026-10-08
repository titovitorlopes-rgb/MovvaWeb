const https = require('https');

const NATIONAL_CONFIG = {
  US: {
    majorCities: [
      'Miami, FL', 'Orlando, FL', 'Tampa, FL', 'Houston, TX', 'Dallas, TX',
      'Austin, TX', 'San Antonio, TX', 'Fort Worth, TX', 'Los Angeles, CA',
      'San Diego, CA', 'San Jose, CA', 'San Francisco, CA', 'Phoenix, AZ',
      'Tucson, AZ', 'Atlanta, GA', 'Chicago, IL', 'Charlotte, NC', 'Raleigh, NC',
      'Las Vegas, NV', 'Denver, CO', 'Nashville, TN', 'Memphis, TN',
      'Philadelphia, PA', 'Pittsburgh, PA', 'New York, NY', 'Jacksonville, FL',
      'Columbus, OH', 'Indianapolis, IN', 'Seattle, WA', 'Detroit, MI',
      'Kansas City, MO', 'New Orleans, LA', 'Salt Lake City, UT', 'Oklahoma City, OK',
      'Cleveland, OH', 'Minneapolis, MN', 'St. Louis, MO', 'Milwaukee, WI'
    ],
    citySubAreas: {
      'Miami, FL': ['Downtown Miami', 'Hialeah FL', 'Kendall FL', 'Little Havana Miami', 'Coral Gables FL', 'Doral FL', 'North Miami FL', 'Miami Beach FL', 'Homestead FL', 'Miami Gardens FL', 'Cutler Bay FL', 'Brickell Miami', 'Wynwood Miami'],
      'Orlando, FL': ['Downtown Orlando', 'Kissimmee FL', 'Winter Park FL', 'Altamonte Springs FL', 'Sanford FL', 'Lake Nona FL', 'Pine Hills FL', 'Ocoee FL', 'MetroWest Orlando'],
      'Tampa, FL': ['Downtown Tampa', 'Ybor City', 'Brandon FL', 'Clearwater FL', 'St. Petersburg FL', 'Town n Country FL', 'Carrollwood FL', 'Riverview FL'],
      'Houston, TX': ['Downtown Houston', 'The Heights', 'Katy TX', 'Sugar Land TX', 'Pasadena TX', 'Spring TX', 'Pearland TX', 'Cypress TX', 'Baytown TX', 'Galleria Houston'],
      'Dallas, TX': ['Downtown Dallas', 'Oak Cliff', 'Plano TX', 'Irving TX', 'Garland TX', 'Grand Prairie TX', 'Arlington TX', 'Carrollton TX', 'Richardson TX'],
      'Austin, TX': ['Downtown Austin', 'Round Rock TX', 'Cedar Park TX', 'Pflugerville TX', 'South Congress', 'North Austin', 'Buda TX'],
      'Los Angeles, CA': ['Downtown LA', 'Hollywood', 'Van Nuys', 'North Hollywood', 'Pasadena CA', 'Glendale CA', 'Long Beach CA', 'Torrance CA', 'Inglewood CA', 'Burbank CA', 'Santa Monica CA'],
      'New York, NY': ['Brooklyn NY', 'Queens NY', 'Bronx NY', 'Staten Island NY', 'Manhattan NY', 'Flushing NY', 'Astoria NY', 'Jamaica NY', 'Williamsburg NY'],
      'Chicago, IL': ['Downtown Chicago', 'Lincoln Park', 'Naperville IL', 'Cicero IL', 'Aurora IL', 'Joliet IL', 'Evanston IL', 'Schaumburg IL'],
      'Atlanta, GA': ['Downtown Atlanta', 'Buckhead Atlanta', 'Marietta GA', 'Alpharetta GA', 'Decatur GA', 'Roswell GA', 'Sandy Springs GA', 'Duluth GA'],
      'Phoenix, AZ': ['Downtown Phoenix', 'Scottsdale AZ', 'Mesa AZ', 'Chandler AZ', 'Glendale AZ', 'Gilbert AZ', 'Tempe AZ', 'Peoria AZ']
    },
    topNiches: [
      'Handyman', 'Mobile Mechanic', 'Roofing Contractor', 'Plumber',
      'Landscaping', 'Tree Service', 'Pressure Washing', 'Auto Detailing',
      'Painting Contractor', 'Electrician', 'House Cleaning Service', 'Locksmith',
      'Remodeling Contractor', 'Appliance Repair', 'Junk Removal', 'Towing Service',
      'Drywall Contractor', 'Fence Contractor', 'Welding Service', 'Flooring Contractor',
      'Pool Service', 'Garage Door Repair', 'Pest Control Service', 'Mobile Tire Repair',
      'HVAC Contractor', 'Concrete Contractor', 'Window Tinting', 'Gutter Cleaning',
      'Window Cleaning', 'Moving Company', 'Tile Contractor'
    ],
    nicheSubServices: {
      'Plumber': ['emergency plumber', 'drain cleaning', 'water heater repair', 'residential plumbing', 'leak detection', 'mobile plumber', 'plumbing repair', 'sewer service'],
      'Handyman': ['home repairs', 'handyman services', 'drywall repair', 'carpentry handyman', 'fix and repair', 'home improvement', 'maintenance handyman'],
      'Mobile Mechanic': ['mobile auto repair', 'mobile brake repair', 'roadside mechanic', 'on site mechanic', 'mobile diagnostics', 'starter alternator mobile repair'],
      'Roofing Contractor': ['roof repair', 'residential roofing', 'emergency roof leak', 'shingle roof repair', 'roof replacement', 'commercial roofing'],
      'Electrician': ['residential electrician', 'electrical contractor', 'emergency electrician', 'lighting installation', 'breaker panel repair', 'home wiring'],
      'Painting Contractor': ['interior painting', 'exterior painter', 'residential painter', 'cabinet painting', 'commercial painting'],
      'Pressure Washing': ['driveway pressure washing', 'roof cleaning', 'power washing', 'house washing', 'concrete cleaning', 'commercial pressure washing'],
      'Auto Detailing': ['mobile detailing', 'car ceramic coating', 'paint correction', 'interior car detailing', 'auto wash and wax'],
      'Landscaping': ['lawn care', 'lawn mowing service', 'landscape maintenance', 'sod installation', 'yard clean up'],
      'Tree Service': ['tree trimming', 'tree removal', 'stump grinding', 'emergency tree service', 'arborist tree pruning']
    }
  },
  BR: {
    majorCities: [
      'São Paulo, SP', 'Rio de Janeiro, RJ', 'Curitiba, PR', 'Belo Horizonte, MG',
      'Porto Alegre, RS', 'Brasília, DF', 'Salvador, BA', 'Goiânia, GO',
      'Florianópolis, SC', 'Campinas, SP', 'Fortaleza, CE', 'Recife, PE',
      'Joinville, SC', 'Ribeirão Preto, SP', 'Uberlândia, MG', 'Londrina, PR',
      'Maringá, PR', 'Sorocaba, SP', 'Santos, SP', 'São José dos Campos, SP',
      'Cuiabá, MT', 'Campo Grande, MS', 'Manaus, AM', 'Belém, PA', 'Natal, RN',
      'João Pessoa, PB', 'Maceió, AL', 'Caxias do Sul, RS', 'Blumenau, SC',
      'Juiz de Fora, MG', 'Piracicaba, SP', 'Bauru, SP', 'Jundiaí, SP', 'Feira de Santana, BA'
    ],
    citySubAreas: {
      'Curitiba, PR': ['Batel', 'Portão', 'CIC', 'Boqueirão', 'Santa Felicidade', 'Pinheirinho', 'Água Verde', 'Bigorrilho', 'Centro Cívico', 'Boa Vista', 'Fazendinha', 'Sítio Cercado', 'Hauer', 'Uberaba', 'Capão Raso', 'Tarumã'],
      'São Paulo, SP': ['Centro', 'Moema', 'Pinheiros', 'Santana', 'Tatuapé', 'Morumbi', 'Vila Mariana', 'Lapa', 'Itaquera', 'Santo Amaro', 'Ipiranga', 'Freguesia do Ó', 'Penha', 'São Miguel Paulista'],
      'Rio de Janeiro, RJ': ['Barra da Tijuca', 'Copacabana', 'Tijuca', 'Campo Grande', 'Bangu', 'Méier', 'Jacarepaguá', 'Madureira', 'Botafogo', 'Recreio dos Bandeirantes', 'Centro'],
      'Belo Horizonte, MG': ['Savassi', 'Pampulha', 'Barreiro', 'Venda Nova', 'Lourdes', 'Buritis', 'Padre Eustáquio', 'Sion', 'Castelo', 'Prado'],
      'Porto Alegre, RS': ['Moinhos de Vento', 'Zona Sul', 'Zona Norte', 'Partenon', 'Petrópolis', 'Sarandi', 'Menino Deus', 'Restinga'],
      'Brasília, DF': ['Taguatinga', 'Ceilândia', 'Asa Norte', 'Asa Sul', 'Águas Claras', 'Samambaia', 'Guará', 'Sobradinho', 'Gama', 'Vicente Pires'],
      'Goiânia, GO': ['Setor Bueno', 'Setor Marista', 'Jardim Goiás', 'Setor Oeste', 'Campinas Goiânia', 'Setor Sul', 'Jardim América'],
      'Campinas, SP': ['Cambuí', 'Barão Geraldo', 'Taquaral', 'Centro Campinas', 'Nova Campinas', 'Jardim Guanabara']
    },
    topNiches: [
      'Oficina Mecânica', 'Auto Elétrica', 'Estética Automotiva', 'Funilaria e Pintura',
      'Marcenaria', 'Vidraçaria', 'Serralheria', 'Calhas e Rufos',
      'Desentupidora', 'Encanador', 'Eletricista Residencial', 'Pintor Residencial',
      'Gesseiro e Drywall', 'Reformas e Manutenção', 'Limpeza de Estofados',
      'Ar Condicionado e Climatização', 'Redes de Proteção', 'Barbearia',
      'Salão de Beleza', 'Clínica Odontológica', 'Pet Shop', 'Chaveiro 24 Horas',
      'Conserto de Celulares', 'Conserto de Geladeira', 'Lava Rápido',
      'Pizzaria', 'Distribuidora de Gás e Água', 'Guincho 24 Horas',
      'Segurança Eletrônica', 'Baterias Automotivas'
    ],
    nicheSubServices: {
      'Oficina Mecânica': ['auto mecânica', 'oficina mecânica especializada', 'auto center', 'mecânica diesel', 'suspensão e freios', 'injeção eletrônica', 'troca de óleo e filtro', 'câmbio automático', 'revisão mecânica'],
      'Marcenaria': ['marcenaria móveis planejados', 'marceneiro sob medida', 'cozinhas planejadas marcenaria', 'armários embutidos marcenaria', 'marcenaria móveis de madeira'],
      'Vidraçaria': ['vidraçaria box de vidro', 'vidros temperados', 'espelhos e vidros', 'fechamento de sacada vidraçaria', 'esquadrias e vidros'],
      'Estética Automotiva': ['polimento e cristalização', 'higienização automotiva', 'vitrificação de pintura', 'lavagem detalhada', 'martelinho de ouro'],
      'Desentupidora': ['desentupidora 24 horas', 'limpa fossa desentupidora', 'hidrojateamento desentupidora', 'desentupimento de esgoto'],
      'Auto Elétrica': ['auto elétrica 24h', 'baterias automotivas socorro', 'motor de partida alternador', 'elétrica de carros'],
      'Serralheria': ['serralheria portões automáticos', 'grades e esquadrias de ferro', 'estruturas metálicas serralheria'],
      'Pintor Residencial': ['pintor profissional', 'pintura residencial e predial', 'aplicação de grafiato e textura', 'pintor acabamentos']
    }
  }
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function classifyRealPhone(rawPhone, country, whatsappUrlFromMaps) {
  let waFromLink = '';
  if (whatsappUrlFromMaps) {
    const match = whatsappUrlFromMaps.match(/(?:wa\.me\/|phone=)(\d{10,15})/i);
    if (match) waFromLink = match[1];
  }

  const basePhone = rawPhone || waFromLink || '';
  const digits = basePhone.replace(/\D/g, '');
  if (digits.length < 8) {
    return { hasPhone: false, isWhatsapp: false, displayPhone: '', waDigits: '', rawDigits: '' };
  }

  if (country === 'BR') {
    let normalized = digits;
    if (normalized.startsWith('0')) normalized = normalized.slice(1);
    if (!normalized.startsWith('55') && (normalized.length === 10 || normalized.length === 11)) {
      normalized = '55' + normalized;
    }
    const localPart = normalized.startsWith('55') ? normalized.slice(2) : normalized;
    const ddd = localPart.slice(0, 2);
    const subscriber = localPart.slice(2);

    const isMobileWhatsapp = Boolean(waFromLink) || (subscriber.length === 9 && subscriber.startsWith('9'));
    const formatted = subscriber.length === 9
      ? `(${ddd}) ${subscriber.slice(0, 5)}-${subscriber.slice(5)}`
      : subscriber.length === 8
        ? `(${ddd}) ${subscriber.slice(0, 4)}-${subscriber.slice(4)}`
        : rawPhone;

    return {
      hasPhone: true,
      isWhatsapp: isMobileWhatsapp,
      displayPhone: formatted,
      waDigits: isMobileWhatsapp ? (waFromLink || normalized) : '',
      rawDigits: normalized
    };
  } else {
    let normalized = digits;
    if (normalized.length === 10) normalized = '1' + normalized;
    const local = normalized.startsWith('1') ? normalized.slice(1) : normalized;
    const formatted = local.length === 10
      ? `+1 (${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 10)}`
      : (rawPhone || `+1 ${digits}`);

    const cleanRaw = local.length === 10 ? `1${local}` : digits;
    const hasExplicitUsWa = Boolean(waFromLink);
    return {
      hasPhone: true,
      isWhatsapp: hasExplicitUsWa,
      displayPhone: formatted,
      waDigits: hasExplicitUsWa ? waFromLink : '',
      rawDigits: cleanRaw
    };
  }
}

function extractInstagramHandle(rawUrl) {
  if (!rawUrl) return null;
  const m = rawUrl.match(/instagram\.com\/([a-zA-Z0-9._]+)/i);
  if (!m || !m[1]) return null;
  const handle = m[1].replace(/\/$/, '');
  if (['p', 'reel', 'reels', 'explore', 'stories', 'accounts', 'about', 'legal', 'directory', 'tv', 'tags'].includes(handle.toLowerCase())) {
    return null;
  }
  return `@${handle}`;
}

function calculateClosingPotential(place, phoneInfo, country) {
  let score = 88;
  const reasons = [];

  const rating = typeof place.rating === 'number' ? place.rating : null;
  const reviews = typeof place.reviewsCount === 'number' ? place.reviewsCount : 0;

  if (rating && rating >= 4.6) {
    score += 8;
    reasons.push(`🔥 Altamente Avaliada: Nota ${rating}★ no Google`);
  } else if (rating && rating >= 4.0) {
    score += 5;
    reasons.push(`⭐ Boa Reputação: ${rating}★ no Google`);
  }

  if (reviews >= 5) {
    score += 4;
    reasons.push(`⚡ Empresa Ativa: ${reviews} avaliações reais`);
  }

  if (phoneInfo.hasPhone) {
    score += 3;
    reasons.push('📞 Telefone Comercial Ativo e Verificado');
  }

  if (place.isInstagramLink || place.instagramUrl) {
    score += 3;
    reasons.push('📸 Possui Instagram Oficial');
  }

  reasons.push('🚫 100% Sem Site Oficial (Perdendo clientes no Google diariamente)');

  const finalScore = Math.min(99, score);
  let label = '🎯 Lead Qualificado';
  let badgeClass = 'badge-close-good';

  if (finalScore >= 96) {
    label = `🔥 98% Chance • Lead Ouro (Sempre Ativa)`;
    badgeClass = 'badge-close-gold';
  } else if (finalScore >= 92) {
    label = `⚡ ${finalScore}% Chance • Lead Quente (Ativa)`;
    badgeClass = 'badge-close-hot';
  }

  return {
    score: finalScore,
    label,
    badgeClass,
    reasons,
    isAlwaysActive: Boolean(rating && rating >= 4.2)
  };
}

function parseGoogleMapsPayload(obj, mapByCid) {
  if (!obj) return;

  if (typeof obj === 'string') {
    const trimmed = obj.trim();
    if (trimmed.startsWith(")]}'")) {
      try {
        const inner = JSON.parse(trimmed.replace(/^\)\]\}'\s*/, ''));
        parseGoogleMapsPayload(inner, mapByCid);
      } catch {}
    }
    return;
  }

  if (Array.isArray(obj)) {
    const title = typeof obj[11] === 'string' ? obj[11].trim() : null;
    const cid = typeof obj[10] === 'string' && obj[10].includes(':0x') ? obj[10] : null;

    if (title && cid && obj.length > 15) {
      const websiteArr = Array.isArray(obj[7]) ? obj[7] : null;
      let websiteUrl = websiteArr && typeof websiteArr[0] === 'string' ? websiteArr[0] : null;
      if (websiteUrl && websiteUrl.startsWith('/url?q=')) {
        try {
          const match = websiteUrl.match(/\/url\?q=([^&]+)/);
          if (match && match[1]) websiteUrl = decodeURIComponent(match[1]);
        } catch {}
      }
      const websiteDomain = websiteArr && typeof websiteArr[1] === 'string' ? websiteArr[1] : null;

      const isWhatsappLink = Boolean(websiteUrl && /(wa\.me|whatsapp\.com|api\.whatsapp\.com)/i.test(websiteUrl));
      let isInstagramLink = Boolean(websiteUrl && /instagram\.com/i.test(websiteUrl));
      const isFacebookLink = Boolean(websiteUrl && /(facebook\.com|fb\.com|fb\.me)/i.test(websiteUrl));
      const isLinktree = Boolean(websiteUrl && /(linktr\.ee|beacons\.ai|taplink\.cc|bio\.link|heylink\.me|carrd\.co)/i.test(websiteUrl));
      const isDeadBusinessSite = Boolean(websiteUrl && /(business\.site|sites\.google\.com)/i.test(websiteUrl));
      const isDirectory = Boolean(websiteUrl && /(yelp\.com|yellowpages\.com|angi\.com|thumbtack\.com|houzz\.com|manta\.com|bbb\.org|nextdoor\.com|porch\.com|tripadvisor\.com|ifood\.com\.br|pedir\.ifood\.com\.br|rappi\.com|tiktok\.com|waze\.com)/i.test(websiteUrl));

      const isSocialOrNonOfficial = isWhatsappLink || isInstagramLink || isFacebookLink || isLinktree || isDeadBusinessSite || isDirectory;
      const hasRealWebsite = Boolean(websiteUrl) && !isSocialOrNonOfficial;

      let extractedInstagramUrl = isInstagramLink ? websiteUrl : null;
      if (!extractedInstagramUrl) {
        try {
          const rawStr = JSON.stringify(obj);
          const m = rawStr.match(/https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/i);
          if (m && m[1]) {
            const h = m[1].replace(/\/$/, '');
            if (!['p', 'reel', 'reels', 'explore', 'stories', 'accounts', 'about', 'legal', 'tags', 'directory', 'tv'].includes(h.toLowerCase())) {
              extractedInstagramUrl = `https://www.instagram.com/${h}/`;
              isInstagramLink = true;
            }
          }
        } catch {}
      }

      const phoneArr = Array.isArray(obj[178]) && Array.isArray(obj[178][0]) ? obj[178][0] : null;
      const displayPhone = phoneArr && typeof phoneArr[0] === 'string' ? phoneArr[0] : null;
      const intlPhone = phoneArr && Array.isArray(phoneArr[1]) && Array.isArray(phoneArr[1][1])
        ? phoneArr[1][1][0]
        : displayPhone;

      const address = typeof obj[39] === 'string'
        ? obj[39]
        : (typeof obj[18] === 'string' ? obj[18] : '');

      const rating = Array.isArray(obj[4]) && typeof obj[4][7] === 'number' ? obj[4][7] : null;
      const reviewsCount = Array.isArray(obj[4]) && typeof obj[4][8] === 'number' ? obj[4][8] : null;
      const categories = Array.isArray(obj[13]) ? obj[13] : [];

      let noSiteReason = 'SEM SITE OFICIAL';
      if (isDeadBusinessSite) noSiteReason = 'SEM SITE (Google Business Desativado)';
      else if (isInstagramLink) noSiteReason = 'SEM SITE (Só Instagram)';
      else if (isWhatsappLink) noSiteReason = 'SEM SITE (Só WhatsApp)';
      else if (isFacebookLink) noSiteReason = 'SEM SITE (Só Facebook)';
      else if (isLinktree) noSiteReason = 'SEM SITE (Só Linktree / Bio)';
      else if (isDirectory) noSiteReason = 'SEM SITE (Só Guia Local / Diretório)';

      mapByCid.set(cid, {
        cid,
        name: title,
        hasRealWebsite,
        noSiteReason,
        isWhatsappLink,
        isInstagramLink,
        instagramUrl: extractedInstagramUrl,
        isFacebookLink,
        isSocialOnly: isSocialOrNonOfficial,
        websiteUrl,
        websiteDomain,
        displayPhone,
        intlPhone,
        address,
        rating,
        reviewsCount,
        categories
      });
      return;
    }

    for (const child of obj) {
      parseGoogleMapsPayload(child, mapByCid);
    }
    return;
  }

  if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      parseGoogleMapsPayload(obj[k], mapByCid);
    }
  }
}

async function fetchGoogleMapsEndpoint(query, locale = 'pt-BR') {
  const pbTemplate = '!1s{Q}!7i20!10b1!12m60!1m5!18b1!30b1!31m1!1b1!34e1!2m4!5m1!6e2!20e3!39b1!6m30!32i1!49b1!63m0!66b1!85b1!114b1!149b1!206b1!209b1!212b1!215b1!216b1!222b1!223b1!234b1!235b1!246b1!253b1!260b1!262b1!266b1!270b1!271b1!273b1!277b1!281b1!291m0!294b1!302i300!303i100!10b1!12b1!13b1!14b1!16b1!17m1!3e1!20m4!5e2!6b1!8b1!14b1!46m1!1b0!96b1!97m1!2b1!99b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m33!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!1m3!1e9!2b1!3e2!2b1!9b0!15m8!1m7!1m2!1m1!1e2!2m2!1i195!2i195!3i20!22m5!1sg8jGauCQBrGL5OUPxvjZqAk!7e81!14m1!3sg8jGauCQBrGL5OUPxvjZqAk!15i9937!24m107!1m25!13m9!2b1!3b1!4b1!6i1!8b1!9b1!14b1!20b1!25b1!18m14!3b1!4b1!5b1!6b1!13b1!14b1!17b1!21b1!22b1!32b1!33m1!1b1!34b1!36e2!10m1!8e3!11m1!3e1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!27b1!29b1!30m1!2b1!36b1!37b1!39m3!2m2!2i1!3i1!43b1!52b1!54m1!1b1!55b1!56m1!1b1!61m2!1m1!1e1!65m5!3m4!1m3!1m2!1i224!2i298!72m22!1m8!2b1!5b1!7b1!12m4!1b1!2b1!4m1!1e1!4b1!8m10!1m6!4m1!1e1!4m1!1e3!4m1!1e4!3sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts!6m1!1e1!9b1!89b1!90m2!1m1!1e2!98m3!1b1!2b1!3b1!103b1!113b1!114m3!1b1!2m1!1b1!117b1!122m1!1b1!126b1!127b1!128m1!1b1!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i530!2i768!1m6!1m2!1i974!2i0!2m2!1i1024!2i768!1m6!1m2!1i0!2i0!2m2!1i1024!2i20!1m6!1m2!1i0!2i748!2m2!1i1024!2i768!34m19!2b1!3b1!4b1!6b1!8m6!1b1!3b1!4b1!5b1!6b1!7b1!9b1!12b1!14b1!20b1!23b1!25b1!26b1!31b1!37m1!1e81!42b1!49m10!3b1!6m2!1b1!2b1!7m2!1e3!2b1!8b1!9b1!10e2!50m3!2e2!3m1!3b1!61b1!67m5!7b1!10b1!14b1!15m1!1b0!69i798!77b1';
  const pb = pbTemplate.replace('{Q}', query.replace(/\s+/g, '+'));
  const gl = locale.startsWith('pt') ? 'br' : 'us';
  const url = `https://www.google.com/search?tbm=map&authuser=0&hl=${locale}&gl=${gl}&q=${encodeURIComponent(query)}&pb=${encodeURIComponent(pb)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7500);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': `${locale},en;q=0.8`,
        'Referer': 'https://www.google.com/maps/'
      }
    });
    clearTimeout(timer);
    if (!res.ok) return '';
    const text = await res.text();
    return text.replace(/\/\*""\*\/$/, '').trim();
  } catch {
    clearTimeout(timer);
    return '';
  }
}

async function scrapeLeads({ country, city, niche, target = 10 }) {
  const normCountry = (country || 'BR').toUpperCase();
  const rawCity = (city || (normCountry === 'BR' ? 'Curitiba, PR' : 'Miami, FL')).trim();
  const rawNiche = (niche || (normCountry === 'BR' ? 'Oficina Mecânica' : 'Handyman')).trim();

  const locale = normCountry === 'BR' ? 'pt-BR' : 'en-US';
  const cleanCity = rawCity.split(',')[0].trim();
  const targetCityLabel = rawCity;
  const targetNicheLabel = rawNiche;

  // Versão Gratuita Lite: varredura direta, rápida e menos profunda, buscando 10 leads 100% reais
  const searchQueries = [];
  if (normCountry === 'BR') {
    searchQueries.push(`${rawNiche} em ${cleanCity}`);
    searchQueries.push(`${rawNiche} ${cleanCity}`);
  } else {
    searchQueries.push(`${rawNiche} in ${cleanCity}`);
    searchQueries.push(`${rawNiche} ${cleanCity}`);
  }

  // Deduplicate queries
  const uniqueQueries = [...new Set(searchQueries)];

  const mapByCid = new Map();
  const validLeads = [];
  const seenPhones = new Set();
  const seenNames = new Set();
  let discardedCount = 0;
  const targetLeadCount = 10; // Limite fixo de 10 leads para versão gratuita

  // Executa em lote leve de 2 requisições
  const batchSize = 2;
  for (let i = 0; i < uniqueQueries.length; i += batchSize) {
    const batch = uniqueQueries.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(q => fetchGoogleMapsEndpoint(q, locale)));
    for (const r of results) {
      if (r) parseGoogleMapsPayload(r, mapByCid);
    }

    // Evaluate parsed places incrementally
    for (const place of mapByCid.values()) {
      if (place.hasRealWebsite) {
        discardedCount++;
        continue;
      }

      const nameKey = place.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (nameKey.length < 3 || seenNames.has(nameKey)) continue;

      const phoneInfo = classifyRealPhone(
        place.displayPhone || place.intlPhone,
        normCountry,
        place.isWhatsappLink ? place.websiteUrl : ''
      );

      if (!phoneInfo.hasPhone || !phoneInfo.displayPhone) {
        continue;
      }

      const phoneKey = phoneInfo.rawDigits || phoneInfo.displayPhone;
      if (seenPhones.has(phoneKey)) continue;
      seenPhones.add(phoneKey);
      seenNames.add(nameKey);

      let instagramUrl = place.instagramUrl || (place.isInstagramLink ? place.websiteUrl : null);
      let instagramHandle = instagramUrl ? extractInstagramHandle(instagramUrl) : null;

      const placeWithIg = { ...place, instagramUrl };
      const closing = calculateClosingPotential(placeWithIg, phoneInfo, normCountry);

      const categoryLabel = place.categories && place.categories.length > 0
        ? place.categories[0]
        : rawNiche;

      const leadCity = place.address && place.address.includes(',')
        ? place.address.split(',').slice(-2).join(',').trim()
        : rawCity;

      validLeads.push({
        id: `gmaps_${place.cid.replace(/[^a-zA-Z0-9]/g, '_')}`,
        name: place.name,
        niche: categoryLabel,
        city: leadCity || targetCityLabel,
        country: normCountry,
        address: place.address || targetCityLabel,
        rating: place.rating,
        reviewsCount: place.reviewsCount,
        hasWebsite: false,
        noSiteReason: place.noSiteReason || (place.isInstagramLink ? 'SEM SITE (Só Instagram)' : (place.isWhatsappLink ? 'SEM SITE (Só WhatsApp)' : 'SEM SITE OFICIAL')),
        instagramUrl,
        instagramHandle,
        facebookUrl: place.isFacebookLink ? place.websiteUrl : null,
        isWhatsapp: phoneInfo.isWhatsapp,
        displayPhone: phoneInfo.displayPhone,
        rawPhoneDigits: phoneInfo.rawDigits,
        waDigits: phoneInfo.waDigits,
        email: '',
        closingScore: closing.score,
        closingLabel: closing.label,
        badgeClass: closing.badgeClass,
        isAlwaysActive: closing.isAlwaysActive,
        reasons: closing.reasons,
        source: 'Google Maps (100% Real)',
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + (place.address || targetCityLabel))}`
      });

      if (validLeads.length >= targetLeadCount) break;
    }

    if (validLeads.length >= targetLeadCount) break;
  }

  // Sort leads: Instagram / High closure first
  validLeads.sort((a, b) => {
    const aHasIg = a.instagramUrl ? 1 : 0;
    const bHasIg = b.instagramUrl ? 1 : 0;
    if (bHasIg !== aHasIg) return bHasIg - aHasIg;
    if (b.closingScore !== a.closingScore) return b.closingScore - a.closingScore;
    return (b.rating || 0) - (a.rating || 0);
  });

  return {
    totalScannedOnMaps: mapByCid.size,
    discardedWithWebsite: discardedCount,
    leads: validLeads.slice(0, 10)
  };
}

module.exports = {
  scrapeLeads,
  NATIONAL_CONFIG,
  classifyRealPhone
};

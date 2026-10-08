const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const { scrapeLeads } = require('./lib/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Bypass-Tunnel-Reminder', 'X-Requested-With']
}));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    app: 'MovveFind',
    engine: 'Google Maps Cloud Engine (Ultra Rápido, Sem Playwright)',
    uptime: process.uptime()
  });
});

app.get('/api/search', async (req, res) => {
  const country = (req.query.country || 'BR').toUpperCase();
  const city = (req.query.city || 'Curitiba, PR').trim();
  const niche = (req.query.niche || 'Oficina Mecânica').trim();
  const target = 10;

  try {
    const t0 = Date.now();
    console.log(`[MovveFind] Pesquisa: "${niche}" em "${city}" (${country})...`);
    const result = await scrapeLeads({ country, city, niche, target });
    console.log(`[MovveFind] Concluído em ${Date.now() - t0}ms | Sem site: ${result.leads.length} (Com site descartados: ${result.discardedWithWebsite})`);
    res.json({
      ok: true,
      ...result
    });
  } catch (err) {
    console.error('[MovveFind Erro]:', err);
    res.status(500).json({
      ok: false,
      error: err.message || 'Erro ao consultar empresas no Google Maps.'
    });
  }
});

function getLanIps() {
  try {
    return Object.values(os.networkInterfaces())
      .flat()
      .filter(i => i && i.family === 'IPv4' && !i.internal)
      .map(i => i.address);
  } catch {
    return [];
  }
}

// Only listen if not running in a serverless environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, '0.0.0.0', () => {
    const lanIps = getLanIps();
    console.log(`========================================================`);
    console.log(` MovveFind — Motor Google Maps 100% Ativo na Nuvem`);
    console.log(` Local: http://localhost:${PORT}`);
    if (lanIps.length > 0) {
      console.log(` Rede Local: http://${lanIps[0]}:${PORT}`);
    }
    console.log(` Pronto para hospedar no Vercel, Render ou Railway sem precisar do seu PC.`);
    console.log(`========================================================`);
  });
}

module.exports = app;

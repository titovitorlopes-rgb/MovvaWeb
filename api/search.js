const { scrapeLeads } = require('../lib/scraper');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Bypass-Tunnel-Reminder, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const country = (req.query.country || 'BR').toUpperCase();
  const city = (req.query.city || 'Curitiba, PR').trim();
  const niche = (req.query.niche || 'Oficina Mecânica').trim();
  const target = Math.min(60, Math.max(25, parseInt(req.query.target, 10) || 40));

  try {
    const result = await scrapeLeads({ country, city, niche, target });
    res.status(200).json({
      ok: true,
      ...result
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message || 'Erro ao buscar no Google Maps.'
    });
  }
};

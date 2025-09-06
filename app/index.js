// app/index.js
const express = require('express');
const helmet = require('helmet');
const app = express();

// Security headers
app.disable('x-powered-by');
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);
// Permissions-Policy
app.use((_, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  next();
});

// Strong no-cache for all responses (fixes “Storable and Cacheable Content” 10049)
app.use((_, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
  });
  next();
});

app.use(express.json());

// Health
app.get('/healthz', (req, res) => res.status(200).json({ ok: true }));

// Minimal pages ZAP probes
app.get('/', (req, res) => res.status(200).send('OK'));
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send('User-agent: *\nDisallow:');
});
app.get('/sitemap.xml', (req, res) => {
  res
    .type('application/xml')
    .send('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
});

// Echo
app.post('/echo', (req, res) => res.json({ youSent: req.body || {} }));

const port = process.env.PORT || 3000;
if (require.main === module) app.listen(port, () => console.log(`Server running on ${port}`));
module.exports = app;

// app/index.js
const express = require('express');
const helmet = require('helmet');

const app = express();

// --- Security hardening ---

// Remove the "X-Powered-By: Express" header
app.disable('x-powered-by');

// Apply Helmet’s defaults (adds common secure headers: HSTS, noSniff, etc.)
app.use(helmet());

// Add a basic Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"], // only allow same-origin by default
    },
  })
);

// Add Permissions-Policy header manually (Helmet doesn’t set this by default)
app.use((req, res, next) => {
  // Block powerful browser features unless explicitly needed
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );
  next();
});

// --- App logic ---

app.use(express.json());

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true });
});

app.post('/echo', (req, res) => {
  res.json({ youSent: req.body || {} });
});

// --- Server bootstrap ---

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;

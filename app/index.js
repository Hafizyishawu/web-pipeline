
//checking

const express = require ('express');
const app = express();
app.use(express.json());

app.get('/healthz', (req, res) => res.status(200).json({ ok: true }));
app.post('/echo', (req, res) => res.json({ youSent: req.body || {} }));

const port = process.env.PORT || 3000;
if (require.main === module) app.listen(port, () => console.log(`up on ${port}`));
module.exports = app;

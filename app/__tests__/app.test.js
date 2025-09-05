const request = require('supertest');
const app = require('../index');

describe('app', () => {
  it('GET /healthz -> 200', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('POST /echo returns what we send', async () => {
    const res = await request(app).post('/echo').send({ hello: "world" });
    expect(res.status).toBe(200);
    expect(res.body.youSent.hello).toBe("world");
  });
});

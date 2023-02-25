const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
chai.use(chaiHttp);

describe('Test succes route', () => {
  describe('GET success-route', () => {
    it('should return status code 200 and expected data', async () => {
      const res = await chai.request(app).get('/success-route');
      expect(res).to.have.status(200);
    });
  });
});
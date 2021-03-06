import request from 'request';
import chai from 'chai';
import app from '../app/index';
import { verifyCredentials } from '../app/controller/get-token';

const { expect } = chai;

describe('get token', () => {
  it('should return token', (done) => {
    expect(verifyCredentials('piyushvijay.1997@gmail.com', 'random-password').form)
      .to.be.equal(false);
    expect(verifyCredentials('piyushvijay.1997@gmail.com', 'random-password').token)
      .to.be.a('string');
    done();
  });

  it('should return incorrect username', (done) => {
    expect(verifyCredentials('random_email', 'correct_password').form)
      .to.be.equal(true);
    expect(verifyCredentials('random_email', 'correct_password').msg)
      .to.be.equal('Incorrect username');
    done();
  });

  it('should return incorrect passworrd', (done) => {
    expect(verifyCredentials('piyushvijay.1997@gmail.com', 'random_pass').form)
      .to.be.equal(true);
    expect(verifyCredentials('piyushvijay.1997@gmail.com', 'random_pass').msg)
      .to.be.equal('Incorrect username or password entered');
    done();
  });

  it('should resolve token request', (done) => {
    request
      .post({
        url: 'http://localhost:3000/get_token',
        form: { username: 'piyushvijay.1997@gmail.com', password: 'random-password' },
        responseType: 'buffer',
      }, (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

const express = require('chai').expect
const request = require('supertest')

const app = require('../../../routes/roles.js')
const conn = require('../../../server.js')

describe('POST /roles', () => {
    before((done) => {
        conn.connect()
          .then(() => done())
          .catch((err) => done(err));
      })

      after((done) => {
        conn.close()
          .then(() => done())
          .catch((err) => done(err));
      })

    it('OK, creating a new Role works!'), (done) => {
        request(app).post('/roles').send({
            name: 'Name',
            description: 'Description',
            salaryPerMonth: '10000'
        }).then((req) => {
            const body = req.body
            expect(body).to.contain.property('name')
            expect(body).to.contain.property('description')
            expect(body).to.contain.property('salaryPerMonth')
            done()
        })
    }
})
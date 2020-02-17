process.env.NODE_ENV = 'test'

const expect = require('chai').expect
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
        conn.disconnect()
          .then(() => done())
          .catch((err) => done(err));
    })

    it('OK, creating a new Role works!'), (done) => {
        request(app).post('/roles').send({
            name: 'Name',
            description: 'Description',
            salaryPerMonth: '10000'
        }).then((res) => {
            const body = res.body
            expect(body).to.contain.property('name')
            expect(body).to.contain.property('description')
            expect(body).to.contain.property('salaryPerMonth')
            done()
        })
        .catch((error) => done(error))
    }
})
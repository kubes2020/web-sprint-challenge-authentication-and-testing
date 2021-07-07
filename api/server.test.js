const server = require('./server.js')
const request = require('supertest')


describe('server.js module', () => {
    it('checks testing environmnet', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    describe('[GET]/', () => {
        it('works', async () => {
            return request(server).get('/')
            .expect('Content-Type', /text/)
            .expect('Content-Length', '20')
        })
    })
})
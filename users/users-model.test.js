const db = require('../database/dbConfig.js')
const Users = require('./users-model.js')

beforeEach(async () => {
    await db('users').truncate()
})

describe('users model', () => {
    describe('add user', () => {
        it ('should be empty', async () => {
            const user = await db('users')
            expect(user).toHaveLength(0)
        })
        it('should have one user after add', async () => {
            await Users.add({ username: "Me", password: "123"})
            const user = db('users')
            expect(user).toBe({ username: "Me", password: "123"})
        }
        )
    })

    describe('find by Id', () => {
        describe('add user then find by id', () => {
            it('returns the user', async () => {
                await db('users').insert({ username: "Me", password: "123"})
                const user = Users.findById(1)
                expect(user).toBe({ username: "Me", password: "123"}) 
                expect(user).not.toBeNull()
            })
        })
    })

    describe('find by', () => {
        describe('find user by username', () => {
            it('returns the user', async () => {
                await db('users').insert({ username: "Me", password: "123"})
                const user = Users.findBy( "Me" )
                expect(user).toBe({ username: "Me", password: "123"}) 
                expect(user).not.toBeNull()
            })
        })
    })
})




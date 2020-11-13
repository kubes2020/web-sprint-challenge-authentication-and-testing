const db = require('../database/dbConfig.js')

module.exports = {
    add, 
    find,
    findBy,
    findById,
}

async function add(user){
    try {
        const [id] = await db('users').insert(user, "id")
        return findById(id)
    } catch (err) {
        throw err
    }
}

function findById(id) {
    return db('users').where({id}).first()
}

async function find() {
    return null
}

async function findBy(username) {
    return db('users').where(username).orderBy('id')
}

const Group = require('../db/models/group')
const assert = require('chai').assert 

describe('test group model', () => {
    it('should create a group', done => {
        var temp = new Group({name: 'friends'})
        temp.validate(err => {
                                assert(err === null)
                                done()
                            })
    }),
    it('should throw group name empty error', done => {
        var temp = new Group()
        temp.validate(err => {
                                assert(err.errors.name !== null)
                                done()
                            })
    })
})
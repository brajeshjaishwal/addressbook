const { AddContact, GetContacts, EditContact, DeleteContact } = require('../db/index')

const createContact = async (req, res) => {
    try{
        let { parent, name, relation } = req.body
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let member = await AddContact({user: user._id, parent, name, relation})
        return res.send({ member })
    }catch(Error){
        return res.send({ contact: null, message: Error.message})
    }
}

const updateContact = async (req, res) => {
    try{

    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const removeContact = async (req, res) => {
    try{

    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const getContactList = async (req, res) => {
    try {
        const { parentid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let result = await GetContacts({user: user._id, parent: parentid})
        return res.send({contacts: result.members})
    } catch (Error) {
        return res.send({contacts: null, message: Error.message})
    }
}

module.exports = { createContact, getContactList, updateContact, removeContact }
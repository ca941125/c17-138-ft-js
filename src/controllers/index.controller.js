import pool from '../db.js'
import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {
    /* const client = await db.connect() */
    if(req.session.loggedin){
        res.render('admin', {
         login: true,
         name: req.session.name,
         id: req.session.id
        })
    } else {
        res.render('index')
    }

}
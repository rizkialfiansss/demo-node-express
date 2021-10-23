'use strict'

const req = require('request')
require('dotenv').config({ path: './.env' })

const mysql = require('mysql')
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

module.exports = {
    search: function (request, response) {
        db.connect((err) => {
            if(err){
                throw(err)
            }
            console.log('Mysql Connected!')
        })
        
        let url = `http://www.omdbapi.com/?apikey=${process.env.apikey}&s=` + request.query.title
        let options = {
            headers: {
                Accept: 'application/json'
            },
            rejectUnauthorized: false
        }
        req.get(url, options, async (err, res, body) => {
            let resp = {}
            let insert_log = {
                user_agent: request.headers['user-agent'],
                path: request.url,
                method: request.method,
                request: JSON.stringify(request.query),
                response: body,
            }
            let sql = 'INSERT INTO log SET ?'
            if(body){
                resp.code = 200
                resp.data = 'Data found'
                resp.data = JSON.parse(body)
            } else {
                resp.data = 'Data not found'
                resp.data = JSON.parse(body)
            }
            db.query(sql, insert_log, (err, result) => {})
            response.send(resp)
        })
    },
    detail: function (request, response) {
        let url = `http://www.omdbapi.com/?apikey=${process.env.apikey}`
        if(request.query.id){
            url += `&i=${request.query.id}`
        }
        if(request.query.title){
            url += `&i=${request.query.title}`
        }
        
        let options = {
            headers: {
                Accept: 'application/json'
            },
            rejectUnauthorized: false
        }

        req.get(url, options, async (err, res, body) => {
            let resp = {}
            let insert_log = {
                user_agent: request.headers['user-agent'],
                path: request.url,
                method: request.method,
                request: JSON.stringify(request.query),
                response: body,
            }
            let sql = 'INSERT INTO log SET ?'

            if(body){
                resp.code = 200
                resp.data = 'Data found'
                resp.data = JSON.parse(body)
            } else {
                resp.data = 'Data not found'
                resp.data = JSON.parse(body)
            }
            db.query(sql, insert_log, (err, result) => {})
            response.send(JSON.parse(body))
        })
    }
}
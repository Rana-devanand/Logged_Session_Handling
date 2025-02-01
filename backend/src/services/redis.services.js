const Redis = require('ioredis');

const {host , port , password} = require("../config/server.config")
const redisClient = new Redis({
  host,
  port,
  password,
})

redisClient.on('connect', () =>{
    console.log('Connected to Redis')
})

module.exports = redisClient;
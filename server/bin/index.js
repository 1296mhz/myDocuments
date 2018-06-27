const _ = require('underscore');
const path = require('path');
const http = require('http');
const socket_io = require('socket.io');
const wildcard = require('socketio-wildcard')();
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();
const tokens = [];
const sockets = [];

const app = express();
const server = http.createServer(app);
const io = socket_io(server);
const logger = morgan('combined');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(path.join(__dirname, '/../dist')));
const static_dir = path.normalize(__dirname + '/../dist');
console.log(static_dir)

/*
const ClientHandler = require("../lib/ClientHandler");
const RedisManager = require("../lib/RedisManager");
const { OrdersCache } = require("../lib/OrdersCache");
const { EntityTreeCache } = require("../lib/EntityTreeCache");

const redis = new RedisManager({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB
});
*/

io.use(wildcard);

app.use(logger);
app.use(jsonParser);
app.use(urlencodedParser);

const GetUserAtToken = function (token) {
   return _.findWhere(tokens, { token: token })
}
app.get('/', async (req, res, next) => {
 res.sendfile('index.html');
});

app.post('/auth', async (req, res, next) => {
   const body = req.body || {}
   if (!body.username) {
      return res.status(403).json({
         error: "username expected"
      })
   }
   if (!body.password) {
      return res.status(403).json({
         error: "password expected"
      })
   }
   const user = await db.GetUser(body.username);

   let tokenUUID = String(Date.now());
   if (user && user.password === body.password) {
      const hmac = crypto.createHmac('sha256', process.env.AUTH_SECRET)
;
      const tokenVal = hmac.update(user.username + tokenUUID).digest('hex');
      try {
         await db.PutUserAndToken(user.username, tokenVal);
         /* Original
         tokens.push({
             username: user.username,
             token: tokenVal
         });
         */
      } catch (e) {
         console.log(e)
      }
      
      return res.status(200).json({
         username: user.username,
         // executors: user.executors,
         token: tokenVal
      });
   }
 res.status(403).json({
      error: "username or password incorrect"
   });
});


if (process.env.AUTH_ENABLE) {
        io.use(async (socket, next) => {
                const token = socket.handshake.query.token;
                //const user = GetUserAtToken(token); //Original
                const user = await db.GetUserByToken(token);
                if (user) {
                        return next();
                }
                return next(new Error('authentication error'));
        });
}

io.on('connection', async (socket) => {
        const token = socket.handshake.query.token;
        // const user = GetUserAtToken(token); //Original
        const user = await db.GetUserByToken(token);
        const userInfo = await db.GetUser(user.username);
        const client = new ClientHandler(socket, userInfo, redis, db, OrdersCacheInstance, TreeCacheInstance);

        socket.on('disconnect', () => {
                const sIdx = _.findIndex(sockets, { id: socket.id });
                if (sIdx !== -1) {
                        sockets.splice(sIdx, 1);
                }
                client.HandleDisconnect();
        });
        sockets.push(socket);
        await client.Start();
});


if (process.env.SERVE_STATIC) {
        app.use(express.static(static_dir));
}

(async () => {
        
        try {
                server.listen(process.env.SERVER_PORT || 3000);
                if (process.env.SERVE_STATIC) {
                        console.log("Server static in", static_dir);
                }
        } catch (error) {
                console.log(error);
        }
        
})(); 

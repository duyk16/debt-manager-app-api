import Debug from 'debug'
import Http from 'http'
import Dotenv from 'dotenv'
import { AddressInfo } from 'net'

import app from './api/server'
import './global'
import './services/logger'

const debug = Debug('dev:server');

/**
 * Load environment variable
 */
const config = Dotenv.config()

if (config.error) {
    console.log('Load environment variable from .env file was failed.')
    process.exit(1)
}

/**
 * Get port from environment and store in Express.
 */

const PORT = process.env.PORT || "3000"
app.set('port', PORT)

/**
 * Create HTTP server.
 */

const server = Http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break;
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address() as AddressInfo
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debug('Listening on ' + bind)
}

export default server
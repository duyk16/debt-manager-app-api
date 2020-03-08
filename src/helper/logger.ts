import Debug from 'debug'

module Log {
    export const server = Debug('dev:server')
    export const controller = Debug('dev:controller')
    export const middleware = Debug('dev:middleware')
    export const service = Debug('dev:service')
}

(global as any).Log = Log
export default Log
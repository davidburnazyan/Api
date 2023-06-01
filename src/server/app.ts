import { useContainer } from 'routing-controllers';
import { Container as TypeDiContainer, Inject, Service } from 'typedi';

import { ExpressServer } from './server';
import { Db } from '../db';

@Service()
export class App {

    /**
     * @param server
     * @param db
     */
    public constructor(
        @Inject() public readonly server: ExpressServer,
        @Inject() public readonly db: Db
    ) { }

    public async createApplication() {
        useContainer(TypeDiContainer);
        await this.db.init();
        await this.server.setup();
        this.handleExit(this.server);
    }

    /**
     * @param server
     * @private
     */
    private handleExit(server: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            console.error('Uncaught exception', err)
            this.shutdownProperly(1, server)
        });
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.error('Unhandled Rejection at promise', reason)
            this.shutdownProperly(2, server)
        });
        process.on('SIGINT', () => {
            console.info('Caught SIGINT')
            this.shutdownProperly(128 + 2, server)
        });
        process.on('SIGTERM', () => {
            console.info('Caught SIGTERM')
            this.shutdownProperly(128 + 2, server)
        });

        process.on('exit', () => {
            console.info('Exiting')
        });
    }

    /**
     * @param exitCode
     * @param server
     * @private
     */
    private shutdownProperly(exitCode: number, server: ExpressServer) {
        Promise.resolve()
            .then(() => server.kill())
            .then(() => {
                console.info('Shutdown complete')
                process.exit(exitCode)
            })
            .catch(err => {
                console.error('Error during shutdown', err)
                process.exit(1)
            })
    }
}

import express, { Express } from "express";

import cors from 'cors';
import { Server } from 'http';
import { Inject, Service } from 'typedi';
import * as bodyParser from 'body-parser';
import { Action } from 'routing-controllers';
import { rateLimit } from 'express-rate-limit';
import { useExpressServer } from 'routing-controllers';
import { authorizationChecker } from '../decorators/authorization.checker';
import { Config } from '../config';

// import { ErrorHandlerMiddleware } from '../middlewares/error.handler.middleware';
// import { ResponseInterceptor } from '../interceptors/response';
// import * as swaggerUi from 'swagger-ui-express';
// import { swaggerSpec } from '../modules/swagger';
// @ts-ignore

/** CONTROLLERS **/
import { WordController } from '../controllers/word.controller';
import { GroupController } from '../controllers/group.controller';
import { AuthController } from '../controllers/auth.controller';

// import { AuthHandlerMiddleware } from "../middlewares/auth.handler.middleware";

// import { MessageController } from '../controllers/message.controller';

@Service()
export class ExpressServer {
    public constructor(@Inject() private readonly config: Config) { }
    private server?: Express;
    public httpServer!: Server;

    public async setup(): Promise<Express> {
        const server = express();
        this.setupStandardMiddlewares(server);
        await this.configureApiEndpoints(server);

        this.httpServer = this.listen(server, this.config.port);
        this.server = server;

        return this.server
    }

    /**
     * @param server
     * @param port
     */
    public listen(server: Express, port: number) {
        console.info(`Starting server on port ${port}`);
        return server.listen(port);
    }

    /**
     * @param server
     */
    setupStandardMiddlewares(server: Express): void {
        server.set('trust proxy', true);

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 1000 // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        });

        server.use(bodyParser.json());
        server.use(cors({ origin: '*' }));
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use('/api', limiter)
    }

    public kill(): void {
        if (this.httpServer) this.httpServer.close();
    }

    /**
     * @param server
     */
    async configureApiEndpoints(server: Express): Promise<void> {
        useExpressServer(server, {
            authorizationChecker: async (action: Action, roles: string[]) => authorizationChecker(action, roles),
            routePrefix: '/api',
            controllers: [
                GroupController,
                WordController,
                AuthController,
            ],
            defaultErrorHandler: false,
            // middlewares: [ErrorHandlerMiddleware],
            // interceptors: [ResponseInterceptor]
        });
    }
}


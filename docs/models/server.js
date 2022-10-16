"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes");
const database_1 = require("../database");
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            events: '/api/events',
            page: '/api/page',
            profile: '/api/profile',
            lookup: '/api/lookup',
            organization: '/api/organization',
            departament: '/api/departament',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.connectToDatabase();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.auth, routes_1.authRouter);
        this.app.use(this.apiPaths.events, routes_1.eventsRouter);
        this.app.use(this.apiPaths.page, routes_1.pageRouter);
        this.app.use(this.apiPaths.profile, routes_1.profileRouter);
        this.app.use(this.apiPaths.lookup, routes_1.lookupRouter);
        this.app.use(this.apiPaths.organization, routes_1.organizationRouter);
        this.app.use(this.apiPaths.departament, routes_1.departamentRouter);
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.dbConnection)();
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
            console.log(`http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
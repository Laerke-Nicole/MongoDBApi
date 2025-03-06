"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.setupCors = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
const database_1 = require("./repository/database");
const routes_1 = __importDefault(require("./routes"));
const documentation_1 = require("./util/documentation");
const cors_1 = __importDefault(require("cors"));
dotenv_flow_1.default.config();
// create express application
const app = (0, express_1.default)();
function setupCors() {
    app.use((0, cors_1.default)({
        origin: "*",
        methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
        credentials: true,
    }));
}
exports.setupCors = setupCors;
function startServer() {
    // enable cors
    setupCors();
    // json body parser
    app.use(express_1.default.json());
    // bind routes to the app
    // /api route in url
    app.use('/api', routes_1.default);
    (0, documentation_1.setupDocs)(app);
    // test db connection
    (0, database_1.testConnection)();
    // PORT has to either be defined in .env file or 4000
    const PORT = parseInt(process.env.PORT) || 4000;
    app.listen(PORT, function () {
        console.log("Server is running on port: " + PORT);
    });
}
exports.startServer = startServer;
//# sourceMappingURL=app.js.map
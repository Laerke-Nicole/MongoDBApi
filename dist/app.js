"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
//dotenvFlow.config();
// create express application
const app = (0, express_1.default)();
app.use('/api', routes_1.default);
function startServer() {
    app.listen(4000, function () {
        console.log("Server is running on port: " + 4000);
    });
}
//# sourceMappingURL=app.js.map
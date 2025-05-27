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
exports.startCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const https_1 = __importDefault(require("https"));
// Settings
const TOTAL_DURATION_MINUTES = 120; // Total "keep-remote-server-alive" duration 
const MINUTES_DELTA = 5; // How often should we ping the server
const cronPattern = "*/" + MINUTES_DELTA + " * * * *"; // Docs here: https://crontab.guru/#*/5_*_*_*_*
const URL = "https://ments-restapi.onrender.com/api/";
let counter = 0;
let task;
/**
 * Small helper function to ping the server and output to console.
 */
function pingServer() {
    https_1.default.get(URL, () => {
        counter -= MINUTES_DELTA;
        console.log('Pinged the server');
        console.log("Minutes Left: ", counter);
    });
}
/**
 * Small helper function to stop the task
 */
function stopPingingServer() {
    task.stop();
    console.log('Stopped the cron job due to inactivity');
}
/**
 *
 * @param req
 * @param res
 */
function startCron(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Initialize the task with the specified cronPattern
            counter = TOTAL_DURATION_MINUTES;
            task = node_cron_1.default.schedule(cronPattern, pingServer, { scheduled: false });
            task.start();
            setTimeout(stopPingingServer, TOTAL_DURATION_MINUTES * 60 * 1000);
            res.status(200).send("Started cron-job from active route call");
        }
        catch (error) {
            res.status(500).send({ message: error });
        }
    });
}
exports.startCron = startCron;
;
//# sourceMappingURL=devToolsController.js.map
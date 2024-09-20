import { Context, Database, Tables, Types } from "koishi";
import { Config } from "..";
import { LoggerService } from "@cordisjs/logger"
import { UserWallet } from "./interface/Type_userWallet";


let config: Config
let logger: LoggerService
let dataBase: Database<Tables, Types, Context> & Context.Database<Context>


const baseData = {
    config,
    logger,

    dataBase,
}

export default baseData
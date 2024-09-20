import { Context } from "koishi";
import Data from "../Data/idnex";
import { } from "@koishijs/plugin-database-sqlite"


/**
 * 数据初始化
 * @param ctx 
 */
function baseSetup(ctx: Context) {
    const baseData = Data.baseData
    baseData.config = ctx.config
    baseData.logger = ctx.logger

    baseData.dataBase = ctx.database
}

function databaseSetup(ctx: Context) {
    ctx.model.extend('tokenSystem', {
        id: 'string',
        userNickName: {
            type: 'string',
            length: 255,
            nullable: true
        },
        tokens: {
            type: "decimal",
            initial: 0,
            nullable: false,
        },
        markData: {
            type: "json",
        }
    })
}

function setup(ctx: Context) {
    baseSetup(ctx)
    const { logger, config } = Data.baseData
    logger.info('数据初始化完成')
    databaseSetup(ctx)
    logger.info('数据库初始化完成')
}

const Obj_baseSetup = {
    baseSetup,
    databaseSetup,
    setup,
}

export default Obj_baseSetup
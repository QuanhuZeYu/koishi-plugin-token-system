import { Argv } from "koishi";
import Data from "../Data/idnex";



async function signup(argv: Argv, message: string) {
    const baseData = Data.baseData
    const { logger, config } = baseData

    const userId = argv.session.userId
    logger.info(`${userId} 正在注册...`)
    const userName = argv.session.username
    // 在表中查是否有此人ID
    const user = await baseData.dataBase.get('tokenSystem', { id: userId })
    if (user.length < 1) {
        await baseData.dataBase.create('tokenSystem', {
            id: userId,
            userNickName: userName
        })
        logger.info(`${userId} 注册成功！`)
        // 设置初始token
        const randomValue = Math.round(config.signUptokensRandom ? Math.random() * (config.signUptokensRandomRange * 2) - config.signUptokensRandomRange : 0)
        const tokensSet = config.signUptokensRandom ? config.signUpTokens + randomValue : config.signUpTokens
        await baseData.dataBase.set('tokenSystem', { id: userId }, { tokens: tokensSet, "markData.signIn.lastSign": "20-01-01-00-00-00" })
        const user = await baseData.dataBase.get('tokenSystem', { id: userId })
        const curTokens = user[0].tokens
        await argv.session.send(`${userName} 注册成功！你的初始积分为：${curTokens}`)
    } else {
        const user = await baseData.dataBase.get('tokenSystem', { id: userId })
        const curTokens = user[0].tokens
        await argv.session.send(`${userName} 已经注册过了！你的积分为：${curTokens}`)
    }
}

export default signup
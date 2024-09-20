import { Argv } from "koishi";
import Data from "../Data/idnex";



async function signIn(argv: Argv, message: string) {
    const session = argv.session
    const debug = Data.Tools.debug
    const baseData = Data.baseData
    const { logger, config, dataBase } = baseData

    const userId = argv.session.userId
    const userName = argv.session.username


    // 查表
    const user = await dataBase.get('tokenSystem', { id: userId })
    const curTime = Data.Tools.time.getCurrentFormattedTime()
    if (user.length < 1) {
        debug('未找到用户')
        session.send(`【${userName}】未注册，请先注册`)
    } else if (!(Data.Tools.time.isLessThanOneDay(curTime, user[0].markData.signIn.lastSign))) {
        await session.send(`【${userName}】今天已经签到过了，明天再来吧~`)
    } else {
        const randomValue = Math.round(config.signIntokensRandom ? Math.random() * (config.signIntokensRandomRange * 2) - config.signIntokensRandomRange : 0)
        const tokensSet = config.signIntokensRandom ? config.signInTokens + randomValue : config.signInTokens
        const signInTime = Data.Tools.time.getCurrentFormattedTime()

        await dataBase.set('tokenSystem', { id: userId }, { tokens: user[0].tokens + tokensSet, "markData.signIn.lastSign": signInTime })
        await session.send(`【${userName}】签到成功，获得${tokensSet}积分`)
    }
}

export default signIn
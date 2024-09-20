import Data from "../Data/idnex";



async function setToken(id: string, tokens: number) {
    const { baseData, Tools } = Data
    const { logger, config, dataBase } = baseData
    const { debug, time } = Tools

    const user = await dataBase.get("tokenSystem", { id: id })
    if (user.length < 1) {
        debug(`未找到用户 ${id}`)
        throw '未找到用户 ${id}'
    }

    return await dataBase.set("tokenSystem", { id: id }, { tokens: tokens })
}

async function createUser(id: string) {
    const { baseData, Tools } = Data
    const { logger, config, dataBase } = baseData
    const { debug, time } = Tools

    const user = await dataBase.get("tokenSystem", { id: id })
    if (user.length > 0) {
        debug(`用户 ${id} 已存在`)
        throw '用户已存在'
    }

    return await dataBase.create("tokenSystem", {
        id: id,
        tokens: 0,
        markData: {
            signIn: {
                lastSign: "00-01-01-00-00-00",
            }
        },
    })
}

const API_token = {
    setToken,
    createUser,
}

export default API_token
const plugin_describe = `
这是一个练手项目，用于熟悉Database操作\n
目前内置的功能:\n\n
1.注册: 用于创建表中的行\n\n
2.签到: 用于修改表中的行\n\n
如果你是开发者，引入该插件后，使用Data中的.API来操作本插件中的表，目前API\n\n
1.set(id:<QQ号或者其他的用户唯一ID>, token:<代币数量number类型>)\n\n
2.create(id)用于新增数据表的行创建用户
`

const tokenSystem_describe = `
bot代币系统，提供类似钱包的功能，可以给指令附加要求代币消耗
`

const signup = `
初次使用用户应当使用注册功能
`

const signin = `
每天签到可以获得代币，代币可用于各种功能
`


const usages = {
    plugin_describe,
    tokenSystem_describe,
    signup,
    signin
}

export default usages
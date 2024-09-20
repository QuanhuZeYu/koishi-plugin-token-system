import { Context, Schema } from 'koishi'
import { } from '@koishijs/plugin-database-sqlite'
import { UserWallet } from './Data/interface/Type_userWallet'
import Event from './Event'
import Data from './Data/idnex'

export const name = 'token-system'

export const usage = Data.Docs.usages.plugin_describe

export const inject = {
	required: ['database'],
}

declare module 'koishi' {
	interface Tables {
		tokenSystem: UserWallet
	}
}

export interface Config {
	debug: boolean
	signUpTokens: number
	signUptokensRandom: boolean
	signUptokensRandomRange: number
	signInTokens: number
	signIntokensRandom: boolean
	signIntokensRandomRange: number
}

export const Config: Schema<Config> = Schema.object({
	debug: Schema.boolean().default(true).description('是否开启调试模式'),
	signUpTokens: Schema.number().default(50).description('注册奖励积分'),
	signUptokensRandom: Schema.boolean().default(false).description('注册奖励积分是否随机'),
	signUptokensRandomRange: Schema.number().default(50).description('注册奖励积分随机范围 (± x)'),
	signInTokens: Schema.number().default(10).description('签到奖励积分'),
	signIntokensRandom: Schema.boolean().default(false).description('签到奖励积分是否随机'),
	signIntokensRandomRange: Schema.number().default(50).description('签到奖励积分随机范围 (± x)')
})

export function apply(ctx: Context) {
	Event.Obj_baseSetup.setup(ctx)
	const { logger, dataBase } = Data.baseData
	const debug = Data.Tools.debug

	const tokenSystem = ctx.command('q-token', 'token系统').usage(Data.Docs.usages.tokenSystem_describe)

	tokenSystem.subcommand('q-注册').usage(Data.Docs.usages.signup).alias('q-signup')
		.action((argv, message) => {
			Data.Commands.signup(argv, message)
		})
	tokenSystem.subcommand('q-签到').usage(Data.Docs.usages.signin).alias('q-signin')
		.action((argv, message) => {
			debug(`签到`)
			Data.Commands.signIn(argv, message)
		})
}

export interface UserWallet {
    id: string
    userNickName?: string
    tokens: number
    markData?: {
        signIn?: {
            lastSign: string
        }
    }
}
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession['user']&{
    id : string
    name : string
    movies ?: []
}

declare module 'next-auth' {
    interface Session {
        user : ExtendedUser
    }
}

import { JWT } from '@auth/core/jwt'

declare module '@auth/core/jwt' {
    interface JWT {
        id : string
        name : string
        movies ?: []
    }
}
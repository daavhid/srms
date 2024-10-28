import { NextRequest, NextResponse } from "next/server"
import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { adminRoutes, apiAuthPathName, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes"
 

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const data  = await auth()
    const role = data?.user?.role
    const {nextUrl} = req;
    const isLoggedIn = req.auth
    console.log(req.auth,role,'middleware')

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPathName)

    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isauthRoute = authRoutes.includes(nextUrl.pathname)

    const isAdminRoute  =  adminRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return null
    }
    if(isauthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null
    }
    if(!isLoggedIn && !isPublicRoute){
        return NextResponse.redirect(new URL('/login',nextUrl))
    }
    return null

})
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
  }
 


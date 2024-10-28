/** 
 * An array of public routes  that can be acesseed by the public
 * @type {string[]}
 */

export const publicRoutes = [
    '/',
    '/verification'
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users
 * @type {string[]}
 */

export const authRoutes = [
    '/login',
    '/register',
    '/reset',
    '/new-password'
]

/**
 * the prefix for api authentication routes
 * @type {string}
 */


export const apiAuthPathName = '/api'

/**
 * Redirects logged in user to the default page
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

/** 
 * Routes that only an admin can access
 * @type {string[]}
 */

export const adminRoutes = [
    '/add-students',
    '/add-staffs',
    '/add-courses'
]



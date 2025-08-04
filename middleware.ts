import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const username = 'admin'
const password = 'yourpassword'
const auth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')

  if (basicAuth === auth) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Run middleware on all paths
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

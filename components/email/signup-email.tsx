import { Html } from "@react-email/html"

/**
 * Minimal HTML version
 */
export default function SignupEmail() {
  return (
    <Html>
      <body>
        Hey there, thanks for signing up.

        I&apos;m a solo developer building something I wish existed, and it&apos;s an honor to have you here.

        I&apos;ll never send marketing emails and will only let you know once ZenPersonal is ready.

        All the best,
        Marcelo from HumansWithComputers.com
      </body>
    </Html>
  )
}

/**
 * Plain-text version
 */
export const signupEmailText = `
Hey there, thanks for signing up.
I'm a solo developer building something I wish existed, and it's an honor to have you here.
I'll never send marketing emails and will only let you know once ZenPersonal is ready.
All the best,
Marcelo from HumansWithComputers.com
`
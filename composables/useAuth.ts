import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";

export function useAuth() {

    const {$auth, $user} = useNuxtApp()

    async function signIn() {
        await signInWithPopup($auth, new GoogleAuthProvider())
    }

    async function signOut() {
        return $auth.signOut()
    }

    return {
        signIn: signIn,
        user: $user,
        signOut: signOut
    }
}

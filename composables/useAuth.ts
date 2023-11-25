import type {FirebaseAuth} from "@firebase/auth-types";
import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import type {Auth} from "@firebase/auth/cordova";

export function useAuth() {

    const {$auth} = useNuxtApp() as { $auth: Auth }

    async function signIn() {
        await signInWithPopup($auth, new GoogleAuthProvider())
    }

    async function loadUser() {
        await $auth.authStateReady()

        return $auth.currentUser
    }

    return {
        signIn,
        loadUser
    }
}

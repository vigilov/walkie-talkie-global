import type {FirebaseAuth} from "@firebase/auth-types";
import {signInWithPopup, GoogleAuthProvider} from "@firebase/auth";
import type {Auth} from "@firebase/auth/cordova";

export async function useAuth() {

    const {$auth} = useNuxtApp() as { $auth: Auth }

    await $auth.authStateReady()

    const user = ref($auth.currentUser)

    $auth.onAuthStateChanged((user) => {

    });

    async function signIn() {
        await signInWithPopup($auth, new GoogleAuthProvider())
    }

    async function signOut() {
        return $auth.signOut()
    }

    function loadUser() {
        return user
    }

    return {
        signIn,
        loadUser,
        signOut
    }
}

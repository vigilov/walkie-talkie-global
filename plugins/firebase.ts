import {initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";

export default defineNuxtPlugin(async () => {
    const {firebase: cfg} = useRuntimeConfig().public

    const app = initializeApp(cfg);
    const auth = getAuth(app);

    await auth.authStateReady()

    const user = auth.currentUser;

    return {
        provide: {
            app: app,
            auth: auth,
            user: user
        }
    }
})

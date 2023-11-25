import {initializeApp} from "@firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "@firebase/storage";

export default defineNuxtPlugin(async () => {
    const {firebase: cfg} = useRuntimeConfig().public

    const app = initializeApp(cfg);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const storage = getStorage(app)

    await auth.authStateReady()

    const user = ref(auth.currentUser);

    auth.onAuthStateChanged((newUser) => {
        user.value = newUser
    })

    return {
        provide: {
            app,
            auth,
            user,
            firestore,
            storage
        }
    }
})

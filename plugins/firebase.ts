import {initializeApp} from "@firebase/app";
import {getAnalytics} from "@firebase/analytics";
import {getAuth} from "@firebase/auth";

export default defineNuxtPlugin(() => {
    const {firebase: cfg} = useRuntimeConfig().public

    const app = initializeApp(cfg);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

    return {
        provide: {
            fb: app,
            analytics: analytics,
            auth: auth
        }
    }
})

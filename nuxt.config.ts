// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/main.sass', "~/assets/event.sass"],
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        'nuxt-headlessui',
    ],
    runtimeConfig: {
        gpt: {
            token: process.env.OPENAI_TOKEN,
        },
        public: {
            firebase: {
                apiKey: process.env.FIREBASE_API_KEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID,
                measurementId: process.env.FIREBASE_MEASUREMENT_ID,
            }
        }
    },
    headlessui: {
        prefix: 'Headless'
    },
    nitro: {
        firebase: {
            gen: 2
        }
    },
    devtools: {enabled: true}
})

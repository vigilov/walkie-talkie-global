import {getDoc, doc} from '@firebase/firestore'
import type {PublicEvent} from "~/utils/event";

export function useEvent(id: string) {

    const {$user} = useNuxtApp()
    const {SignIn, User} = useAuth()

    const {$firestore} = useNuxtApp()
    const docRef = doc($firestore, "events", id)

    async function load() {
        const event = await getDoc(docRef)
        return event.data()
    }

    async function join() {
        if (!$user.value) {
            await SignIn()
        }

        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent


    }

    return {
        Load: load,
        Join: join
    }
}

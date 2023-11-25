import {getDoc, doc} from '@firebase/firestore'

export function useEvent(id: string) {

    const {$user} = useNuxtApp()

    const {$firestore} = useNuxtApp()
    const docRef = doc($firestore, "events", id)

    async function load() {
        const event = await getDoc(docRef)
        return event.data()
    }

    function join() {
        if (!$user.value) {
            navigateTo('/auth/sign-in?redirect=/events/' + id)
        }
    }

    return {
        Load: load,
        Join: join
    }
}

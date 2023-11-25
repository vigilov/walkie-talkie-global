import {getDoc, doc, updateDoc, onSnapshot} from '@firebase/firestore'
import type {PublicEvent} from "~/utils/event";

export function useEvent(id: string) {

    const {$user} = useNuxtApp()
    const {SignIn, User} = useAuth()

    const {$firestore} = useNuxtApp()
    const docRef = doc($firestore, "events", id)

    let unsubscribeFn: () => void
    const event = ref<PublicEvent>()

    function subscribe() {
        unsubscribeFn = onSnapshot(docRef, (doc) => {
            event.value = doc.data() as PublicEvent
        });

        return event
    }

    function unsubscribe() {
        unsubscribeFn()
    }

    async function join() {
        if (!$user.value) {
            await SignIn()
        }

        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent

        if ($user.value?.uid == data.createdBy) {
            alert('You are the creator of this event')
            return
        }

        if (!data.participants) {
            data.participants = []
        }

        if (data.participants.findIndex(p => p.id == $user.value?.uid) != -1) {
            alert('You are already participating in this event')
            return
        }

        data.participants.push({
            id: $user.value?.uid as string,
            name: $user.value?.displayName as string,
            photoURL: $user.value?.photoURL as string,
            about: $user.value?.email as string,
            chatURL: ''
        })

        await updateDoc(docRef, {'participants': data.participants})
    }

    async function createTeam(name: string, chatURL: string) {
        const eventResp = await getDoc(docRef)
        const event = eventResp.data() as PublicEvent

        if (!event.teams) {
            event.teams = []
        }

        const participants = []
        if (event.createdBy != $user.value?.uid) {
            participants.push($user.value?.uid)
        }

        event.teams.push({name, chatURL, createdAt: new Date(), participants: []})

        await updateDoc(docRef, {'teams': event.teams})
    }

    return {
        Subscribe: subscribe,
        Unsubscribe: unsubscribe,
        Join: join,
        CreateTeam: createTeam
    }
}

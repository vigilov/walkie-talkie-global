import {getDoc, doc, updateDoc, onSnapshot, query, collection, getDocs} from '@firebase/firestore'
import type {PublicEvent} from "~/utils/event";

export function useEvent(id: string) {

    const {$user} = useNuxtApp()
    const {SignIn, User} = useAuth()

    const {$firestore} = useNuxtApp()

    let unsubscribeFn: () => void
    const event = ref<PublicEvent>()

    function subscribe() {
        const docRef = doc($firestore, "events", id)
        unsubscribeFn = onSnapshot(docRef, (doc) => {
            const newEvent = doc.data() as any
            newEvent.id = doc.id
            event.value = newEvent as PublicEvent
        });

        return event
    }

    function unsubscribe() {
        unsubscribeFn()
    }

    async function linkToTeam(team?: Team) {
        if (!team) {
            return
        }

        const docRef = doc($firestore, "events", id)
        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent

        if (!team.participants) {
            team.participants = []
        }
        if (team.participants.findIndex(p => p.id == $user.value?.uid) != -1) {
            alert('You are already participating in this team')
            return
        }

        team.participants.push({
            id: $user.value?.uid as string,
            name: $user.value?.displayName as string,
            photoURL: $user.value?.photoURL as string,
            about: $user.value?.email as string,
            chatURL: ''
        })
        const i = data.teams.findLastIndex(t => t.name == team.name)

        data.teams[i] = team
        data.participants = data.participants.filter(p => p.id != $user.value?.uid)

        await updateDoc(docRef, {'teams': data.teams, 'participants': data.participants})
    }

    async function deleteTeam(team?: Team) {
        if (!team) {
            return
        }
        const docRef = doc($firestore, "events", id)
        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent

        data.teams = data.teams.filter(t => team.name != t.name)

        await updateDoc(docRef, {'teams': data.teams})
    }

    async function leaveTeam(team?: Team) {
        if (!team) {
            return
        }

        const docRef = doc($firestore, "events", id)
        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent

        team.participants = team.participants.filter(p => p.id != $user.value?.uid)

        console.log(data)

        const i = data.teams?.findLastIndex(t => t.name == team.name)
        if (i == undefined || i == -1) {
            return
        }

        data.teams[i] = team

        await updateDoc(docRef, {'teams': data.teams})
    }

    async function join() {
        if (!$user.value) {
            await SignIn()
        }
        const docRef = doc($firestore, "events", id)
        const event = await getDoc(docRef)
        const data = event.data() as PublicEvent

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
        const docRef = doc($firestore, "events", id)
        const eventResp = await getDoc(docRef)
        const event = eventResp.data() as PublicEvent

        if (!event.teams) {
            event.teams = []
        }

        const participants = []
        if (event.createdBy != $user.value?.uid) {
            participants.push($user.value?.uid)
        }

        if (event.teams.findLastIndex(t => t.name == name) != -1) {
            alert('Team with this name already exists')
            return
        }

        event.teams.push({name, chatURL, createdAt: new Date(), participants: []})

        await updateDoc(docRef, {'teams': event.teams})
    }

    return {
        Subscribe: subscribe,
        Unsubscribe: unsubscribe,
        Join: join,
        CreateTeam: createTeam,
        LinkToTeam: linkToTeam,
        LeaveTeam: leaveTeam,
        DeleteTeam: deleteTeam,
    }
}

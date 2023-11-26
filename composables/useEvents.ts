import {addDoc, collection, doc, getDocs, onSnapshot, orderBy, query} from "@firebase/firestore";
import type {PublicEvent} from "~/utils/event";
import {getDownloadURL, getStorage, ref as sRef, uploadBytes} from "@firebase/storage";

export function useEvents(id: string) {
    const {$user} = useNuxtApp()
    const {SignIn, User} = useAuth()
    const {$firestore} = useNuxtApp()
    const storage = getStorage();

    async function uploadCover(cover: File): Promise<string> {
        const storageRef = sRef(storage, 'covers/' + cover.name);
        const result = await uploadBytes(storageRef, cover)
        return getDownloadURL(result.ref)
    }

    async function create(event: PublicEvent) {
        if (!$user.value) {
            await SignIn()
        }

        const eventsRef = collection($firestore, "events")
        const doc = await addDoc(eventsRef, event)
        return doc.id
    }

    let unsubscribeFn: () => void
    const events = ref<Map<string, PublicEvent>>(new Map)

    function subscribe() {
        const q = query(collection($firestore, "events"), orderBy("createdAt", "desc"));

        unsubscribeFn = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                events.value.set(doc.id, <PublicEvent>doc.data());
            });

        });

        return events
    }

    function unsubscribe() {
        unsubscribeFn()
    }

    return {
        Create: create,
        UploadCover: uploadCover,
        Subscribe: subscribe,
        Unsubscribe: unsubscribe,
    }
}
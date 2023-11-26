import {collection, getDocs, query} from "@firebase/firestore";

export function useServices() {

    const {$firestore} = useNuxtApp()

    async function load(filters: string[]) {
        const collectionRef = collection($firestore, "service_areas")
        if (!collectionRef) {
            return []
        }
        const q = query(collectionRef)
        if (!q) {
            return []
        }

        const areas: any[] = []

        try {
            const areasReq = await getDocs(q)
            areasReq.forEach(area => {
                areas.push(area.data())
            })
            if (!areasReq) {
                return []
            }
        } catch (e) {
            console.error(e)
            return []
        }

        return areas
    }

    return {
        Load: load,
    }
}

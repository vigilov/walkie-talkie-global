import type {Participant} from "~/utils/participant";

export interface Team {
    name: string
    chatURL: string
    createdAt: Date
    participants: Participant[]
}

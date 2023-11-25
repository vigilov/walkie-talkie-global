export interface PublicEvent {
    name: string
    description: string
    startedAt: Date
    createdAt: Date
    location: string
    coverURL: string
    createdBy: string
    endedAt: Date
    maxTeamSize: number
    maxParticipants: number
    participationFee: number
    conditionsOfParticipation: string
}

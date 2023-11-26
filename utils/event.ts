export interface PublicEvent {
    name: string
    description: string
    startedAt: string
    publishedAt: Date
    createdAt: Date
    location: string
    channelURL: string
    coverURL: string
    chatURL: string
    createdBy: string
    endedAt: Date
    maxTeamSize: number
    maxParticipants: number
    participationFee: number
    conditionsOfParticipation: string
    participants: Participant[]
    teams: Team[]
}

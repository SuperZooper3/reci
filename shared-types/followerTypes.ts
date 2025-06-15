export type FollowerInput = {
    follower_id: number,
    followee_id: number
}

export type Follower = FollowerInput & {
    id: number,
}
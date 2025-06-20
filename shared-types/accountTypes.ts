export type DisplayName = {display_name: string};

export type AccountInfo = DisplayName & {
  id: number,
  username: string,
  created_at: Date
}

export type Account = AccountInfo & {
  password: string,
}

export type FollowAccountInfo = DisplayName & {
  id: number,
  username: string,
  followed_at: Date
}
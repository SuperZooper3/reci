export type DisplayName = {display_name: string};

export type AccountCreate = DisplayName & {
  password: string,
  username: string,
}

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

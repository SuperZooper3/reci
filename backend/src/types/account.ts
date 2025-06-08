export interface Account {
    id: number;
    displayName: string;
    username: string;
    createdAt: Date;
}

export interface AccountRow {
    id: number;
    display_name: string;
    username: string;
    created_at: Date;
}

export function toAccount(row: AccountRow): Account {
    return {
        id: row.id,
        displayName: row.display_name,
        username: row.username,
        createdAt: row.created_at,
    };
}

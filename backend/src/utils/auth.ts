import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS)
}

export async function comparePassword(hashedPassword: string, candidate: string) {
    return await bcrypt.compare(candidate, hashedPassword)
}

export function signJWT(id:number, display_name:string, username: string) {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    return jwt.sign({ id, display_name, username }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyAndReadJWT(jwtInput: string) {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const answer = jwt.verify(jwtInput, JWT_SECRET) as {id: number, display_name: string, username: string};
    return answer;
}

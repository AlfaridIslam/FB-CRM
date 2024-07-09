// src/types/express-session.d.ts
import 'express-session';

declare module 'express' {
    export interface Request {
        session: Session & Partial<SessionData>;
    }
}

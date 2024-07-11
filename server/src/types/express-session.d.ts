// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
    export interface SessionData {
        passport: {
            user: {
                id: string;
                displayName: string;
                provider: string;
            };
        };
    }
}

declare module 'express' {
    export interface Request {
        session: Session & Partial<SessionData>;
    }
}

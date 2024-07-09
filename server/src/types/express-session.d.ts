// src/types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
    interface SessionData {
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
    interface Request {
        session: Session & Partial<SessionData>;
    }
}

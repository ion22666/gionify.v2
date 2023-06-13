import { HydratedDocument } from "mongoose";

declare namespace NodeJS {
    interface ProcessEnv {
        ENV: "development" | "production";
        MONGODB_USERNAME: string;
        MONGODB_PASSWORD: string;
        MONGODB_PROD_DATABASE_NAME: string;
        MONGODB_DEV_DATABASE_NAME: string;
        JWT_SECRET_KEY: string;
    }
}

export interface DocumentMethods<SanitizedInterface, M = SanitizedInterface> {
    /** Returns an cleaned object safe to sent to front-end */
    sanitize?(this: HydratedDocument<M, DocumentMethods<SanitizedInterface, M>>): SanitizedInterface & { id: string };
}

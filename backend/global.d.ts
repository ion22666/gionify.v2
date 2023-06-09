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

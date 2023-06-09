declare namespace NodeJS {
    interface ProcessEnv {
        ENV: "development" | "production";
        BACKEND_ORIGIN: string;
    }
}

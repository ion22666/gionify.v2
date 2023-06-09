import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => console.log("app is runnin on http://localhost:3000"));
    setTimeout(() => {
        console.log(app);
    }, 5000);
}
bootstrap();



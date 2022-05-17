import { NestFactory } from "@nestjs/core";
import { CentralModule } from "./central.module";

async function bootstrap() {
	const api = await NestFactory.create(CentralModule);
	await api.listen(3000);

	console.info("Central API listening on port 3000");
	console.info("Visit: http://localhost:15672");
}
bootstrap();

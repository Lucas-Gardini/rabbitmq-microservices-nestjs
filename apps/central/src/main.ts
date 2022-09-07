import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { CentralModule } from "./central.module";

async function bootstrap() {
	const api = await NestFactory.create(CentralModule);

	const microservice =
		await NestFactory.createMicroservice<MicroserviceOptions>(
			CentralModule,
			{
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
					],
					queue: process.env.RABBITMQ_QUEUE_NAME,
					queueOptions: {
						durable: false,
					},
				},
			},
		);

	await microservice.listen();
	await api.listen(3000);

	console.info("Central API listening on port 3000");
	console.info("Visit: http://localhost:15672");
}
bootstrap();

import { NestFactory } from "@nestjs/core";
import { RmqOptions, Transport } from "@nestjs/microservices";
import { MicroserviceModule } from "./microservice.module";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<RmqOptions>(
		MicroserviceModule,
		{
			transport: Transport.RMQ, // 5 = RMQ
			options: {
				urls: [
					`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
				],
				queue: process.env.RABBITMQ_QUEUE_NAME,
				prefetchCount: 1,
				noAck: false,
				queueOptions: { durable: false },
			},
		},
	);
	await app.listen();

	console.info("Visit: http://localhost:15672");
}
bootstrap();

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MicroserviceController } from "./microservice.controller";
import { MicroserviceService } from "./microservice.service";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ClientsModule.register([
			{
				name: "microservice",
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
					],
					queue: "central",
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	controllers: [MicroserviceController],
	providers: [MicroserviceService],
})
export class MicroserviceModule {}

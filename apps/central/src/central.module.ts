import { Module } from "@nestjs/common";
import { CentralController } from "./central.controller";
import { ConfigModule } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
// import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true })],
	controllers: [CentralController],
	providers: [
		{
			provide: "MICRO_SERVICE",
			useFactory: () => {
				return ClientProxyFactory.create({
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
				});
			},
		},
	],
})
export class CentralModule {}

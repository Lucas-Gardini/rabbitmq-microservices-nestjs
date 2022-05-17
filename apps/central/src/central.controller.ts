import { Controller, Get, Inject } from "@nestjs/common";
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from "@nestjs/microservices";

@Controller()
export class CentralController {
	private client: ClientProxy;

	constructor() {
		this.client = ClientProxyFactory.create({
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
	}

	@Get()
	getHello(): any {
		return this.client.emit<string, string>("process_message", "Michael");
	}
}

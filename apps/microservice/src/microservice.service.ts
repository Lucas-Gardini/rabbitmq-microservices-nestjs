import { Injectable } from "@nestjs/common";
import { RmqContext } from "@nestjs/microservices";

@Injectable()
export class MicroserviceService {
	async processMessage(data: string, context: RmqContext) {
		console.log("Received");

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
				context.getChannelRef().ack(context.getMessage());
			}, 5000);
		});
	}
}

import { Injectable } from "@nestjs/common";
import { RmqContext } from "@nestjs/microservices";

@Injectable()
export class MicroserviceService {
	async processMessage(data: string, context: RmqContext) {
		console.log("Received -> ", data);

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
				context.getChannelRef().ack(context.getMessage());
				console.log("Acked");
			}, 5000);
		});
	}
}

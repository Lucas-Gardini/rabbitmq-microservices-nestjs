import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class CentralController {
	constructor(@Inject("MICRO_SERVICE") private client: ClientProxy) {}

	@Get()
	async getHello(): Promise<any> {
		return this.client.emit<string, string>("process_message", "message");
	}
}

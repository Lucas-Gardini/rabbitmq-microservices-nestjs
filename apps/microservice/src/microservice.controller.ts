import { Controller } from "@nestjs/common";
import {
	Ctx,
	EventPattern,
	MessagePattern,
	Payload,
	RmqContext,
} from "@nestjs/microservices";
import { MicroserviceService } from "./microservice.service";

@Controller()
export class MicroserviceController {
	constructor(private readonly microserviceService: MicroserviceService) {}

	// A espera de uma mensagem
	@MessagePattern("process_message")
	async processMessage(@Payload() data: string, @Ctx() context: RmqContext) {
		// Avisando que recebeu a mensagem

		return await this.microserviceService.processMessage(data, context);
	}
}

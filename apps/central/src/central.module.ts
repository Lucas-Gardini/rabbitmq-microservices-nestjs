import { Module } from "@nestjs/common";
import { CentralController } from "./central.controller";
import { ConfigModule } from "@nestjs/config";
// import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [CentralController],
	providers: [],
})
export class CentralModule {}

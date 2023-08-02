import { Module } from "@nestjs/common";
import { UserController } from "@uninus/api/controllers";
import { PrismaModule } from "@uninus/api/models";
import { CloudinaryService, EmailService, UserService } from "@uninus/api/services";
import { CloudinaryModule } from "../cloudinary";
import { EmailModule } from "../email";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    PrismaModule,
    EmailModule,
    CloudinaryModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options:{
          host: 'localhost',
          port: 6379
        }
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, EmailService, CloudinaryService],
})
export class PmbModule {}

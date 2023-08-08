import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentModule } from "../student/student.module";
import { GeneralModule } from "../general/general.module";
import { PrismaModule } from "@uninus/api/models";
import { EmailModule } from "@uninus/api/modules";

@Module({
  imports: [PrismaModule, EmailModule, StudentModule, GeneralModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from "bcrypt";

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.pre("save", async function (next){
          const user = this;
          try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash
            return next()
          } catch (error) {
            next(error)
          }
        });
        return schema;
      }
    }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

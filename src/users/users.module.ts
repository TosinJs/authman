import type { ClientOpts } from 'redis';
import * as redisStore from "cache-manager-redis-store";
import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtTokenService } from './jwt/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from "bcrypt";
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail/mail.service';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"
import { join } from 'path';
import { EncryptService } from './encrypt/encrypt.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.pre("save", async function (next){
          const user = this;
          try {
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
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
  ]), 
  CacheModule.register<ClientOpts>({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  }),
  MailerModule.forRootAsync({
    useFactory: async () => ({
      transport: {
        host: process.env.SMTP_HOST,
        port: 2525,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false
        }
      },
      defaults: {
        from: "from@example.com"
      },
      template: {
        dir: join(__dirname, "./mail/templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false
        }
      }
    })
  })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtTokenService, MailService, EncryptService],
})
export class UsersModule {}

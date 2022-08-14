import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtTokenService } from './jwt/jwt.service';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtTokenService,
    ){}

  private async genToken(payload): Promise<responseObj> {
    const idToken = await this.jwtService.generateIdToken(payload, "1d")
    const refreshToken = await this.jwtService.generateRefreshToken(payload, "1Y")
    const accessToken = await this.jwtService.generateAuthToken(payload, "1m")
    return {idToken, refreshToken, accessToken, tokenType: "Bearer"};
  }

  async create(createUserDto: CreateUserDto): Promise<responseObj> {
    const user = new this.userModel()
    user.username = createUserDto.username
    user.password = createUserDto.password

    await user.save()
    const payload = {id: user._id, username: user.username}
    return this.genToken(payload);
  }

  async login(loginUserDto: LoginUserDto): Promise<responseObj> {
    let user = await this.userModel.findOne({ username: loginUserDto.username })
    if (!user) {
      throw new HttpException("Invalid User Credentials", HttpStatus.BAD_REQUEST)
    }
    if (!user.comparePassword(loginUserDto.password)) {
      throw new HttpException("Invalid User Credentials", HttpStatus.BAD_REQUEST)
    }
    const payload = {id: user._id, username: user.username}
    return this.genToken(payload)
  }

  async refresh(refreshToken: RefreshTokenDto) {
    return "refereshed"
    /**
     * Whats Next,
     * Add refresh Token to Redis Cache
     * And Update the Refresh Handler
     * Create a Database to store the authTokens and their credentials
     */
  }
}

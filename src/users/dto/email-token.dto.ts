import { IsNotEmpty, IsString, Length } from "class-validator";

export class EmailTokenDto {
    @IsNotEmpty({
        message: "No User Token Present"
    })
    @IsString()
    token: string
}
  
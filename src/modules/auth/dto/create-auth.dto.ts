import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, MaxLength, MinLength, Validate, ValidateIf } from "class-validator";
import { IsMatch } from "src/common/validation/passwordMatch.validation";

export class LoginAuthDto {
    @IsEmail({
        host_whitelist: ['gmail.com']
    }, {
        message: "Email must be a valid email address and must be from gmail.com"
    })
    email!: string

    @IsStrongPassword({}, {
        message: "password should have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    })
    password!: string;

}

export class CreateAuthDto extends LoginAuthDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    userName!: string;

    // @Validate(ConfirmPasswordMatch)
    @ValidateIf(o => o.password)
    @IsMatch('password')
    confirmPassword!: string;

    @IsOptional()
    @IsPhoneNumber('EG')
    phone!: string;

    @IsEnum(['male', 'female'], {
        message: "Gender must be either male or female"
    })
    gender!: string;

    // @Transform(({ value }) => {
    //     return (value == 'true' || value == '1' || value == 1 || value == true) ? true : false
    // })
    // @IsOptional()
    // @IsBoolean()
    // rememberMe!: boolean
}

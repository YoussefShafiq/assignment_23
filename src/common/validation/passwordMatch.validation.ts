import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "confirmPasswordMatch", async: false })
export class MatchTwoFields implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments) {
        return value == validationArguments?.object[validationArguments.constraints[0]]
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments?.value} does not match ${validationArguments?.constraints[0]}`
    }
}


export function IsMatch(fieldName: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [fieldName],
            validator: MatchTwoFields
        })
    }
}
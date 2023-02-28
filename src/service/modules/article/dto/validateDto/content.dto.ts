import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator'

@ValidatorConstraint({ name: 'validate', async: false })
export class ContentLength implements ValidatorConstraintInterface {
  validate (text: string, validationArguments: ValidationArguments): Promise<boolean> | boolean {
    return text.length > validationArguments.constraints[0] && text.length < validationArguments.constraints[1] // for async validations you must return a Promise<boolean> here
  }

  defaultMessage (validationArguments: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!<br/>test class validator Custom Valid Method decorator'
  }
}

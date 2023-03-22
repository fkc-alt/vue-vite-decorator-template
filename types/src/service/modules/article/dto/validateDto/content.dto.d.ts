import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator'
export declare class ContentLength implements ValidatorConstraintInterface {
  validate (text: string, validationArguments: ValidationArguments): Promise<boolean> | boolean
  defaultMessage (validationArguments: ValidationArguments): string
}
export declare function IsLongerThan (property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void

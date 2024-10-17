import { E164Number } from "libphonenumber-js/core";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "./ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export enum FormFieldType {
  INPUT,
  TEXTAREA,
  PHONE_INPUT,
  CHECKBOX,
  DATE_PICKER,
  SELECT,
  SKELETON,
}

type DefaultCustomFormFieldProps = {
  control: Control<any>;
  name: string;

  label?: string;
  disabled?: boolean;
  className?: string;
};

export type SelectItemType = { key: string; value: string };
type FormFieldSelectType = {
  fieldType: FormFieldType.SELECT;
  children?: React.ReactNode;
  placeholder?: string;
};
type FormFieldInputType = {
  fieldType: FormFieldType.INPUT;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
};
type FormFieldDatePickerType = {
  fieldType: FormFieldType.DATE_PICKER;
  dateFormat: string;
  showTimeSelect: boolean;
};
type FormFieldPhoneType = {
  fieldType: FormFieldType.PHONE_INPUT;
  placeholder?: string;
};
type FormFieldCheckboxType = {
  fieldType: FormFieldType.CHECKBOX;
  description?: string;
};
type FormFieldTextAreaType = {
  fieldType: FormFieldType.TEXTAREA;
  placeholder?: string;
};
type FormFieldSkeletonType = {
  fieldType: FormFieldType.SKELETON;
  render?: (field: any) => React.ReactNode;
};

type CustomFormFieldProps = DefaultCustomFormFieldProps &
  (
    | FormFieldSelectType
    | FormFieldInputType
    | FormFieldDatePickerType
    | FormFieldPhoneType
    | FormFieldCheckboxType
    | FormFieldTextAreaType
    | FormFieldSkeletonType
  );

const RenderInput = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="border-dark-500 bg-dark-400 flex rounded-md border">
          <FormControl>
            <Input
              disabled={props.disabled}
              type={props.type}
              placeholder={props.placeholder}
              {...field}
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={props.placeholder} {...field} disabled={props.disabled} />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            disabled={props.disabled}
            numberInputProps={{ className: "input-phone-input" }}
            defaultCountry="DO"
            countries={["DO"]}
            placeholder={props.placeholder}
            // international
            addInternationalOption={false}
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="border-dark-500 bg-dark-400 flex rounded-md border">
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.render ? props.render(field) : null;
    default:
      return null;
  }
};

export const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderInput field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

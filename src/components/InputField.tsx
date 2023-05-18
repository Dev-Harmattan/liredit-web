import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  ComponentWithAs,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProp = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  textField?: boolean;
};

export const InputField: React.FC<InputFieldProp> = (props) => {
  const [field, { error }] = useField(props);
  let C: ComponentWithAs<'input' | 'textarea', any> = Input;
  if (props.textField) {
    C = Textarea;
  }
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <C
        type={props.type}
        {...field}
        placeholder={props.placeholder}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;

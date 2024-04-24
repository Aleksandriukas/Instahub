import { HelperText, TextInput, TextInputProps } from "react-native-paper";

export type TextFieldProps = {
  validator?: (value: string) => string;
  errorMessage?: string;
  setErrorMessage?: (error: string) => void;
} & TextInputProps;

export const TextField = ({ errorMessage, ...other }: TextFieldProps) => {
  return (
    <>
      <TextInput error={Boolean(errorMessage)} {...other} />
      <HelperText type="error" visible={Boolean(errorMessage)}>
        {errorMessage}
      </HelperText>
    </>
  );
};

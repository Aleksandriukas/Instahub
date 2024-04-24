import { HelperText, TextInput, TextInputProps } from "react-native-paper";

export type TextFieldProps = {
  validator?: () => string;
  errorMessage?: string;
  setErrorMessage?: (error: string) => void;
} & TextInputProps;

export const TextField = ({
  errorMessage,
  setErrorMessage,
  value,
  validator,
  ...other
}: TextFieldProps) => {
  return (
    <>
      <TextInput
        onBlur={() => {
          setErrorMessage?.(validator?.() ?? "");
        }}
        error={Boolean(errorMessage)}
        {...other}
      />
      <HelperText type="error" visible={Boolean(errorMessage)}>
        {errorMessage}
      </HelperText>
    </>
  );
};

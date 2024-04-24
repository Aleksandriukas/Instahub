import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

export type DismissKeyboardViewProps = {} & TouchableWithoutFeedbackProps;

export const DismissKeyboardView = ({ children }: DismissKeyboardViewProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

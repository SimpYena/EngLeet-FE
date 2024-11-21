import { Button } from "@nextui-org/react";

import { ReactNode } from "react";

interface CustomButtonProps {
  children: ReactNode;
  [key: string]: any;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button {...props} className={`${props.className} px-6 rounded-medium`} >
      {children}
    </Button>
  );
};

export { CustomButton }

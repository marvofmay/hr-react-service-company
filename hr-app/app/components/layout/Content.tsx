import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Content;
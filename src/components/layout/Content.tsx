import { Container } from "@mui/material";

interface IBodyProps {
  children: React.ReactElement;
}

export function Content({ children }: IBodyProps) {
  return <Container component={"main"}>{children}</Container>;
}

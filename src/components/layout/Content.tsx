import { Container } from "@mui/material";

interface IBodyProps {
  children: React.ReactElement;
}

export function Content({ children }: IBodyProps) {
  return (
    <Container
      component={"main"}
      sx={{ flex: "1 1", display: "flex", flexDirection: "column" }}
    >
      {children}
    </Container>
  );
}

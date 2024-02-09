interface IBodyProps {
  children: React.ReactElement;
}

export function Content({ children }: IBodyProps) {
  return <main className="Content">{children}</main>;
}

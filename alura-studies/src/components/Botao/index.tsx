import { ReactNode } from "react";
import style from "./Botao.module.scss";

interface BotaoProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

export default function Botao({
  children,
  type = "button",
  onClick,
}: BotaoProps) {
  return (
    <button onClick={onClick} className={style.botao} type={type}>
      {children}
    </button>
  );
}

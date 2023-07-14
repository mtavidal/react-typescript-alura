import ITarefa from "../../types/tarefa";
import Item from "./Item";
import style from "./Lista.module.scss";

interface ListaProps {
  tarefas: ITarefa[];
  selecionaTarefa: (tarefaSelecionada: ITarefa) => void;
}

export default function Lista({ tarefas, selecionaTarefa }: ListaProps) {
  return (
    <aside className={style.listaTarefas}>
      <h2>Estudos do dia</h2>
      <ul>
        {tarefas.map((item) => (
          <Item
            key={item.id}
            selecionaTarefa={selecionaTarefa}
            // tarefa={item.tarefa}
            // tempo={item.tempo}
            {...item}
          />
        ))}
      </ul>
    </aside>
  );
}

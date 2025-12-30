import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard.jsx";

export default function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-72 rounded-sm p-4 bg-gray-200 ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

import { useDraggable } from "@dnd-kit/core";

const severityColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
  Critical: "bg-red-600 text-white",
  Trivial:"bg-gray-300 text-white"
};

export default function KanbanCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        rounded-xl bg-white shadow-sm border border-gray-200
        p-4 cursor-grab select-none transition
        hover:shadow-md
        ${isDragging ? "opacity-50 ring-2 ring-blue-400" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {task.title}
        </h3>

        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full
            ${severityColors[task.severity]}`}
        >
          {task.severity}
        </span>
      </div>

      {/* Meta Info */}
      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Reporter</span>
          <span className="font-medium text-gray-700">
            {task.reporterName}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimate</span>
          <span className="font-medium text-gray-700">
            {task.estimatedFixTimeHours}h
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-gray-400">
          {new Date(task.dateReported).toLocaleDateString()}
        </span>

        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">
          {task.progress}
        </span>
      </div>
    </div>
  );
}

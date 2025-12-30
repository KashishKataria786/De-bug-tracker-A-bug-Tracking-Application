import { DndContext } from "@dnd-kit/core";
import axios from "axios";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Layout from "../components/Layout/Layout.jsx";
import progressStages from "../utils/ProgressLevels.js";
import { toast } from "react-toastify";
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'

const COLUMNS = progressStages;


const Column = lazy(()=>import('../components/Kanban/Column.jsx'))

export default function KanbanPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_BACKEND;

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // Find the task being dragged
    const draggedTask = tasks.find((t) => t._id === active.id);
    if (!draggedTask) return;

    // Check if status actually changed
    if (draggedTask.progress === over.id) return;

    // Optimistically update the UI
    const previousTasks = tasks;
    setTasks((tasks) =>
      tasks.map((task) =>
        task._id === active.id
          ? {
              ...task,
              progress: over.id,
              statusHistory: [
                ...task.statusHistory,
                {
                  status: over.id,
                  changedAt: new Date().toISOString(),
                },
              ],
            }
          : task
      )
    );

    // Update on backend
    try {
      await axios.patch(`${BASE_URL}/change-progress/${active.id}`, {
        progress: over.id,
      });
      toast.success(`Bug status changed to ${over.id}`);
    } catch (error) {
      console.error("Error updating bug status:", error);
      setTasks(previousTasks);
      toast.error("Failed to update bug status");
    }
  }
  const fetchData = async () => {
    setLoading(true);
    try {
      const bugs = await axios.get(`${BASE_URL}/get-bugs`);
      setTasks(bugs?.data?.data);
    } catch (error) {
      toast.error("Not able to Get Data");
      return;
    } finally {
      setLoading(false);
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-xl font-semibold mb-6">Kanban Board</h1>

          <div
            ref={ref}
            className="overflow-x-auto overflow-y-hidden hide-scrollbar"
            onWheel={(e) => {
              if (!ref?.current) return;
              // translate vertical wheel to horizontal scroll
              ref.current.scrollLeft += e.deltaY;
            }}
          >
            <Suspense fallback={<LoadingSpinner/>}>
            <div className="flex gap-6 w-max">
              {COLUMNS.map((column) => (
                
                    <Column
                  key={column}
                  id={column}
                  title={column.toUpperCase()}
                  tasks={tasks.filter((t) => t.progress === column)}
                />
                    
              ))}
            </div>
            </Suspense>
          </div>
        </div>
      </DndContext>
    </Layout>
  );
}

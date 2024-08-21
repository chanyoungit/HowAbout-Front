import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import MenuBar from "./components/Menubar";
import Header from "./components/Header";
import PlanList from "./components/PlanList";
import Sidebar from "./components/Sidebar";
import { Schedule } from "./types/Schedule";
import "./styles/App.css";

const initialSchedules: Schedule[] = [
  {
    id: "1",
    title: "Dating Schedule Title 1",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "2",
    title: "Dating Schedule Title 2",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "3",
    title: "Dating Schedule Title 3",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
  {
    id: "4",
    title: "Dating Schedule Title 4",
    date: "2000.01.01",
    category: "Category",
    location: "Location",
  },
];

const App: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const savedSchedules = localStorage.getItem("schedules");
    return savedSchedules ? JSON.parse(savedSchedules) : initialSchedules;
  });

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(schedules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSchedules(items);
  };

  const addSchedule = () => {
    const newSchedule: Schedule = {
      id: (schedules.length + 1).toString(),
      title: `Dating Schedule Title ${schedules.length + 1}`,
      date: "2000.01.01",
      category: "Category",
      location: "Location",
    };
    setSchedules([...schedules, newSchedule]);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <MenuBar />
        <Header />
        <PlanList />
      </div>
    </div>
  );
};

export default App;

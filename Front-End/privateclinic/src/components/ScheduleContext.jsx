import React, { createContext, useState, useContext } from 'react';

const ScheduleContext = createContext();

export const useScheduleContext = () => {
  return useContext(ScheduleContext);
};

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const refetchScheduleData = () => {
    fetch("https://localhost:7157/api/admin/schedule")
      .then((response) => response.json())
      .then((updatedData) => {
        if (Array.isArray(updatedData.schedules)) {
          setSchedule(updatedData.schedules);
        }
      })
      .catch((error) => console.error("Error fetching updated schedule:", error));
  };

  return (
    <ScheduleContext.Provider
      value={{
        schedule,
        setSchedule,
        isModalOpen,
        setIsModalOpen,
        editingSchedule,
        setEditingSchedule,
        refetchScheduleData
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

import { useState, useEffect, useRef } from "react";
import Header from "./components/header";
import CalendarGrid from "./components/CalendarGrid";
import DayModal from "./components/DayModal";
import BigYearProgress from "./components/BigYearProgress";

function App() {

  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayData, setDayData] = useState({});
  const isInitialLoad = useRef(true);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const savedData = localStorage.getItem("dayData");

    if (savedData) {
      setDayData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    localStorage.setItem("dayData", JSON.stringify(dayData));
  }, [dayData]);

  function getDayKey(day) {
    return `${currentYear}-${currentMonth}-${day}`;
  }

  function saveDayData(day, data) {
    const key = getDayKey(day);

    setDayData((prev) => ({
      ...prev,
      [key]: data
    }));
  }

  function getMonthName(monthIndex) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthIndex];
  }

  return (
    <div>
      <Header />

      <div className="calendar-header">

        <button
          className="month-btn"
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <h2>{getMonthName(currentMonth)} {currentYear}</h2>

        <button
          className="month-btn"
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

      </div>

      <CalendarGrid
        onDayClick={(day) => {
          setSelectedDay(day);
          setIsModalOpen(true);
        }}
        dayData={dayData}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />

      <BigYearProgress dayData={dayData} />

      {isModalOpen && (
        <DayModal
          key={selectedDay}
          day={selectedDay}
          onClose={() => setIsModalOpen(false)}
          onSave={saveDayData}
          existingData={dayData[getDayKey(selectedDay)]}
        />
      )}
    </div>
  );
}

export default App;

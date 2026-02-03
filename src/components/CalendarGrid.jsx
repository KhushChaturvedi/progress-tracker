import { useState } from "react";

function CalendarGrid({ onDayClick, dayData, currentMonth, currentYear }) {

  const daysInMonth = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  const totalDays = daysInMonth[currentMonth];

  const daysArray = [];

  for (let day = 1; day <= totalDays; day++) {
    daysArray.push(day);
  }

  return (
    <div className="calendar-grid">
      {daysArray.map((day) => {
        const dayKey = `${currentYear}-${currentMonth}-${day}`;

        const currentDayData = dayData[dayKey] || {
          prep: false,
          study: false,
          gym: false,
        };

        const completedCount =
          (currentDayData.study ? 1 : 0) +
          (currentDayData.gym ? 1 : 0) +
          (currentDayData.prep ? 1 : 0);

        let dayClass = "day-box";
        if (completedCount === 1) {
          dayClass += " day-yellow";
        } else if (completedCount === 2) {
          dayClass += " day-orange";
        } else if (completedCount === 3) {
          dayClass += " day-green";
        }

        return (
          <div
            key={day}
            className={dayClass}
            onClick={() => {
              console.log("DAY CLICKED:", day);
              onDayClick(day);
            }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;

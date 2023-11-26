// MonthDropdown.js
import React, { useState } from 'react';

const MonthDropdown = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState('January');

  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getFirstAndLastDay = (selectedMonth) => {
    const date = new Date(`${selectedMonth} 1, 2023`);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const offset = new Date().getTimezoneOffset();
  firstDay.setMinutes(firstDay.getMinutes() - offset);
  lastDay.setMinutes(lastDay.getMinutes() - offset);
    return {
        firstDay: firstDay.toISOString().slice(0, 10),
        lastDay: lastDay.toISOString().slice(0, 10)
      };
    };

  const { firstDay, lastDay } = getFirstAndLastDay(selectedMonth);
  console.log({ firstDay, lastDay })
  return (
    <div className="mt-4">
      <label htmlFor="month" className="block text-sm font-medium text-gray-700">
        Select a month:
      </label>
      <select
        id="month"
        name="month"
        className="mt-1 p-2 border border-gray-300 rounded-md"
        onChange={handleChange}
        value={selectedMonth}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700">Selected Month:</p>
        <p className="text-lg font-semibold">{selectedMonth}</p>
        <p className="text-sm font-medium text-gray-700">First Day:</p>
        <p className="text-lg font-semibold">{firstDay}</p>
        <p className="text-sm font-medium text-gray-700">Last Day:</p>
        <p className="text-lg font-semibold">{lastDay}</p>
      </div>
    </div>
  );
};

export default MonthDropdown;

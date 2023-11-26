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
    <div className="flex">
    <div className="mt-4 flex pr-4">
      <label htmlFor="month" className="block text-sm font-medium text-gray-700 w-24">
        Select a month :
      </label>
      <select
        id="month"
        name="month"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleChange}
        value={selectedMonth}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      </div>

      <div className="mt-6 flex">
        <p className="text-sm font-medium text-gray-700">Selected Month:</p>
        <p className="text-sm font-medium pl-1">{selectedMonth}</p>
        <p className="text-sm font-medium pl-10">Start:</p>
        <p className="text-sm font-medium pl-1">{firstDay}</p>
        <p className="text-sm font-medium pl-10">End:</p>
        <p className="text-sm font-medium pl-1">{lastDay}</p>
      </div>
    </div>
  );
};

export default MonthDropdown;

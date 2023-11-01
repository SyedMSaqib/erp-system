import React, { useState } from 'react';

const Sidebar = () => {
  const [menuData, setMenuData] = useState([
    {
      label: 'Inventory',
      isOpen: false,
      subMenu: [
        { label: 'Inventory Sub-menu Item 1' },
        { label: 'Inventory Sub-menu Item 2' },
      ],
    },
    {
      label: 'Customers',
      isOpen: false,
      subMenu: [
        { label: 'Customers Sub-menu Item 1' },
        { label: 'Customers Sub-menu Item 2' },
      ],
    },
    // Add more menu items and sub-menus as needed
  ]);

  const toggleSubMenu = (index) => {
    const updatedMenuData = [...menuData];
    updatedMenuData[index].isOpen = !updatedMenuData[index].isOpen;
    setMenuData(updatedMenuData);
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64">
      <div className="p-4">
        <div className="text-2xl font-bold">Sidebar</div>
      </div>
      <ul className="p-4">
        {menuData.map((menuItem, index) => (
          <li className="my-2" key={index}>
            <a
              href="#"
              className="hover:bg-gray-700 px-4 py-2 block"
              onClick={() => toggleSubMenu(index)}
            >
              {menuItem.label}
            </a>
            {menuItem.isOpen && (
              <ul className="ml-4">
                {menuItem.subMenu.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <a href="#" className="hover:bg-gray-700 px-4 py-2 block">
                      {subMenuItem.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

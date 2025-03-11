import {
  ContainerOutlined,
  DesktopOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RiDashboard3Line, RiExchangeDollarLine } from "react-icons/ri";
import { Menu } from "antd";
import { GiReturnArrow } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";

const sidebarItems = [
  {
    key: "1",
    icon: <RiDashboard3Line />,
    label: <Link to="/" className="font-semibold"> Dashboard</Link>,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: <span className="font-semibold">Investment</span>,
    children: [
      {
        key: "2-1",
        label: <Link to='/overview'>Overview</Link>,
      },
      {
        key: "2-2",
        label: <Link to='/sendinventory'>Send Inventory</Link>,
      },
    ],
  },
  {
    key: "3",
    icon: <GiReturnArrow />,
    label: <Link to="/productReturn" className="font-semibold">Product Return</Link>,
  },
  {
    key: "4",
    icon: <FaUsers />,
    label: <Link to="/prep" className="font-semibold">Prep</Link>,
  },
  {
    key: "5",
    icon: <ContainerOutlined />,
    label: <span className="font-semibold">Billing</span>,
    children: [
      {
        key: "5-1",
        label: <Link to="billingOverview">Overview</Link>,
      },
      {
        key: "5-2",
        label: <Link to="/payment">Payment</Link>,
      },
    ],
  },
  {
    key: "6",
    icon: <ContainerOutlined />,
    label: <span className="font-semibold">Integration</span>,
    children: [
      {
        key: "6-1",
        label: <Link>Amazon</Link>,
      },
      {
        key: "6-2",
        label: <Link>Shopify</Link>,
      },
    ],
  },
  {
    key: "7",
    icon: <RiExchangeDollarLine />,
    label: <Link to="/rates" className="font-semibold">Rates</Link>,
  },
  {
    key: "8",
    icon: <RiExchangeDollarLine />,
    label: <Link to="/reports" className="font-semibold">Reports</Link>,
  },
];

const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
   <div>
     <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleClick}
      items={sidebarItems}
      style={{
        height: "80%",
        borderRight: 0,
      }}
      theme="light" // Keep menu in light theme
    />
     <div className="p-4 border-t flex flex-col gap-4 bottom-0 bg-white">
        <div className="flex items-center gap-2">
          <SettingOutlined />
          <Link to="/settings" className="font-semibold">Settings</Link>
        </div>
        <div className="flex items-center gap-2">
          <LogoutOutlined />
          <Link className="font-semibold">Log Out</Link>
        </div>
      </div>
   </div>
  );
};

export default Sidebar;

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const StatusDropdown = ({ status, onChange }) => {
  const statuses = ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"];
  
  return (
    <Select
      value={status}
      onChange={onChange}
      style={{ width: 150 }}
      className="status-select"
    >
      {statuses.map((s) => (
        <Option key={s} value={s}>
          {s}
        </Option>
      ))}
    </Select>
  );
};

export default StatusDropdown;

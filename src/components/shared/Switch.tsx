import React from 'react';
import Switch from 'react-switch';

interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="flex items-center space-x-2">
      {label && (
        <span className="text-gray-700">
          {label}
        </span>
      )}
      <Switch
        onChange={onChange}
        checked={checked}
        offColor="#D1D5DB"
        onColor="#2F6A4C"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        height={24}
        width={48}
        className="react-switch"
      />
    </label>
  );
};

export default CustomSwitch;

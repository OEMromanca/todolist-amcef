import React from 'react';
import Dropdown, { Option, ReactDropdownProps } from 'react-dropdown';
import 'react-dropdown/style.css';

interface DropdownProps {
  options: ReactDropdownProps['options'];
  onSelect: (selected: string) => void;
  selectedOption: string | Option;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  selectedOption,
}) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef}>
      <Dropdown
        options={options}
        onChange={handleSelect}
        value={selectedOption}
        placeholder='Select an option'
        className='myClassName'
        controlClassName='rounded-md border border-gray-300 py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 pl-2 h-10'
        menuClassName={`myMenuClassName bg-white border border-gray-300 shadow-lg mt-1 ${
          isOpen ? 'block' : 'hidden'
        }`}
        arrowClassName='myArrowClassName'
        placeholderClassName='myPlaceholderClassName'
        onFocus={toggleDropdown}
      />
    </div>
  );
};

export default CustomDropdown;

import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { DropdownResponse } from '../../types/DropdownResponse';

type DropdownProps = {
  options: { label: string; value: string }[];
  handleChange: (data: DropdownResponse) => void;
  currentValue: { label: string; value: string };
};

const customStyles: StylesConfig = {
  indicatorSeparator: () => ({ display: 'none' }),
};

export const Dropdown = ({
  options,
  handleChange,
  currentValue,
}: DropdownProps) => {
  return (
    <div className="dropdown">
      <Select
        options={options}
        value={currentValue}
        onChange={(change) => handleChange(change as DropdownResponse)}
        className="dropdown__select"
        isSearchable={false}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary50: '#fafbfc',
            primary25: '#fafbfc',
            primary: '#b4bdc3',
          },
        })}
      />
    </div>
  );
};

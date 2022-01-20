import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
        label: options[optionName].name,
        value: options[optionName]._id
      }))
      : options;
  const addDefaultValue = defaultValue.map((item) => ({
    label: item.name,
    value: item._id
  }));

  const handleChange = (selectedOptions) => {
    const delDefaultValue = selectedOptions.reduce((acc, { value: id }) => {
      const item = Object.values(options).find((item) => {
        return id === item._id;
      });
      if (item === undefined) {
        return acc;
      }
      return [...acc, item];
    }, []);
    onChange({ name: name, value: delDefaultValue });
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        defaultValue={addDefaultValue}
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;

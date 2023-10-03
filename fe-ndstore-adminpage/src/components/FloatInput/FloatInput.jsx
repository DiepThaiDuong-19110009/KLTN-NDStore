import { Input, Select } from 'antd';
import { useState } from 'react';
import './FloatInput.scss';

function FloatInput(props) {
  const [focus, setFocus] = useState(false);
  let {
    label,
    value,
    placeholder,
    type,
    required,
    category,
    children,
    error,
    onBlur,
  } = props;

  const { Option } = Select;

  if (!placeholder) placeholder = label;

  const isOccupied = focus || (value && value.length !== 0);

  let labelClass = '';
  if (isOccupied && !error) {
    labelClass = 'label as-label ';
  } else if (error) {
    labelClass = 'label as-error';
  } else {
    labelClass = 'label as-placeholder';
  }

  const requiredMark = required ? <span className="text-danger">*</span> : null;

  const renderComponent = (param) => {
    switch (param) {
      case 'select':
        return (
          <Select style={{ width: '100%' }} onChange={props.onChange} value={value}>
            {children.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        );
      case 'password':
        return (
          <Input.Password
            onChange={props.onChange}
            type={type}
            defaultValue={value}
            value={value}
            className="float-input"
            autoComplete="new-password"
            status={error ? 'error' : ''}
            onBlur={onBlur}
          />
        );
      default:
        return (
          <Input
            onChange={props.onChange}
            type={type}
            defaultValue={value}
            value={value}
            onBlur={props.onBlur}
            className="float-input"
            autoComplete="off"
            status={error ? 'error' : ''}
          />
        );
    }
  };

  return (
    <div className="float-label" onBlur={() => setFocus(false)} onFocus={() => setFocus(true)}>
      {renderComponent(category)}
      <label className={labelClass}>
        {isOccupied ? label : placeholder} {requiredMark}
      </label>
    </div>
  );
}

export default FloatInput;

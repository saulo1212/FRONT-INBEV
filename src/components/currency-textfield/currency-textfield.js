import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

import { TextField } from '@mui/material';

const CustomTextField = (props) => <TextField {...props} fullWidth variant="outlined" />;

export default function NumberFormat({
  label,
  valueKey,
  keyFrom,
  onChangeForm,
  enablePrefix = true,
}) {
  return (
    <NumericFormat
      label={label}
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator="."
      allowNegative={false}
      customInput={CustomTextField}
      value={Number(valueKey).toFixed(2)}
      prefix={enablePrefix ? 'R$ ' : ''}
      onValueChange={(values) => onChangeForm(keyFrom)({ target: { value: values.floatValue } })}
    />
  );
}

NumberFormat.propTypes = {
  label: PropTypes.string,
  keyFrom: PropTypes.string,
  valueKey: PropTypes.string,
  onChangeForm: PropTypes.func,
  enablePrefix: PropTypes.bool,
};

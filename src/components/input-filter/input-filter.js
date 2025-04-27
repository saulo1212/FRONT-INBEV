import React from 'react';
import PropTypes from 'prop-types';

import { ClearButton, TextField } from './styles';

const InputFilter = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      value={filterText}
      onChange={onFilter}
      placeholder="Pesquisar..."
    />
    <ClearButton color="primary" size="small" onClick={onClear}>
      X
    </ClearButton>
  </>
);

InputFilter.propTypes = {
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  filterText: PropTypes.string,
};

export default InputFilter;

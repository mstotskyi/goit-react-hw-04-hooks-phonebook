import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export function Filter({ handleOnChangefilter }) {
  const IdFilter = uuid();

  return (
    <>
      <label htmlFor={IdFilter}>Find contacts by name</label>
      <br />
      <input
        id={IdFilter}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={handleOnChangefilter}
      />
    </>
  );
}

Filter.propTypes = {
  handleOnChangefilter: PropTypes.func,
};

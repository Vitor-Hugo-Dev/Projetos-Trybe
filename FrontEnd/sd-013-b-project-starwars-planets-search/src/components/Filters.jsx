import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PersonalFilter from './PersonalFilter';

const ARRAY_OPTIONS = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

export default function Filters() {
  const { filters, setFilter } = useContext(PlanetsContext);

  const [options, setOptions] = useState(ARRAY_OPTIONS);

  const [preFilter, setPrefilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const { column, comparison, value } = preFilter;
  const handleChange = ({ target }) => {
    setPrefilter({ ...preFilter, [target.name]: target.value });
  };

  return (
    <form>
      <h2>Pesquisar por:</h2>
      <label htmlFor="filter-name">
        Nome do planeta:
        <input
          id="filter-name"
          type="text"
          value={ filters.filterByName.name }
          data-testid="name-filter"
          onChange={ ({ target }) => setFilter({
            ...filters,
            filterByName: { name: target.value },
          }) }
        />
      </label>
      <label htmlFor="column">
        Categoria:
        <select
          onChange={ handleChange }
          value={ column }
          name="column"
          id="column"
          data-testid="column-filter"
        >
          {options.map((item) => (
            <option key={ item } id={ item } value={ item }>{item}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          onChange={ handleChange }
          value={ comparison }
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label
        htmlFor="number-input"
      >
        <input
          onChange={ handleChange }
          value={ value }
          type="number"
          name="value"
          id="number-input"
          data-testid="value-filter"
        />
      </label>
      <button
        onClick={ () => {
          const father = document.getElementById('column'); // req 4 feito com a ajuda do Victor mendonça
          const child = document.getElementById(column);
          father.removeChild(child);
          setOptions([
            ...options,
          ]);
          setFilter({
            ...filters,
            filterByNumericValues: [...filters.filterByNumericValues,
              preFilter,
            ],
          });
        } }
        type="button"
        data-testid="button-filter"
      >
        Criar filtro
      </button>
      <PersonalFilter />
    </form>
  );
}

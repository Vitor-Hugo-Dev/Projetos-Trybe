import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const ARRAY_HEADER = ['Planet',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'Link'];

function Table() {
  const {
    data,
    filters: { filterByName: { name },
      filterByNumericValues } } = useContext(PlanetsContext);
  if (data === undefined) {
    return <p>...loading</p>;
  }
  // função abaixo feita com a ajuda do felipe ventorim.
  // sujestão de refatoração: usar um switch.
  const xablau = (plan, index) => {
    if (filterByNumericValues.length <= index) return true;
    if (filterByNumericValues[index].comparison === 'maior que') {
      return Number(plan[filterByNumericValues[index].column])
      > Number(filterByNumericValues[index].value);
    }
    if (filterByNumericValues[index].comparison === 'menor que') {
      return Number(plan[filterByNumericValues[index].column])
      < Number(filterByNumericValues[index].value);
    }
    if (filterByNumericValues[index].comparison === 'igual a') {
      return Number(plan[filterByNumericValues[index].column])
      === Number(filterByNumericValues[index].value);
    }
  };
  return (
    <table border="1 px">
      <tbody>
        <tr>
          {ARRAY_HEADER.map((head) => (
            <th key={ head }>{head}</th>
          ))}
        </tr>
        {data.filter((plan) => plan.name.toLowerCase().includes(name.toLowerCase()))
          .filter((plan) => (xablau(plan, 0)))
          .filter((plan) => (xablau(plan, 1)))
          .map((plan) => (
            <tr key={ plan.name }>
              <td>{plan.name}</td>
              <td>{plan.rotation_period}</td>
              <td>{plan.orbital_period}</td>
              <td>{plan.diameter}</td>
              <td>{plan.climate}</td>
              <td>{plan.gravity}</td>
              <td>{plan.terrain}</td>
              <td>{plan.surface_water}</td>
              <td>{plan.population}</td>
              <td>{plan.films.length}</td>
              <td>{plan.created}</td>
              <td>{plan.edited}</td>
              <td>{plan.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;

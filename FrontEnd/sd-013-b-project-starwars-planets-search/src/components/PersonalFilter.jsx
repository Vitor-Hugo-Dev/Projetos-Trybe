import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function PersonalFilter() {
  const { filters: { filterByNumericValues } } = useContext(PlanetsContext);
  // console.log(filterByNumericValues);
  return (
    <div>
      {filterByNumericValues.map((fil) => (
        <span key={ fil.column }>
          <p>{`${fil.column} ${fil.comparison} ${fil.value}`}</p>
          <button type="button">Excluir</button>
        </span>
      ))}
    </div>
  );
}

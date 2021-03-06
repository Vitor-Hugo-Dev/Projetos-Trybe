SELECT CONCAT(e.FirstName, ' ', e.LastName) AS  `Nome completo`,
COUNT(*) AS `Total de pedidos` 
FROM w3schools.employees  AS e
JOIN w3schools.orders AS o ON e.EmployeeID = o.EmployeeID
GROUP BY e.EmployeeID
ORDER BY `Total de pedidos` ;

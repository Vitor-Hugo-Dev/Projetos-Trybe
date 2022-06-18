SELECT p.ProductName AS `Produto`,
MIN(d.Quantity) AS `Mínima`,
MAX(d.Quantity) AS `Máxima`,
ROUND(AVG(d.Quantity), 2) AS `Média`
FROM w3schools.order_details AS d
JOIN w3schools.products AS p ON p.ProductID = d.ProductID
GROUP BY p.ProductID
HAVING AVG(d.Quantity) > 20
ORDER BY `Média`, `Produto`
;

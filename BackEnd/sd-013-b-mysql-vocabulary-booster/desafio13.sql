SELECT p.ProductName AS `Produto`,
p.Price AS `Preço` 
FROM w3schools.products AS p
JOIN w3schools.order_details AS d ON d.ProductID = p.ProductID
WHERE d.Quantity > 80
ORDER BY `Produto`
;

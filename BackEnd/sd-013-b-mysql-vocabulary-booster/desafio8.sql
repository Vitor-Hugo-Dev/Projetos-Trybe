SELECT o.OrderDate AS `Data do pedido`,
c.ContactName AS `Nome de contato`,
s.ShipperName AS `Empresa que fez o envio`
FROM w3schools.orders AS o
JOIN w3schools.customers AS c ON o.CustomerID = c.CustomerID
JOIN w3schools.shippers AS s ON o.ShipperID = s.ShipperID
WHERE s.ShipperID BETWEEN 1 AND 2
ORDER BY `Nome de contato`, s.ShipperName, o.OrderDate;

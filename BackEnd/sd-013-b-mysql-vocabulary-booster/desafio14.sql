(SELECT Country AS `País` FROM w3schools.customers)
UNION
(SELECT Country AS `País` FROM w3schools.suppliers)
ORDER BY `País` -- feito com ajuda do josé luis Demeneghi
LIMIT 5
;

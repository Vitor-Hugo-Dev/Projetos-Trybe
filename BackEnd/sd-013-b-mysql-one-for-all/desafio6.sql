CREATE VIEW faturamento_atual AS
SELECT MIN(p.valor) AS `faturamento_minimo`,
MAX(p.valor) AS `faturamento_maximo`,
ROUND(AVG(p.valor), 2) AS `faturamento_medio`,
SUM(p.valor) AS `faturamento_total`
FROM SpotifyClone.Usuarios as u
JOIN SpotifyClone.Planos AS p ON u.plano_id = p.plano_id
;

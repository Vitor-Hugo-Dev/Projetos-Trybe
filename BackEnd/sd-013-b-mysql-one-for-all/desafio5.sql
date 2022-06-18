CREATE VIEW top_2_hits_do_momento AS
SELECT c.cancao_nome AS `cancao`,
COUNT(*) AS `reproducoes` 
FROM SpotifyClone.Historico AS h
JOIN SpotifyClone.Cancoes AS c ON h.cancao_id = c.cancao_id
GROUP BY c.cancao_id
ORDER BY `reproducoes` DESC, `cancao`
LIMIT 2
;

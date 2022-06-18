CREATE VIEW top_3_artistas AS
SELECT a.artista_nome AS `artista`,
count(*) AS `seguidores`
FROM SpotifyClone.Seguindo_artista AS s
JOIN SpotifyClone.Artistas AS a ON a.artista_id = s.artista_id
GROUP BY s.artista_id
ORDER BY `seguidores` DESC, `artista`
LIMIT 3
;

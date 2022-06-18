CREATE VIEW perfil_artistas AS
SELECT ar.artista_nome AS `artista`,
a.album_nome AS `album`,
COUNT(s.usuario_id) AS `seguidores` 
FROM SpotifyClone.Albuns AS a
JOIN SpotifyClone.Artistas AS ar ON a.artista_id = ar.artista_id
JOIN SpotifyClone.Seguindo_artista AS s ON s.artista_id = ar.artista_id
GROUP BY a.album_id
ORDER BY `seguidores` DESC, `artista`, `album`
;

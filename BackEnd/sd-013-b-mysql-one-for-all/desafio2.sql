CREATE VIEW estatisticas_musicais AS
SELECT COUNT(cancao_id) AS `cancoes`,
(
SELECT COUNT(artista_id) 
FROM SpotifyClone.Artistas
) AS `artistas`,
(
SELECT COUNT(album_id)
FROM SpotifyClone.Albuns
) AS `albuns`
FROM SpotifyClone.Cancoes
;

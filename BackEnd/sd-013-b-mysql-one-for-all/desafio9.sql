DELIMITER $$
CREATE PROCEDURE albuns_do_artista(IN par VARCHAR(50))
BEGIN
SELECT ar.artista_nome AS `artista`,
al.album_nome AS `album` 
FROM SpotifyClone.Artistas AS ar
JOIN SpotifyClone.Albuns AS al on al.artista_id = ar.artista_id
WHERE ar.artista_nome = par
ORDER BY `album`
;
END $$
DELIMITER ;

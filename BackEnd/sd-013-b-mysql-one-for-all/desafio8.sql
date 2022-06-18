DELIMITER $$
CREATE TRIGGER trigger_usuario_delete 
BEFORE DELETE ON SpotifyClone.Usuarios
FOR EACH ROW
BEGIN
DELETE FROM SpotifyClone.Seguindo_artista
WHERE usuario_id = OLD.usuario_id;
DELETE FROM SpotifyClone.Historico
WHERE usuario_id = OLD.usuario_id;
END $$
DELIMITER ;

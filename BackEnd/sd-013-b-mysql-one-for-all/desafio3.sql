CREATE VIEW historico_reproducao_usuarios AS
SELECT u.usuario_nome AS `usuario`,
c.cancao_nome AS `nome` 
FROM SpotifyClone.Historico AS h
JOIN SpotifyClone.Usuarios AS u ON u.usuario_id = h.usuario_id
JOIN SpotifyClone.Cancoes AS c ON c.cancao_id = h.cancao_id
ORDER BY `usuario`, `nome`
;

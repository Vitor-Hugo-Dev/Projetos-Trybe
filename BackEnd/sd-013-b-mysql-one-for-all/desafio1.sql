DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE Artistas(
artista_id INT PRIMARY KEY AUTO_INCREMENT,
artista_nome VARCHAR(50) NOT NULL
);
INSERT INTO Artistas(artista_nome) VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

CREATE TABLE Planos(
plano_id INT PRIMARY KEY AUTO_INCREMENT,
plano_nome VARCHAR(20) NOT NULL,
valor DECIMAL(10, 2) NOT NULL
);
INSERT INTO Planos(plano_nome, valor) VALUES
('gratuito', 0.00),
('familiar', 7.99),
('universitário', 5.99);

CREATE TABLE Albuns(
album_id INT PRIMARY KEY AUTO_INCREMENT,
album_nome VARCHAR(50) NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES Artistas (artista_id)
);
INSERT INTO Albuns(album_nome, artista_id) 
VALUES
('Envious', 1),
('Exuberant', 1),
('Hallowed Steam', 2),
('Incandescent', 3),
('Temporary Culture', 4);

CREATE TABLE Usuarios(
usuario_id INT PRIMARY KEY AUTO_INCREMENT,
usuario_nome VARCHAR(50) NOT NULL,
idade INT NOT NULL,
plano_id INT NOT NULL,
FOREIGN KEY (plano_id) REFERENCES Planos (plano_id)
);
INSERT INTO Usuarios(usuario_nome, idade, plano_id) VALUES
('Thati', 23, 1),
('Cintia', 35, 2),
('Bill', 20, 3),
('Roger', 45, 1);

CREATE TABLE Cancoes(
cancao_id INT PRIMARY KEY AUTO_INCREMENT,
cancao_nome VARCHAR(100) NOT NULL,
album_id INT NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES Albuns (album_id),
FOREIGN KEY (artista_id) REFERENCES Artistas (artista_id)
);
INSERT INTO Cancoes(cancao_nome, album_id, artista_id) VALUES
('Soul For Us', 1, 1),
('Reflections Of Magic', 1, 1),
('Dance With Her Own', 1, 1),
('Troubles Of My Inner Fire', 2, 1),
('Time Fireworks', 2, 1),
('Magic Circus', 3, 2),
('Honey, So Do I', 3, 2),
("Sweetie, Let's Go Wild", 3, 2),
('She Knows', 3, 2),
('Fantasy For Me', 4, 3),
('Celebration Of More', 4, 3),
('Rock His Everything', 4, 3),
('Home Forever', 4, 3),
('Diamond Power', 4, 3),
("Honey, Let's Be Silly", 4, 3),
('Thang Of Thunder', 5, 4),
('Words Of Her Life', 5, 4),
('Without My Streets', 5, 4);

CREATE TABLE Historico(
cancao_id INT NOT NULL,
usuario_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (cancao_id, usuario_id),
FOREIGN KEY (cancao_id) REFERENCES Cancoes (cancao_id),
FOREIGN KEY (usuario_id) REFERENCES Usuarios (usuario_id)
);
INSERT INTO Historico(cancao_id, usuario_id) VALUES
(1, 1), (6,1), (14, 1), (16, 1), (13, 2), (17, 2), (2, 2), (15, 2), (4, 3), (16, 3), (6, 3), (3, 4), (18, 4), (11, 4);

CREATE TABLE Seguindo_artista(
artista_id INT NOT NULL,
usuario_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (artista_id, usuario_id),
FOREIGN KEY (artista_id) REFERENCES Artistas (artista_id),
FOREIGN KEY (usuario_id) REFERENCES Usuarios (usuario_id)
);
INSERT INTO Seguindo_artista(artista_id, usuario_id) VALUES
(1,1), (1, 2), (1, 3), (2, 3), (3, 1), (3, 2), (4, 1), (4 ,4);

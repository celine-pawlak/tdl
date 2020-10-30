-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 30 oct. 2020 à 14:51
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tdl`
--

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `idList` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_idUserAdmin` int(11) NOT NULL,
  PRIMARY KEY (`idList`),
  UNIQUE KEY `idgrouplist_UNIQUE` (`idList`),
  KEY `fk_list_user1_idx` (`user_idUserAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `list`
--

INSERT INTO `list` (`idList`, `name`, `date`, `user_idUserAdmin`) VALUES
(19, 'TodoList', '2020-10-30 13:35:43', 45),
(20, 'Projet pro', '2020-10-30 13:37:06', 45),
(21, 'Ma liste', '2020-10-30 13:39:34', 46);

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `idTask` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `complete` tinyint(4) NOT NULL DEFAULT 0,
  `list_idList` int(11) NOT NULL,
  PRIMARY KEY (`idTask`),
  UNIQUE KEY `idlist_UNIQUE` (`idTask`),
  KEY `fk_task_list1_idx` (`list_idList`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `task`
--

INSERT INTO `task` (`idTask`, `name`, `date`, `complete`, `list_idList`) VALUES
(1, 'Module connexion', '2020-10-30 13:35:55', 1, 19),
(2, 'Page d\'accueil', '2020-10-30 13:36:07', 1, 19),
(4, 'Maquette', '2020-10-30 13:37:10', 1, 20),
(5, 'Cahier des charges', '2020-10-30 13:37:15', 0, 20),
(6, 'Des choses', '2020-10-30 13:39:40', 0, 21),
(7, 'A', '2020-10-30 13:39:46', 0, 21),
(8, 'Faire', '2020-10-30 13:39:51', 0, 21);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `iduser_UNIQUE` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `mail`, `username`, `password`) VALUES
(45, 'test@test.fr', 'test', '$2y$10$zU4h53c6j8DuD9koCfwhJeJJLLQjkOYGG3dCbJ7cNOF/KKz/XZo9G'),
(46, 'visiteur@visiteur.fr', 'visiteur', '$2y$10$/U5rPlAJ4rFKzgmetpkMpecj3n6HaLS0H2kBrm6TUtBa1SnditXWS');

-- --------------------------------------------------------

--
-- Structure de la table `user_list`
--

DROP TABLE IF EXISTS `user_list`;
CREATE TABLE IF NOT EXISTS `user_list` (
  `user_idUser` int(11) NOT NULL,
  `list_idList` int(11) NOT NULL,
  PRIMARY KEY (`user_idUser`,`list_idList`),
  KEY `fk_user_has_grouplist1_grouplist1_idx` (`list_idList`),
  KEY `fk_user_has_grouplist1_user1_idx` (`user_idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_list`
--

INSERT INTO `user_list` (`user_idUser`, `list_idList`) VALUES
(45, 19),
(45, 20),
(46, 21);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `fk_list_user1` FOREIGN KEY (`user_idUserAdmin`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `idlist` FOREIGN KEY (`list_idList`) REFERENCES `list` (`idList`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_list`
--
ALTER TABLE `user_list`
  ADD CONSTRAINT `fk_user_has_grouplist1_grouplist1` FOREIGN KEY (`list_idList`) REFERENCES `list` (`idList`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_grouplist1_user1` FOREIGN KEY (`user_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

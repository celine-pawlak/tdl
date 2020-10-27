-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mar. 27 oct. 2020 à 19:42
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
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_idUserAdmin` int(11) NOT NULL,
  PRIMARY KEY (`idList`),
  UNIQUE KEY `idgrouplist_UNIQUE` (`idList`),
  KEY `fk_list_user1_idx` (`user_idUserAdmin`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `list`
--

INSERT INTO `list` (`idList`, `name`, `date`, `user_idUserAdmin`) VALUES
(1, 'Liste1', '2020-10-20 22:00:00', 1),
(17, 'liste2', '2020-10-27 14:37:34', 1),
(18, 'liste3', '2020-10-27 14:48:35', 1),
(19, 'tache', '2020-10-27 19:14:55', 1);

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `idTask` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `complete` tinyint(4) NOT NULL DEFAULT 0,
  `list_idList` int(11) NOT NULL,
  PRIMARY KEY (`idTask`),
  UNIQUE KEY `idlist_UNIQUE` (`idTask`),
  KEY `fk_task_list1_idx` (`list_idList`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `task`
--

INSERT INTO `task` (`idTask`, `name`, `date`, `complete`, `list_idList`) VALUES
(11, 'test', '2020-10-26 23:00:00', 0, 1),
(13, 'test', '2020-10-27 15:05:00', 0, 1),
(14, 'lul', '2020-10-27 15:05:29', 0, 17),
(17, 'caca', '2020-10-27 19:13:52', 1, 18),
(20, 'linjnuuhuh', '2020-10-27 19:09:52', 0, 18),
(21, 'Faire  marcher le hibou', '2020-10-27 19:15:11', 0, 19),
(22, 'Prendre des cours de galÃ©jade', '2020-10-27 19:15:36', 0, 19),
(23, 'Arreter de dire que Damien est mÃ©chant', '2020-10-27 19:15:53', 0, 19),
(24, 'Faire des bisous Ã  Damien', '2020-10-27 19:16:13', 0, 19);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `mail`, `username`, `password`) VALUES
(1, 'admin@admin.com', 'admin', 'admin');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user_list`
--

INSERT INTO `user_list` (`user_idUser`, `list_idList`) VALUES
(1, 1),
(1, 17),
(1, 18),
(1, 19);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `list`
--
ALTER TABLE `list`
  ADD CONSTRAINT `fk_list_user1` FOREIGN KEY (`user_idUserAdmin`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `idlist` FOREIGN KEY (`list_idList`) REFERENCES `list` (`idList`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_list`
--
ALTER TABLE `user_list`
  ADD CONSTRAINT `fk_user_has_grouplist1_grouplist1` FOREIGN KEY (`list_idList`) REFERENCES `list` (`idList`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_has_grouplist1_user1` FOREIGN KEY (`user_idUser`) REFERENCES `user` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

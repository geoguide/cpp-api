# ************************************************************
# Sequel Pro SQL dump
# Version 4529
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: cbb
# Generation Time: 2018-11-12 15:34:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ben_tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ben_tasks`;

CREATE TABLE `ben_tasks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ben_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ben_task_uniq` (`ben_id`,`task_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `ben_tasks` WRITE;
/*!40000 ALTER TABLE `ben_tasks` DISABLE KEYS */;

INSERT INTO `ben_tasks` (`id`, `ben_id`, `task_id`, `date_created`)
VALUES
	(15,28,1,NULL),
	(16,28,2,NULL),
	(17,28,3,'2018-11-11 16:44:46'),
	(18,28,5,'2018-11-11 17:13:55');

/*!40000 ALTER TABLE `ben_tasks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table knowledge
# ------------------------------------------------------------

DROP TABLE IF EXISTS `knowledge`;

CREATE TABLE `knowledge` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `num_tasks` int(11) DEFAULT NULL,
  `info` varchar(9999) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `knowledge` WRITE;
/*!40000 ALTER TABLE `knowledge` DISABLE KEYS */;

INSERT INTO `knowledge` (`id`, `num_tasks`, `info`)
VALUES
	(1,0,'info'),
	(2,1,'info'),
	(3,2,'info'),
	(4,3,'info'),
	(5,4,'info'),
	(6,5,'info');

/*!40000 ALTER TABLE `knowledge` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table players
# ------------------------------------------------------------

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) NOT NULL DEFAULT '',
  `actual_name` varchar(255) DEFAULT NULL,
  `changed` int(1) NOT NULL DEFAULT '0',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `admin` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;

INSERT INTO `players` (`id`, `name`, `actual_name`, `changed`, `date_created`, `date_updated`, `admin`)
VALUES
	(28,'BEN-5','six',1,NULL,'2018-11-11 16:45:51',0),
	(29,'BEN-18','(stef)',0,'2018-11-11 16:37:32',NULL,0),
	(30,'BEN-7','test',0,'2018-11-11 16:55:26',NULL,0),
	(31,'BEN-15','test',0,'2018-11-11 16:56:12',NULL,0),
	(33,'012','test',0,'2018-11-11 16:57:54',NULL,0),
	(34,'017','test',0,'2018-11-11 16:58:14',NULL,0),
	(35,'BEN-017','',0,'2018-11-11 16:58:37',NULL,0),
	(36,'BEN-026','ben',1,'2018-11-11 17:07:24','2018-11-11 17:13:09',0),
	(37,'BEN-021','test',0,'2018-11-11 17:08:07',NULL,0),
	(38,'BEN-008','asdfasdf',0,'2018-11-11 17:09:30',NULL,0),
	(39,'BEN-014','asdfasdf',0,'2018-11-11 17:11:01',NULL,0);

/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tasks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `task` varchar(255) DEFAULT NULL,
  `story` varchar(5000) DEFAULT NULL,
  `other` int(1) NOT NULL DEFAULT '1',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;

INSERT INTO `tasks` (`id`, `task`, `story`, `other`, `date_created`)
VALUES
	(1,'some task','Things about the first task.',0,NULL),
	(2,'another task','Things about the second task.',0,NULL),
	(3,'third','Things about the third task.',0,NULL),
	(4,'test','Things about the forth task.',0,NULL),
	(5,'ivif','Things about the fifth task.',0,NULL),
	(6,'six','Things about the seventh task.',0,NULL);

/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

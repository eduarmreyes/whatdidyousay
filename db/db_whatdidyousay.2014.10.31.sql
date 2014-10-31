-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.12-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             8.3.0.4834
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for db_whatdidyousay
CREATE DATABASE IF NOT EXISTS `db_whatdidyousay` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_whatdidyousay`;


-- Dumping structure for table db_whatdidyousay.wds_users
CREATE TABLE IF NOT EXISTS `wds_users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'User A_I ID',
  `user_full_name` varchar(250) NOT NULL,
  `user_username` varchar(15) NOT NULL,
  `user_password` varchar(300) NOT NULL,
  `user_created_by` int(10) DEFAULT NULL,
  `user_updated_by` int(10) DEFAULT NULL,
  `user_created_at` datetime NOT NULL,
  `user_updated_at` datetime NOT NULL,
  `user_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table meant to store users';

-- Dumping data for table db_whatdidyousay.wds_users: ~0 rows (approximately)
/*!40000 ALTER TABLE `wds_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `wds_users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

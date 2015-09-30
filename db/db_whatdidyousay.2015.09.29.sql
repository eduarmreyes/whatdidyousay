-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.3.0.4994
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for db_whatdidyousay
CREATE DATABASE IF NOT EXISTS `db_whatdidyousay` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_whatdidyousay`;


-- Dumping structure for table db_whatdidyousay.wds_answer
CREATE TABLE IF NOT EXISTS `wds_answer` (
  `ans_id` int(10) NOT NULL AUTO_INCREMENT,
  `ans_answer` varchar(80) NOT NULL,
  `ans_img_src` mediumtext NOT NULL,
  `ans_correct` tinyint(1) NOT NULL,
  `ans_created_by` int(10) NOT NULL,
  `ans_updated_by` int(10) NOT NULL,
  `ans_created_at` datetime NOT NULL,
  `ans_updated_at` datetime NOT NULL,
  `ans_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`ans_id`),
  KEY `ans_active` (`ans_active`),
  KEY `ans_updated_by` (`ans_updated_by`),
  KEY `ans_created_by` (`ans_created_by`),
  KEY `ans_correct` (`ans_correct`),
  CONSTRAINT `FK_wds_answer_wds_users` FOREIGN KEY (`ans_created_by`) REFERENCES `wds_users` (`user_id`),
  CONSTRAINT `FK_wds_answer_wds_users_2` FOREIGN KEY (`ans_updated_by`) REFERENCES `wds_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table meant to store all answers';

-- Data exporting was unselected.


-- Dumping structure for table db_whatdidyousay.wds_answers_question
CREATE TABLE IF NOT EXISTS `wds_answers_question` (
  `anqe_id` int(10) NOT NULL AUTO_INCREMENT,
  `anqe_first_answer_id` int(10) NOT NULL,
  `anqe_second_answerd_id` int(10) NOT NULL,
  `anqe_question_id` int(10) NOT NULL,
  `anqe_created_by` int(10) NOT NULL,
  `anqe_updated_by` int(10) NOT NULL,
  `anqe_created_at` datetime NOT NULL,
  `anqe_updated_at` datetime NOT NULL,
  `anqe_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`anqe_id`),
  KEY `anqe_active` (`anqe_active`),
  KEY `anqe_updated_by` (`anqe_updated_by`),
  KEY `anqe_created_by` (`anqe_created_by`),
  KEY `anqe_question_id` (`anqe_question_id`),
  KEY `anqe_answer_id` (`anqe_first_answer_id`),
  KEY `anqe_second_answerd_id` (`anqe_second_answerd_id`),
  CONSTRAINT `FK_wds_answers_question_wds_answer` FOREIGN KEY (`anqe_first_answer_id`) REFERENCES `wds_answer` (`ans_id`),
  CONSTRAINT `FK_wds_answers_question_wds_answer_2` FOREIGN KEY (`anqe_second_answerd_id`) REFERENCES `wds_answer` (`ans_id`),
  CONSTRAINT `FK_wds_answers_question_wds_questions` FOREIGN KEY (`anqe_question_id`) REFERENCES `wds_questions` (`qes_id`),
  CONSTRAINT `FK_wds_answers_question_wds_users` FOREIGN KEY (`anqe_created_by`) REFERENCES `wds_users` (`user_id`),
  CONSTRAINT `FK_wds_answers_question_wds_users_2` FOREIGN KEY (`anqe_updated_by`) REFERENCES `wds_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table meant to store the answers per each question';

-- Data exporting was unselected.


-- Dumping structure for table db_whatdidyousay.wds_questions
CREATE TABLE IF NOT EXISTS `wds_questions` (
  `qes_id` int(10) NOT NULL AUTO_INCREMENT,
  `qes_question` varchar(140) NOT NULL,
  `qes_set_answers` int(10) DEFAULT NULL,
  `qes_created_by` int(10) NOT NULL,
  `qes_updated_by` int(10) NOT NULL,
  `qes_created_at` datetime NOT NULL,
  `qes_updated_at` datetime NOT NULL,
  `qes_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`qes_id`),
  UNIQUE KEY `qes_question_unique` (`qes_question`),
  KEY `qes_active` (`qes_active`),
  KEY `qes_created_by` (`qes_created_by`),
  KEY `qes_updated_by` (`qes_updated_by`),
  KEY `qes_set_answers` (`qes_set_answers`),
  KEY `qes_question` (`qes_question`),
  CONSTRAINT `FK_wds_questions_wds_answers_question` FOREIGN KEY (`qes_set_answers`) REFERENCES `wds_answers_question` (`anqe_id`),
  CONSTRAINT `FK_wds_questions_wds_users` FOREIGN KEY (`qes_created_by`) REFERENCES `wds_users` (`user_id`),
  CONSTRAINT `FK_wds_questions_wds_users_2` FOREIGN KEY (`qes_updated_by`) REFERENCES `wds_users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table meant to store questions of the game';

-- Data exporting was unselected.


-- Dumping structure for table db_whatdidyousay.wds_users
CREATE TABLE IF NOT EXISTS `wds_users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'User A_I ID',
  `user_full_name` varchar(250) DEFAULT NULL,
  `user_username` varchar(15) NOT NULL,
  `user_password` varchar(300) NOT NULL,
  `user_is_online` tinyint(1) NOT NULL DEFAULT '0',
  `user_lifetime_score` int(10) NOT NULL DEFAULT '0',
  `user_game_score` int(10) NOT NULL DEFAULT '0',
  `user_created_by` int(10) DEFAULT NULL,
  `user_updated_by` int(10) DEFAULT NULL,
  `user_created_at` datetime NOT NULL,
  `user_updated_at` datetime NOT NULL,
  `user_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username_unique` (`user_username`),
  KEY `user_active` (`user_active`),
  KEY `user_username` (`user_username`),
  KEY `user_password` (`user_password`(255)),
  KEY `user_created_by` (`user_created_by`),
  KEY `user_updated_by` (`user_updated_by`),
  KEY `user_is_online` (`user_is_online`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Table meant to store users';

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

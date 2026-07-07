-- database/syntax2k26.sql

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Database: `nscet_symposium`
CREATE DATABASE IF NOT EXISTS `nscet_symposium` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nscet_symposium`;

-- Table structure for `admins`
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('super_admin','admin') NOT NULL DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `coordinators`
CREATE TABLE `coordinators` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `event_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `participants`
CREATE TABLE `participants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `college_name` varchar(150) NOT NULL,
  `department` varchar(100) NOT NULL,
  `year_of_study` enum('I','II','III','IV') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `events`
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phase` enum('PHASE 1','PHASE 2','PHASE 3') NOT NULL,
  `description` text NOT NULL,
  `type` enum('Technical','Non-Technical') NOT NULL,
  `max_participants_per_college` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `registrations`
CREATE TABLE `registrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `participant_id` int(11) NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `registration_number` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_number` (`registration_number`),
  KEY `participant_id` (`participant_id`),
  CONSTRAINT `fk_reg_participant` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `registration_events`
CREATE TABLE `registration_events` (
  `registration_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `phase` enum('PHASE 1','PHASE 2','PHASE 3') NOT NULL,
  PRIMARY KEY (`registration_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `fk_re_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_re_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table structure for `payments`
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `registration_id` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `screenshot_path` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT 350.00,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `transaction_id` (`transaction_id`),
  KEY `registration_id` (`registration_id`),
  CONSTRAINT `fk_payment_registration` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default Data for admin
INSERT INTO `admins` (`username`, `password`, `email`, `role`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@nscet.org', 'super_admin'); 
-- password is 'password'

-- Default events
INSERT INTO `events` (`name`, `phase`, `description`, `type`, `max_participants_per_college`) VALUES
('Code Debugging', 'PHASE 1', 'Find and fix the bugs in the provided code snippets.', 'Technical', NULL),
('AI Prompt Battle', 'PHASE 1', 'Generate the exact target response from AI using prompt engineering.', 'Technical', NULL),
('Web Design Battle', 'PHASE 1', 'Build a modern responsive landing page based on the theme.', 'Technical', NULL),
('Paper Presentation', 'PHASE 2', 'Deliver a research presentation on emerging tech trends.', 'Technical', NULL),
('Logic Building Challenge', 'PHASE 2', 'Solve logic puzzles and algorithmic questions.', 'Technical', NULL),
('SQL Query Challenge', 'PHASE 2', 'Write optimal SQL queries to solve real-world problems.', 'Technical', NULL),
('Connection', 'PHASE 3', 'Network and collaborate with other students.', 'Non-Technical', NULL),
('Logo Guessing', 'PHASE 3', 'Guess the brand from the logo shown.', 'Non-Technical', NULL),
('Short Film Challenge', 'PHASE 3', 'Create and present a short film on the theme.', 'Non-Technical', NULL),
('Free Fire Tournament', 'PHASE 3', 'Participate in the mobile battle royale tournament.', 'Non-Technical', NULL),
('Meme Challenge', 'PHASE 3', 'Create viral memes under the event theme.', 'Non-Technical', NULL);

COMMIT;

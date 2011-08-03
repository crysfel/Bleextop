-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 03, 2011 at 07:46 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `desktop`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE IF NOT EXISTS `applications` (
  `application_k` varchar(100) NOT NULL,
  `application_parent_k` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `class` varchar(255) NOT NULL,
  `configurations` text NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`application_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_k`, `application_parent_k`, `name`, `description`, `class`, `configurations`, `active`) VALUES
('administration', '', 'Administration', 'Administration folder', '', '', 1),
('applications', 'administration', 'Applications', 'Applications catalog', 'Bleext.modules.catalogs.applications.controller.Application', '{\r\n   iconCls:"applications-icon"\r\n}', 1),
('roles', 'administration', 'Roles', 'Roles catalog', 'Bleext.modules.catalogs.roles.controller.Roles', '{\r\n   iconCls : ''roles-icon''\r\n}', 1),
('users', 'administration', 'Users', 'Users module', 'Bleext.modules.catalogs.users.controller.Users', '{\r\n   iconCls : ''users-icon'',\r\n   shorcutIconCls : ''roles-app-shorcut-icon''\r\n}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `applications_actions`
--

CREATE TABLE IF NOT EXISTS `applications_actions` (
  `application_action_k` varchar(100) NOT NULL,
  `application_k` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`application_action_k`),
  KEY `application_k` (`application_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications_actions`
--

INSERT INTO `applications_actions` (`application_action_k`, `application_k`, `name`, `description`, `active`) VALUES
('administration_read', 'administration', 'Administration read', 'Display the administration folder', 1),
('applications_read', 'applications', 'Applications read', 'Read applications', 1),
('roles_read', 'roles', 'Roles read', 'Permission to read the list of roles', 1),
('users_read', 'users', 'Users Read', 'Permission to read the list of users', 1);

-- --------------------------------------------------------

--
-- Table structure for table `applications_actions_roles`
--

CREATE TABLE IF NOT EXISTS `applications_actions_roles` (
  `application_action_k` varchar(100) NOT NULL,
  `role_k` int(11) NOT NULL,
  KEY `application_action_k` (`application_action_k`),
  KEY `role_k` (`role_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applications_actions_roles`
--

INSERT INTO `applications_actions_roles` (`application_action_k`, `role_k`) VALUES
('users_read', 1),
('roles_read', 1),
('administration_read', 1),
('applications_read', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(16) NOT NULL DEFAULT '0',
  `user_agent` varchar(50) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
('17a61b1d5763a6f7c99d942b0c009075', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) App', 1311189414, ''),
('e708f0475fb1f606bc684751caf5fa2f', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) App', 1311564788, 'a:2:{s:4:"user";a:7:{s:6:"user_k";s:1:"1";s:6:"role_k";s:1:"1";s:8:"username";s:7:"crysfel";s:5:"email";s:18:"crysfel@bleext.com";s:4:"name";s:7:"Crysfel";s:8:"lastname";s:5:"Villa";s:6:"active";s:1:"1";}s:12:"is_logged_in";b:1;}'),
('79d31092c3bc0375c3636a764d2e04e7', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) App', 1311134807, 'a:2:{s:4:"user";a:7:{s:6:"user_k";s:1:"1";s:6:"role_k";s:1:"1";s:8:"username";s:7:"crysfel";s:5:"email";s:18:"crysfel@bleext.com";s:4:"name";s:7:"Crysfel";s:8:"lastname";s:5:"Villa";s:6:"active";s:1:"1";}s:12:"is_logged_in";b:1;}');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `role_k` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`role_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_k`, `name`, `description`) VALUES
(1, 'Administrator', 'Es el administrador del sistema'),
(2, 'Users', 'Usuarios del sistema');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_k` int(11) NOT NULL AUTO_INCREMENT,
  `role_k` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_k`),
  UNIQUE KEY `username` (`username`),
  KEY `role_k` (`role_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_k`, `role_k`, `username`, `password`, `email`, `name`, `lastname`, `active`) VALUES
(1, 1, 'crysfel', '202cb962ac59075b964b07152d234b70', 'crysfel@bleext.com', 'Crysfel', 'Villa', 1),
(2, 1, 'john', '444bcb3a3fcf8389296c49467f27e1d6', 'john@gmail.com', 'John', 'Doe', 1),
(3, 1, 'susan', '202cb962ac59075b964b07152d234b70', 'susan@hotmail.com', 'Susan', 'Smith', 1),
(4, 1, 'hazel.q', '7b41c6410599ed02b0c2574e5a839ec5', 'hazel.quinteros@bleext.com', 'Hazel', 'Quinteros', 1),
(5, 1, 'carl', 'a0df931e7a7f9b608c165504bde9b620', 'carl@gmail.com', 'Carl', 'JR', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications_actions`
--
ALTER TABLE `applications_actions`
  ADD CONSTRAINT `applications_actions_ibfk_1` FOREIGN KEY (`application_k`) REFERENCES `applications` (`application_k`);

--
-- Constraints for table `applications_actions_roles`
--
ALTER TABLE `applications_actions_roles`
  ADD CONSTRAINT `applications_actions_roles_ibfk_1` FOREIGN KEY (`application_action_k`) REFERENCES `applications_actions` (`application_action_k`),
  ADD CONSTRAINT `applications_actions_roles_ibfk_2` FOREIGN KEY (`role_k`) REFERENCES `roles` (`role_k`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_k`) REFERENCES `roles` (`role_k`);

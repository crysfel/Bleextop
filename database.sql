-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 10, 2011 at 05:42 AM
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
  `application_k` int(11) NOT NULL AUTO_INCREMENT,
  `application_parent_k` int(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `class` varchar(255) NOT NULL,
  `configurations` text NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`application_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_k`, `application_parent_k`, `name`, `description`, `class`, `configurations`, `date_created`, `date_updated`, `active`) VALUES
(1, NULL, 'Administration', 'Administration folder', '', '{"iconCls":"","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:03:53', 1),
(2, 1, 'Applications', 'Applications catalog', 'Bleext.modules.catalogs.applications.controller.Application', '{\r\n   "iconCls":"applications-icon"\r\n}', '2011-08-09 11:03:53', '2011-08-09 11:03:53', 1),
(3, 1, 'Roles', 'Roles catalog', 'Bleext.modules.catalogs.roles.controller.Roles', '{"iconCls":"roles-icon","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:16:10', 1),
(4, 1, 'Users', 'Users module', 'Bleext.modules.catalogs.users.controller.Users', '{"iconCls":"users-icon","shorcutIconCls":"roles-app-shorcut-icon","width":800,"height":480}', '2011-08-09 11:03:53', '2011-08-09 10:57:29', 1),
(6, 1, 'Privileges', 'This module allow you to set the privileges to the roles and applications', 'Bleext.modules.catalogs.privileges.controller.Privileges', '{"iconCls":"permissions-icon","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:19:43', 1);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `permission_k` int(11) NOT NULL AUTO_INCREMENT,
  `application_k` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`permission_k`),
  KEY `application_k` (`application_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_k`, `application_k`, `action`, `name`, `description`) VALUES
(1, 1, 'folder_menu_read', 'Read content access', 'Permission to show menu'),
(2, 2, 'application_read', 'Read content access', 'Permission to read all the applications'),
(3, 6, 'permissions_read', 'Read permissions', 'Allow users to read permissions, this module should be visible only for administrators');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `role_k` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`role_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_k`, `name`, `description`) VALUES
(1, 'Administrator', 'The super user'),
(2, 'Users', 'The users role'),
(3, 'Visitors', 'Visitors');

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_permission_k` int(11) NOT NULL AUTO_INCREMENT,
  `role_k` int(11) NOT NULL,
  `permission_k` int(11) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`role_permission_k`),
  KEY `role_k` (`role_k`),
  KEY `permission_k` (`permission_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_permission_k`, `role_k`, `permission_k`, `value`, `date_created`) VALUES
(1, 1, 1, 1, '2011-08-05 17:35:39'),
(2, 1, 2, 1, '2011-08-05 17:35:47'),
(3, 1, 3, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_k` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_k`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_k`, `username`, `password`, `email`, `name`, `lastname`, `avatar`, `active`) VALUES
(1, 'crysfel', '202cb962ac59075b964b07152d234b70', 'crysfel@bleext.com', 'Crysfel', 'Villa', 'default.png', 1),
(2, 'john', '444bcb3a3fcf8389296c49467f27e1d6', 'john@gmail.com', 'John', 'Doe', 'default.png', 1),
(3, 'susan', '202cb962ac59075b964b07152d234b70', 'susan@hotmail.com', 'Susan', 'Smith', 'default.png', 1),
(4, 'hazel.q', '7b41c6410599ed02b0c2574e5a839ec5', 'hazel.quinteros@bleext.com', 'Hazel', 'Quinteros', 'default.png', 1),
(5, 'carl', 'a0df931e7a7f9b608c165504bde9b620', 'carl@gmail.com', 'Carl', 'JR', 'default.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE IF NOT EXISTS `user_permissions` (
  `user_permission_k` int(11) NOT NULL AUTO_INCREMENT,
  `user_k` int(11) NOT NULL,
  `permission_k` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  PRIMARY KEY (`user_permission_k`),
  KEY `user_k` (`user_k`),
  KEY `permission_k` (`permission_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user_permissions`
--

INSERT INTO `user_permissions` (`user_permission_k`, `user_k`, `permission_k`, `value`, `date_created`) VALUES
(1, 2, 1, 1, '0000-00-00 00:00:00'),
(2, 2, 2, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_k` int(11) NOT NULL,
  `role_k` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  KEY `user_k` (`user_k`),
  KEY `role_k` (`role_k`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_k`, `role_k`, `date_created`) VALUES
(1, 1, '2011-08-05 17:36:09'),
(2, 2, '0000-00-00 00:00:00'),
(3, 2, '0000-00-00 00:00:00');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`application_k`) REFERENCES `applications` (`application_k`);

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_k`) REFERENCES `roles` (`role_k`),
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_k`) REFERENCES `permissions` (`permission_k`);

--
-- Constraints for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_k`) REFERENCES `users` (`user_k`),
  ADD CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permission_k`) REFERENCES `permissions` (`permission_k`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_k`) REFERENCES `users` (`user_k`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_k`) REFERENCES `roles` (`role_k`);

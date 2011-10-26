-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 26, 2011 at 08:05 AM
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
  `klass` varchar(255) NOT NULL,
  `configurations` text NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`application_k`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_k`, `application_parent_k`, `name`, `description`, `klass`, `configurations`, `date_created`, `date_updated`, `active`) VALUES
(1, NULL, 'Administration', 'Administration folder', '', '{"iconCls":"","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:03:53', 1),
(2, 1, 'Applications', 'Applications catalog', 'Bleext.modules.catalogs.applications.controller.Application', '{\r\n   "iconCls":"applications-icon"\r\n}', '2011-08-09 11:03:53', '2011-08-09 11:03:53', 1),
(3, 1, 'Roles', 'Roles catalog', 'Bleext.modules.catalogs.roles.controller.Roles', '{"iconCls":"roles-icon","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:16:10', 1),
(4, 1, 'Users', 'Users module', 'Bleext.modules.catalogs.users.controller.Users', '{"iconCls":"users-icon","shorcutIconCls":"roles-app-shorcut-icon","width":800,"height":480}', '2011-08-09 11:03:53', '2011-08-09 10:57:29', 1),
(6, 1, 'Privileges', 'This module allow you to set the privileges to the roles and applications', 'Bleext.modules.security.permissions.controller.Permission', '{"iconCls":"permissions-icon-16","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-10-26 07:50:40', 1),
(7, 1, 'Groups', 'Groups module', 'Bleext.modules.security.groups.controller.Groups', '{"iconCls":"groups-icon-16","width":800,"height":480,"shorcutIconCls":""}', '2011-10-26 08:03:28', '2011-10-26 08:04:11', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=42 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_k`, `application_k`, `action`, `name`, `description`) VALUES
(1, 1, 'access', 'Access', 'Permission access'),
(2, 2, 'access', 'Access', 'Permission to read all the applications'),
(3, 6, 'access', 'Access', 'Allow users to access the permissions module, this module should be visible only for administrators'),
(4, 6, 'edit', 'Edit', 'Edit access'),
(5, 6, 'create', 'Create', 'Create'),
(6, 6, 'update', 'Update', 'Update access'),
(7, 6, 'list', 'List', 'List'),
(8, 6, 'delete', 'Delete', 'Delete access'),
(9, 6, 'print', 'Print', 'Print'),
(10, 6, 'export', 'export', 'Export access'),
(12, 3, 'edit', 'Edit', 'Edit access'),
(13, 3, 'create', 'Create', 'Create'),
(14, 3, 'update', 'Update', 'Update access'),
(15, 3, 'list', 'List', 'List'),
(16, 3, 'delete', 'Delete', 'Delete access'),
(17, 3, 'print', 'Print', 'Print'),
(18, 3, 'export', 'export', 'Export access'),
(19, 4, 'access', 'Access', 'To appear in the menu'),
(20, 4, 'edit', 'Edit', 'Edit access'),
(21, 4, 'create', 'Create', 'Create'),
(22, 4, 'update', 'Update', 'Update access'),
(23, 4, 'list', 'List', 'List'),
(24, 4, 'delete', 'Delete', 'Delete access'),
(25, 4, 'print', 'Print', 'Print'),
(26, 4, 'export', 'export', 'Export access'),
(27, 2, 'edit', 'Edit', 'Edit access'),
(28, 2, 'create', 'Create', 'Create'),
(29, 2, 'update', 'Update', 'Update access'),
(30, 2, 'list', 'List', 'List'),
(31, 2, 'delete', 'Delete', 'Delete access'),
(32, 2, 'print', 'Print', 'Print'),
(33, 2, 'export', 'export', 'Export access'),
(34, 3, 'access', 'Access', 'To Access the module'),
(35, 7, 'access', 'Access', ''),
(36, 7, 'view', 'View', ''),
(37, 7, 'list', 'List', ''),
(38, 7, 'edit', 'Edit', ''),
(39, 7, 'delete', 'Delete', ''),
(40, 7, 'export', 'Export', ''),
(41, 7, 'print', 'Print', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=58 ;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_permission_k`, `role_k`, `permission_k`, `value`, `date_created`) VALUES
(1, 1, 1, 1, '2011-08-05 17:35:39'),
(2, 1, 2, 1, '2011-08-05 17:35:47'),
(3, 1, 3, 1, '0000-00-00 00:00:00'),
(4, 1, 4, 1, '2011-10-26 07:52:17'),
(5, 2, 4, 0, '2011-10-26 07:52:17'),
(6, 3, 4, 0, '2011-10-26 07:52:17'),
(7, 1, 5, 1, '2011-10-26 07:52:17'),
(8, 2, 5, 0, '2011-10-26 07:52:17'),
(9, 3, 5, 0, '2011-10-26 07:52:17'),
(10, 1, 8, 1, '2011-10-26 08:01:31'),
(11, 2, 8, 0, '2011-10-26 08:01:31'),
(12, 3, 8, 0, '2011-10-26 08:01:31'),
(13, 1, 10, 1, '2011-10-26 08:01:32'),
(14, 2, 10, 0, '2011-10-26 08:01:32'),
(15, 3, 10, 0, '2011-10-26 08:01:32'),
(16, 1, 7, 1, '2011-10-26 08:01:32'),
(17, 2, 7, 0, '2011-10-26 08:01:32'),
(18, 3, 7, 0, '2011-10-26 08:01:32'),
(19, 1, 9, 1, '2011-10-26 08:01:32'),
(20, 2, 9, 0, '2011-10-26 08:01:32'),
(21, 3, 9, 0, '2011-10-26 08:01:32'),
(22, 1, 6, 1, '2011-10-26 08:01:32'),
(23, 2, 6, 0, '2011-10-26 08:01:32'),
(24, 3, 6, 0, '2011-10-26 08:01:32'),
(31, 1, 35, 1, '2011-10-26 08:03:46'),
(32, 2, 35, 0, '2011-10-26 08:03:46'),
(33, 3, 35, 0, '2011-10-26 08:03:46'),
(34, 1, 39, 1, '2011-10-26 08:03:46'),
(35, 2, 39, 0, '2011-10-26 08:03:46'),
(36, 3, 39, 0, '2011-10-26 08:03:46'),
(37, 1, 38, 1, '2011-10-26 08:03:46'),
(38, 2, 38, 0, '2011-10-26 08:03:46'),
(39, 3, 38, 0, '2011-10-26 08:03:46'),
(40, 1, 40, 1, '2011-10-26 08:03:46'),
(41, 2, 40, 0, '2011-10-26 08:03:46'),
(42, 3, 40, 0, '2011-10-26 08:03:46'),
(43, 1, 37, 1, '2011-10-26 08:03:46'),
(44, 2, 37, 0, '2011-10-26 08:03:46'),
(45, 3, 37, 0, '2011-10-26 08:03:46'),
(46, 1, 41, 1, '2011-10-26 08:03:46'),
(47, 2, 41, 0, '2011-10-26 08:03:46'),
(48, 3, 41, 0, '2011-10-26 08:03:46'),
(49, 1, 36, 1, '2011-10-26 08:03:46'),
(50, 2, 36, 0, '2011-10-26 08:03:46'),
(51, 3, 36, 0, '2011-10-26 08:03:46'),
(52, 1, 19, 0, '2011-10-26 08:05:14'),
(53, 2, 19, 0, '2011-10-26 08:05:14'),
(54, 3, 19, 0, '2011-10-26 08:05:14'),
(55, 1, 34, 0, '2011-10-26 08:05:18'),
(56, 2, 34, 0, '2011-10-26 08:05:18'),
(57, 3, 34, 0, '2011-10-26 08:05:18');

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
(3, 2, '0000-00-00 00:00:00'),
(5, 3, '2011-10-26 08:04:39');

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

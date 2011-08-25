-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 25, 2011 at 07:19 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_k`, `application_parent_k`, `name`, `description`, `klass`, `configurations`, `date_created`, `date_updated`, `active`) VALUES
(1, NULL, 'Administration', 'Administration folder', '', '{"iconCls":"","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-12 06:39:07', 1),
(2, 1, 'Applications', 'Applications catalog', 'Bleext.modules.catalogs.applications.controller.Application', '{"iconCls":"applications-icon","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-24 12:00:31', 1),
(3, 1, 'Roles', 'Roles catalog', 'Bleext.modules.catalogs.roles.controller.Roles', '{"iconCls":"roles-icon","width":800,"height":480,"shorcutIconCls":""}', '2011-08-09 11:03:53', '2011-08-09 11:16:10', 1),
(4, 1, 'Users', 'Users module', 'Bleext.modules.catalogs.users.controller.Users', '{"iconCls":"users-icon","shorcutIconCls":"roles-app-shorcut-icon","width":800,"height":480}', '2011-08-09 11:03:53', '2011-08-09 10:57:29', 1),
(6, 1, 'Groups', 'This module allow you to add users to the groups', 'Bleext.modules.security.groups.controller.Groups', '{"iconCls":"groups-icon-16","width":850,"height":480,"shorcutIconCls":"roles-app-shorcut-icon"}', '2011-08-09 11:03:53', '2011-08-25 07:14:10', 1),
(7, 1, 'Permissions', 'Module to manage the permissions assigned to roles and applications.', 'Bleext.modules.security.permissions.controller.Permission', '{"iconCls":"permissions-icon-16","width":800,"height":480,"shorcutIconCls":""}', '2011-08-16 05:47:39', '2011-08-25 07:13:40', 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=44 ;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_k`, `application_k`, `action`, `name`, `description`) VALUES
(1, 1, 'access', 'Access', 'Permission to show menu'),
(2, 2, 'access', 'Access', 'Permission to read all the applications'),
(3, 7, 'access', 'Access', 'Allow users to read permissions, this module should be visible only for administrators'),
(4, 2, 'view', 'View', ''),
(5, 2, 'list', 'List', ''),
(6, 2, 'edit', 'Edit', ''),
(7, 2, 'delete', 'Delete', ''),
(8, 2, 'export', 'Export', ''),
(9, 2, 'print', 'Print', ''),
(10, 6, 'access', 'Access', ''),
(11, 6, 'view', 'View', ''),
(12, 6, 'list', 'List', ''),
(13, 6, 'edit', 'Edit', ''),
(14, 6, 'delete', 'Delete', ''),
(15, 6, 'export', 'Export', ''),
(16, 6, 'print', 'Print', ''),
(17, 7, 'view', 'View', ''),
(18, 7, 'list', 'List', ''),
(19, 7, 'edit', 'Edit', ''),
(20, 7, 'delete', 'Delete', ''),
(21, 7, 'export', 'Export', ''),
(22, 7, 'print', 'Print', ''),
(23, 4, 'access', 'Access', ''),
(24, 4, 'view', 'View', ''),
(25, 4, 'list', 'List', ''),
(26, 4, 'edit', 'Edit', ''),
(27, 4, 'delete', 'Delete', ''),
(28, 4, 'export', 'Export', ''),
(29, 4, 'print', 'Print', ''),
(30, 3, 'access', 'Access', ''),
(31, 3, 'view', 'View', ''),
(32, 3, 'list', 'List', ''),
(33, 3, 'edit', 'Edit', ''),
(34, 3, 'delete', 'Delete', ''),
(35, 3, 'export', 'Export', ''),
(36, 3, 'print', 'Print', '');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_permission_k`, `role_k`, `permission_k`, `value`, `date_created`) VALUES
(1, 1, 1, 1, '2011-08-05 17:35:39'),
(2, 1, 2, 1, '2011-08-05 17:35:47'),
(3, 1, 3, 1, '0000-00-00 00:00:00'),
(4, 1, 10, 1, '2011-08-17 10:59:18');

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
(3, 3, '2011-08-13 12:47:07'),
(2, 1, '2011-08-13 01:50:27'),
(3, 2, '2011-08-14 03:22:54'),
(2, 2, '2011-08-14 03:29:26'),
(4, 2, '2011-08-14 03:29:33'),
(2, 3, '2011-08-14 07:23:37'),
(1, 3, '2011-08-16 03:40:41'),
(1, 2, '2011-08-17 06:15:16'),
(5, 3, '2011-08-17 06:15:42'),
(5, 1, '2011-08-17 06:20:54');

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

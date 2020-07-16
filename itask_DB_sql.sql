-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 16, 2020 at 08:48 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itask`
--

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `reminder_id` int(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL DEFAULT 'list',
  `color` varchar(50) NOT NULL DEFAULT 'lightblue',
  `numTask` int(100) NOT NULL DEFAULT '0',
  `shared` enum('0','1') NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `note` varchar(200) NOT NULL DEFAULT 'NULL',
  `dateP` date DEFAULT '2000-01-01',
  `timeP` time NOT NULL,
  `priority` enum('alta','media','bassa','nessuna') DEFAULT NULL,
  `state` enum('done','pending') DEFAULT 'pending',
  `favorite` enum('star-outline','star') NOT NULL,
  `location` varchar(500) DEFAULT 'NULL',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `URL` varchar(200) NOT NULL,
  `remindersKey` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userReminder`
--

CREATE TABLE `userReminder` (
  `id` int(11) NOT NULL,
  `user` int(20) NOT NULL,
  `reminder` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `img` varchar(100) NOT NULL DEFAULT 'avplacehold.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `remindersKey` (`remindersKey`);

--
-- Indexes for table `userReminder`
--
ALTER TABLE `userReminder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `reminder` (`reminder`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userReminder`
--
ALTER TABLE `userReminder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`remindersKey`) REFERENCES `reminders` (`reminder_id`);

--
-- Constraints for table `userReminder`
--
ALTER TABLE `userReminder`
  ADD CONSTRAINT `userreminder_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userreminder_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userreminder_ibfk_3` FOREIGN KEY (`reminder`) REFERENCES `reminders` (`reminder_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

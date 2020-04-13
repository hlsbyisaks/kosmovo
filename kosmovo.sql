-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2020 at 10:57 AM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kosmovo`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `qId` bigint(255) NOT NULL,
  `qString` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `long` varchar(255) NOT NULL,
  `alt1` varchar(255) NOT NULL,
  `alt2` varchar(255) NOT NULL,
  `alt3` varchar(255) NOT NULL,
  `alt4` varchar(255) NOT NULL,
  `score` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`qId`, `qString`, `lat`, `long`, `alt1`, `alt2`, `alt3`, `alt4`, `score`) VALUES
(62, 'How many eggs does a chicken average lay every year?', '55.59458280420564', '12.983522415161133', '276', '730', '134', '469', 100),
(63, 'What came first?', '55.595867985525985', '12.98609733581543', 'The Dinosaur', 'The Human', 'The Chicken', 'The Egg', 50);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` bigint(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `svgHat` varchar(255) NOT NULL,
  `colorHat` varchar(255) NOT NULL,
  `userScore` int(255) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `online` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userName`, `password`, `mail`, `svgHat`, `colorHat`, `userScore`, `lat`, `lng`, `online`) VALUES
(1, 'a', 'a', 'maxstromberg1996@gmail.com', '', '', 0, 55.5915, 13.0002, ''),
(4, 'd', 'd', '', '', '', 0, 55.5915, 11.0002, '');

-- --------------------------------------------------------

--
-- Table structure for table `userplayed`
--

CREATE TABLE `userplayed` (
  `userId` bigint(255) NOT NULL,
  `qId` bigint(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`qId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `userplayed`
--
ALTER TABLE `userplayed`
  ADD KEY `userId` (`userId`),
  ADD KEY `qId` (`qId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `qId` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

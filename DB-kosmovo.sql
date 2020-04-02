CREATE TABLE `user` (
  `userId` bigint(255) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `svgHat` varchar(255) NOT NULL,
  `colorHat` varchar(255) NOT NULL,
  `userScore` int(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `question` (
  `qId` bigint(255) NOT NULL AUTO_INCREMENT,
  `qString` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `long` varchar(255) NOT NULL,
  `alt1` varchar(255) NOT NULL,
  `alt2` varchar(255) NOT NULL,
  `alt3` varchar(255) NOT NULL,
  `alt4` varchar(255) NOT NULL,
  `score` int(255) NOT NULL,
  PRIMARY KEY (`qId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE `userPlayed` (
  `userId` bigint(255) NOT NULL,
  `qId` bigint(255) NOT NULL,
  KEY `userId` (`userId`),
  KEY `qId` (`qId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
USE heroku_d01d2a6d2fd5bef;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL
);
/* Replace with your SQL commands */


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(155) NOT NULL,
  `last_name` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `hashed_password` varchar(155) NOT NULL,
  `profile_image` text,
  `institution` varchar(155) NOT NULL,
  `service_rank` varchar(155) NOT NULL,
  `bio` text,
  `department` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `content` text,
  `date_posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `image` text,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



ALTER TABLE `Tactical_hub`.`articles` 
CHANGE COLUMN `date_posted` `date_posted` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
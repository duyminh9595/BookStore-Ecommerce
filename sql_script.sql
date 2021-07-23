USE `book_store`;
DROP TABLE IF EXISTS `tinh`;

CREATE TABLE `tinh` (
  `id` smallint unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
CREATE TABLE `thanh_pho` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `tinh_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tinh` (`tinh_id`),
  CONSTRAINT `fk_tinh` FOREIGN KEY (`tinh_id`) REFERENCES `tinh` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
CREATE TABLE `huyen` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `thanh_pho_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_huyen` (`thanh_pho_id`),
  CONSTRAINT `fk_huyen` FOREIGN KEY (`thanh_pho_id`) REFERENCES `thanh_pho` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;
CREATE TABLE `category`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

insert into category(name) values
('Văn Học'),
('Kinh Tế'),
('Manga'),
('Kỹ Năng Sống'),
('Tâm Lý'),
('Nuôi Dạy Con'),
('Sách Giáo Khoa'),
('Sách Tham Khảo')
;


CREATE TABLE `publisher`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY(`id`)
)ENGINE=InnoDB AUTO_INCREMENT=1;

insert into publisher(name) values
('Kim Đồng'),
('IPM'),
('NXB Trẻ')
;
CREATE TABLE IF NOT EXISTS `book` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT 'chua update',
  `image_url` VARCHAR(255) DEFAULT 'chua co',
  `active` BIT DEFAULT 1,
  `price` BIGINT(20) DEFAULT NULL,
  `quantity` INT(11) DEFAULT NULL,
	`date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  `publisher_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_publisher` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

insert into book (name,category_id,publisher_id,quantity,price,date_created,last_updated) values
("Miền đất hứa",3,2,1,1,now(),now()),
("Liar game",3,3,1,1,now(),now());

create table `user_detail`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT 'chua dat ten',
  `gender` boolean,
  `identification_card_number` varchar(255),
  `date_of_birth` datetime(6),
  `telephone` int(11),
  PRIMARY KEY(`id`)
)ENGINE=InnoDB
AUTO_INCREMENT = 1;

create table `account_detail`
(
	`email` varchar(255) not null,
    `password` text not null,
    `is_actived` boolean default 0,
    `is_locked` boolean default 0,
    `token_login` text ,
    `account_role` varchar(255),
    `user_detail_id` bigint(20) not null,
    PRIMARY KEY(`email`),
    CONSTRAINT `fk_user` FOREIGN KEY (`user_detail_id`) REFERENCES `user_detail` (`id`)
)ENGINE=InnoDB;

create table `confirmation_token`
(
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`token` VARCHAR(255) ,
    `created_at` datetime(6),
    `expired_at` datetime(6),
    `confirmed_at` datetime(6),
    `account_detail_email` varchar(255),
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_account` FOREIGN KEY (`account_detail_email`) REFERENCES `account_detail` (`email`)
)ENGINE=InnoDB;



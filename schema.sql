DROP DATABASE IF EXISTS AtelierReviews;

CREATE DATABASE AtelierReviews;

USE AtelierReviews;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  rating int NOT NULL,
  date varchar(50),
	summary varchar(280),
  body varchar(500),
	recommend varchar(5),
	reported varchar(5),
	reviewer_name varchar(50),
  reviewer_email varchar(50),
  response varchar(140),
	helpfulness int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  review_id int NOT NULL,
  url varchar(280),
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics_reviews (
  id int NOT NULL AUTO_INCREMENT,
  characteristic_id int NOT NULL,
  review_id int NOT NULL,
  value int NOT NULL,
  PRIMARY KEY (id)
);

DROP DATABASE IF EXISTS AtelierReviews;

CREATE DATABASE AtelierReviews;

USE AtelierReviews;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  product_id int NOT NULL,
  rating int NOT NULL,
  date date,
	summary varchar(140),
  body varchar(280),
	recommend TINYINT(0) NOT NULL,
	reported TINYINT(0) NOT NULL,
	reviewer_name varchar(30),
  reviewer_email varchar(30),
  response varchar(140),
	helpfulness int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  review_id int NOT NULL,
  url varchar(280),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id),
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
  FOREIGN KEY (review_id) REFERENCES reviews(review_id),
  PRIMARY KEY (id)
);

LOAD DATA
  INFILE './csv/characteristics.csv'
  INTO TABLE characteristics
  COLUMNS TERMINATED BY ','
  OPTIONALLY ENCLOSED BY '"'
  ESCAPED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES;
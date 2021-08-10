--Questions:
--Should IDs (like product_id) be integer or string? getting competing info from the Learn

DROP DATABASE IF EXISTS AtelierReviews;

CREATE DATABASE AtelierReviews;

USE AtelierReviews;

CREATE TABLE products (
  product_id int NOT NULL,
	-- page int NOT NULL,
	-- count int NOT NULL,
	-- sort varchar(20),
	PRIMARY KEY (ID)
);

CREATE TABLE reviews (
  review_id int NOT NULL AUTO_INCREMENT,
  rating int NOT NULL,
	summary varchar(140),
	recommend TINYINT(0) NOT NULL,
	-- what is response??
	response varchar(140),
	body varchar(280),
	date date,
	reviewer_name varchar(20),
	helpfulness int NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (review_id)
);

--join with photos (part of results)
CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  url varchar(280),
  FOREIGN KEY (review_id) REFERENCES reviews(review_id),
  PRIMARY KEY (id)
);

CREATE TABLE metadata (
  product_id int NOT NULL,
  ratings varchar(50),
  recommended varchar(30),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (id)
);

--each characteristic is a stringified object
CREATE TABLE characteristics (
  product_id int NOT NULL AUTO_INCREMENT,
  size varchar(140),
  width varchar(140),
  comfort varchar(140),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (product_id)
);

-- GET /reviews/

-- QueryParameters

-- Parameter	Type	Description
-- page	integer	Selects the page of results to return. Default 1.
-- count	integer	Specifies how many results per page to return. Default 5.
-- sort	text	Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"
-- product_id	integer	Specifies the product for which to retrieve reviews.
-- Response

-- Status: 200 OK

-- {
--   "product": "2",
--   "page": 0,
--   "count": 5,
--   "results": [
--     {
--       "review_id": 5,
--       "rating": 3,
--       "summary": "I'm enjoying wearing these shades",
--       "recommend": false,
--       "response": null,
--       "body": "Comfortable and practical.",
--       "date": "2019-04-14T00:00:00.000Z",
--       "reviewer_name": "shortandsweeet",
--       "helpfulness": 5,
--       "photos": [{
--           "id": 1,
--           "url": "urlplaceholder/review_5_photo_number_1.jpg"
--         },
--         {
--           "id": 2,
--           "url": "urlplaceholder/review_5_photo_number_2.jpg"
--         },
--         // ...
--       ]
--     },
--     {
--       "review_id": 3,
--       "rating": 4,
--       "summary": "I am liking these glasses",
--       "recommend": false,
--       "response": "Glad you're enjoying the product!",
--       "body": "They are very dark. But that's good because I'm in very sunny spots",
--       "date": "2019-06-23T00:00:00.000Z",
--       "reviewer_name": "bigbrotherbenjamin",
--       "helpfulness": 5,
--       "photos": [],
--     },
--     // ...
--   ]
-- }
-- Get Review Metadata
-- Returns review metadata for a given product.

-- GET /reviews/meta

-- Query Parameters

-- Parameter	Type	Description
-- product_id	integer	Required ID of the product for which data should be returned
-- Response

-- Status: 200 OK

-- {
--   "product_id": "2",
--   "ratings": {
--     2: 1,
--     3: 1,
--     4: 2,
--     // ...
--   },
--   "recommended": {
--     0: 5
--     // ...
--   },
--   "characteristics": {
--     "Size": {
--       "id": 14,
--       "value": "4.0000"
--     },
--     "Width": {
--       "id": 15,
--       "value": "3.5000"
--     },
--     "Comfort": {
--       "id": 16,
--       "value": "4.0000"
--     },
--     // ...
-- }
-- Add a Review
-- Adds a review for the given product.

-- POST /reviews

-- Body Parameters

-- Parameter	Type	Description
-- product_id	integer	Required ID of the product to post the review for
-- rating	int	Integer (1-5) indicating the review rating
-- summary	text	Summary text of the review
-- body	text	Continued or full text of the review
-- recommend	bool	Value indicating if the reviewer recommends the product
-- name	text	Username for question asker
-- email	text	Email address for question asker
-- photos	[text]	Array of text urls that link to images to be shown
-- characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
-- Response

-- Status: 201 CREATED

-- Mark Review as Helpful
-- Updates a review to show it was found helpful.

-- PUT /reviews/:review_id/helpful

-- Parameters

-- Parameter	Type	Description
-- reveiw_id	integer	Required ID of the review to update
-- Response

-- Status: 204 NO CONTENT

-- Report Review
-- Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.

-- PUT /reviews/:review_id/report

-- Parameters

-- Parameter	Type	Description
-- review_id	integer	Required ID of the review to update
-- Response

-- Status: 204 NO CONTENT
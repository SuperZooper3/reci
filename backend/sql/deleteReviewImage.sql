DELETE FROM ReviewImage
JOIN Review ON ReviewImage.review_id = Review.id
WHERE ReviewImage.id = $1 AND ReviewImage.review_id = $2 AND Review.account_id = $3;

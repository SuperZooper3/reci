DELETE FROM ReviewImage
USING Review
WHERE ReviewImage.review_id = Review.id
AND ReviewImage.id = $1
AND ReviewImage.review_id = $2
AND Review.account_id = $3;

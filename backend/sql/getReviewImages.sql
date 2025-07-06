SELECT url, alt
FROM ReviewImage
WHERE review_id = $1
;
\c nc_games_test

SELECT 
A.owner,
A.title,
A.review_id,
A.category,
A.review_img_url,
A.created_at,
A.votes,
A.designer,
CAST(COUNT(B.review_id) AS int) as comment_count
FROM reviews A
LEFT JOIN comments B
ON A.review_id = B.review_id
GROUP BY A.review_id
ORDER BY A.created_at DESC
;


SELECT 
review_id,
title,
review_body,
designer,
review_img_url,
votes,
category,
owner,
created_at
FROM reviews
WHERE review_id = 1
;

SELECT
comment_id,
votes,
created_at,
author,
body,
review_id
FROM comments
WHERE review_id = 2
;

UPDATE reviews
    SET votes = votes + 10
    WHERE review_id = 1
    RETURNING *;

SELECT * 
FROM reviews;

SELECT * 
FROM categories;

 SELECT 
        A.owner,
        A.title,
        A.review_id,
        A.category,
        A.review_img_url,
        A.created_at,
        A.votes,
        A.designer,
        CAST(COUNT(B.review_id) AS int) as comment_count
        FROM reviews A
        LEFT JOIN comments B
        ON A.review_id = B.review_id
        GROUP BY A.review_id
        ORDER BY A.title DESC
        ;

         SELECT 
        A.*,
        CAST(COUNT(B.review_id) AS int) as comment_count
        FROM reviews A
        LEFT JOIN comments B
        ON A.review_id = B.review_id
        GROUP BY A.review_id
        ORDER BY A.title DESC
        ;

SELECT 
A.review_id,
A.title,
A.review_body,
A.designer,
A.review_img_url,
A.votes,
A.category,
A.owner,
A.created_at,
CAST(COUNT(B.review_id) AS int) AS comment_count
FROM reviews A
LEFT JOIN comments B
ON A.review_id = B.review_id
WHERE A.review_id = 2
GROUP BY A.review_id

;

SELECT *
FROM comments;

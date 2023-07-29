-- get products
SELECT 
    product_id
    ,product_name
    ,product_description
    ,product_price
    ,product_image
    ,category_id 
FROM product
ORDER BY 
    category_id
    ,product_id ASC;

-- get product by product_id (paramaterized in dal)
SELECT 
    product_id
    ,product_name
    ,product_description
    ,product_price
    ,product_image
    ,category_id 
FROM product 
WHERE product_id = 1;

-- get product by category_id (paramaterized in dal)
SELECT 
    product_id
    ,product_name
    ,product_description
    ,product_price
    ,product_image
    ,category_id 
FROM product 
WHERE category_id = 1;

-- add a product (paramaterized in dal)
INSERT INTO product (product_name, product_description, product_price, product_image, category_id) 
VALUES ('test product name', 'test product description', 14.99, "/images/testimagedoesnotexist.jpg", 1);

-- update (for replace, paramaterized in dal)
-- patch is essentially the same but between the code/page it is dynamic and only the selected params get updated.
UPDATE product SET product_name='test product name', product_description='test product description', product_price=14.99, product_image="/images/testimagedoesnotexist.jpg", category_id=1 WHERE product_id=1;

-- delete product (again, parameterized in dal)
DELETE FROM product WHERE product_id = 1; 

-- get category information
SELECT 
    category_id
    ,category_name
    ,category_description
    ,category_image 
FROM category
ORDER BY category_id ASC;

--origionally my intent was to do all the same for categories as I did with products. It would all basically be the same as for products only slightly different.
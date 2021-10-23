# demo-node-express
This is a repository to make request to omdbapi

========== IMPORT DATABASE ==========
1. Create database at your terminal with this following syntax : 
CREATE DATABASE IF NOT EXIST demo;

2. Import current database from file 'demo.sql' and running this syntax at your terminal:
mysql -u (username) -p demo < (directory_file)
Note: 
    - General syntax if username root : mysql -u root -p demo < (directory_file)
    - Without using bracket ()

========== RUNNING APPS ==========

3. copy and edit file '.env.example' to '.env' with your environment
4. npm install
5. node ./bin/www or nodemon ./bin/www


========== USING APPS ==========
6. Open Postman 
7. Hit API Request Search with params title : 
http://(your_localhost)/movies/search/(params)
Example: http://127.0..0.1/movies/search/&title=Superman

8. Hit API Request Search with params id (IMDb ID) or title : 
http://(your_localhost)/movies/search/(params)
Example: http://127.0..0.1/movies/search/&id=tt4853102

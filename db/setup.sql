DROP DATABASE IF EXISTS nc_games_test;
DROP DATABASE IF EXISTS nc_games;

CREATE DATABASE nc_games_test
WITH ENCODING='UTF8'
       TEMPLATE=template0
       LC_COLLATE='C'
       LC_CTYPE='C'
       CONNECTION LIMIT=-1
       TABLESPACE=pg_default;
CREATE DATABASE nc_games
WITH ENCODING='UTF8'
       TEMPLATE=template0
       LC_COLLATE='C'
       LC_CTYPE='C'
       CONNECTION LIMIT=-1
       TABLESPACE=pg_default;
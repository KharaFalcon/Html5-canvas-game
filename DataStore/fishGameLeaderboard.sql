DROP TABLE IF EXISTS fishGameLeaderboard;

CREATE TABLE fishGameLeaderboard (name text, score integer);

INSERT INTO fishGameLeaderboard (name, score) VALUES
('Regina', 500),
('Emma', 200),
('Rumple', 300), 
('Belle', 400);

SELECT * FROM fishGameLeaderboard;
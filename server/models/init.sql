-- [2:55pm] adapted from my last assessment
--	only 1 hour and 30 min remain, this way
--	possibly I will complete more of the assessment
--	this time
CREATE TABLE IF NOT EXISTS TASK
	(ID			INTEGER GENERATED ALWAYS AS IDENTITY,
	 ITEM		VARCHAR(4000),
	 CREATED_AT	TIMESTAMP NOT NULL DEFAULT NOW(),
	 PRIMARY KEY (ID) );

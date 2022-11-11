Create table users(
	id serial primary key,
	username varchar,
	email varchar,
	country varchar,
	img varchar,
	city varchar,
	phone varchar,
	password varchar,
	isAdmin boolean,
	isActive boolean,
	created_time TIMESTAMP,
	updated_time TIMESTAMP,
	created_by varchar,
	updated_by VARCHAR
);

CREATE TABLE hotel(
	id serial primary key,
	name varchar,
	type varchar,
	city varchar,
	address varchar,
	distance varchar,
	photos varchar,
	title varchar,
	"desc" varchar,
	rating varchar,
	rooms varchar,
	cheapestPrice numeric,
	featured BOOLEAN,
	isActive boolean,
	created_time TIMESTAMP,
	updated_time TIMESTAMP,
	created_by varchar,
	updated_by VARCHAR
);

CREATE table room(
	id serial primary key,
	title varchar,
	price numeric,
	maxPeople int,
	"desc" varchar,
	isActive boolean,
	created_time TIMESTAMP,
	updated_time TIMESTAMP,
	created_by varchar,
	updated_by VARCHAR
);

CREATE table roomNumbers(
	id serial primary key,
	roomNumber int,
	unavailableDates Date,
	isActive boolean,
	created_time TIMESTAMP,
	updated_time TIMESTAMP,
	created_by varchar,
	updated_by VARCHAR
);
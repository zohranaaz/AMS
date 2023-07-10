CREATE TABLE users(
	id SERIAL PRIMARY KEY, 
	email varchar (127)  NOT NULL,
	password varchar (127)  NOT NULL,
	gender varchar (127)  NOT NULL,
	user_name varchar (127)  NOT NULL,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees(
	id SERIAL  PRIMARY KEY, 
	first_name varchar (127)  NOT NULL,
	last_name varchar (127)  NOT NULL,
	phone varchar (127) NOT NULL,
	designation varchar (127)  NOT NULL,
	image varchar (127)  NOT NULL,
	department varchar (127)  NOT NULL,
	parent_id INTEGER  NOT NULL,
	user_id INTEGER NOT NULL,
	base_path varchar (127)  NOT NULL,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles(
	id SERIAL  PRIMARY KEY, 
	role_name varchar (127)  NOT NULL,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (id, role_name, status) VALUES
(1, 'HR', 1),
(2, 'Manager', 1),
(3, 'Employee', 1);

CREATE TABLE permissions(
	id SERIAL  PRIMARY KEY, 
	permission_name varchar (127)  NOT NULL,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO permissions (id, permission_name, status) VALUES
(1, 'View', 1),
(2, 'Create', 1),
(3, 'Update', 1),
(4, 'Delete', 1);


CREATE TABLE modules(
	id SERIAL  PRIMARY KEY, 
	module_name varchar (127)  NOT NULL,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO modules (id, module_name, status) VALUES
(1, 'Employee', 1),
(2, 'User', 1),
(3, 'Master', 1);


CREATE TABLE role_module_permission_mappings(
	id SERIAL  PRIMARY KEY, 
	role_id INT  NOT NULL ,
    module_id INT  NOT NULL ,
    permission_id INT  NOT NULL ,
	status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO role_module_permission_mappings ( role_id , module_id , permission_id  , status) VALUES
( 1, 1, 1, 1),
( 1, 1, 2, 1),
( 1, 1, 3, 1),
( 1, 1, 4, 1),
( 1, 2, 1, 1),
( 1, 2, 2, 1),
( 1, 2, 3, 1),
( 1, 2, 4, 1),
( 2, 1, 1, 1),
( 3, 1, 1, 1);

CREATE TABLE user_role_mappings(
	id SERIAL  PRIMARY KEY, 
	role_id INT  NOT NULL ,
    user_id INT  NOT NULL ,
    status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE states (
	id SERIAL  PRIMARY KEY, 
	state_name varchar (127)  NOT NULL,
    status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO states (id, state_name, status) VALUES
(1, 'Delhi', 1),
(2, 'Haryana', 1),
(3, 'Uttar Pradesh', 1);


CREATE TABLE city (
	id SERIAL  PRIMARY KEY, 
	city_name varchar (127)  NOT NULL,
    state_id INT  NOT NULL ,
    status INTEGER NOT NULL DEFAULT '1' ,
	createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO city (id, city_name, state_id, status) VALUES
(1, 'Delhi', 1, 1),
(2, 'Gurugram', 2, 1),
(3, 'Varanasi', 3, 1);
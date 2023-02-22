create database resources;

create schema catalogs;

set search_path to catalogs;

create table countries(
	id serial primary key,
	country varchar(50) not null,
	phoneId varchar(4) not null,
	flag bytea null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table regions(
	id serial primary key,
	region varchar(100) not null,
	idCountry integer references countries(id),
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table cities(
	id serial primary key,
	city varchar(100) not null,
	idRegion integer references regions(id),
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table document_types(
	id serial primary key,
	document_name varchar(50) not null,
	document_pattern varchar(100) null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table contact_types(
	id serial primary key,
	contact_type varchar(50) not null,
	contact_pattern varchar(100) null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create schema people_info;

set search_path to people_info;

create table people(
	id serial primary key,
	names varchar(75) not null,
	surnames varchar(75) not null,
	date_birth date not null,
	nationality integer references catalogs.countries(id),
	address varchar(250) not null,
	idCountry integer references catalogs.countries(id),
	idRegion integer references catalogs.regions(id),
	idCity integer references catalogs.cities(id),
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table people_contacts(
	id serial primary key,
	id_person integer references people_info.people(id),
	id_contact_type integer references catalogs.contact_types(id),
	contact_value varchar(100) not null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table people_documents(
	id serial primary key,
	id_person integer references people_info.people(id),
	id_document_type integer references catalogs.document_types(id),
	document_number varchar(100) not null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create schema bussiness;

set search_path to bussiness;

create table positions(
	id serial primary key,
	position varchar(50) not null,
	superior int not null,
	description varchar(250) null,
	salary numeric(10,2) not null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table departments(
	id serial primary key,
	department varchar(50) not null,
	superior_dep int not null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table employees(
	id serial primary key,
	id_person integer references people_info.people(id),
	id_position integer references bussiness.positions(id),
	id_department integer references bussiness.departments(id),
	startd_date date not null,
	end_date date null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create schema auth;

set search_path to auth;

create table prod_systems(
	id serial primary key,
	system_name varchar(50) not null,
	description varchar(200) null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table roles(
	id serial primary key,
	rol varchar(25) not null,
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table users(
	id serial primary key,
	user_name varchar(25) not null,
	password varchar(260) not null,
	id_employee integer references bussiness.employees(id),
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
);

create table permissions(
	id serial primary key,
	id_rol integer references auth.roles(id),
	id_user integer references auth.users(id),
	id_system integer references auth.prod_systems(id),
	created_by varchar(25) not null default 'system',
	created_at timestamp default now(),
	modified_by varchar(25) null,
	modified_at timestamp,
	enabled boolean
)
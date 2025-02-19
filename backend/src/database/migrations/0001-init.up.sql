CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id INT NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birthdate DATE,
    status VARCHAR(255),
    additional_info TEXT
);

CREATE TABLE IF NOT EXISTS profile_contacts (
    user_id INT NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS profile_socials (
    user_id INT NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    telegram VARCHAR(255),
    whatsapp VARCHAR(255),
    vk VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS profile_education (
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    organization VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    graduation_year INT NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_locations (
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    location_id INT NOT NULL REFERENCES locations (id) ON DELETE CASCADE
);

CREATE TYPE requester_type AS ENUM ('person', 'organization');

CREATE TYPE help_type AS ENUM ('finance', 'material');

CREATE TABLE IF NOT EXISTS requests (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    goal_description TEXT NOT NULL,
    ending_date DATE NOT NULL,
    requester_type requester_type NOT NULL,
    help_type help_type NOT NULL,
    contributors_count INT NOT NULL,
    request_goal INT NOT NULL,
    request_goal_current_value INT NOT NULL
);

CREATE TYPE helper_type AS ENUM ('group', 'single');

CREATE TYPE helper_qualification AS ENUM ('professional', 'common');

CREATE TABLE IF NOT EXISTS request_helper_requirements (
    request_id INT NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
    helper_type helper_type NOT NULL,
    is_online BOOLEAN NOT NULL,
    qualification helper_qualification NOT NULL
);

CREATE TABLE IF NOT EXISTS request_actions (
    request_id INT NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
    step_label VARCHAR(255) NOT NULL,
    is_done BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS request_contacts (
    request_id INT NOT NULL UNIQUE REFERENCES requests (id) ON DELETE CASCADE,
    email VARCHAR(255),
    phone VARCHAR(255),
    website VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS request_locations (
    request_id INT NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
    location_id INT NOT NULL REFERENCES locations (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS organizations (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    is_verified BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS request_organization (
    request_id INT NOT NULL UNIQUE REFERENCES requests (id) ON DELETE CASCADE,
    organization_id INT NOT NULL REFERENCES organizations (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favourite_requests (
    user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    request_id INT NOT NULL REFERENCES requests (id) ON DELETE CASCADE
);

-- Database export via SQLPro (https://www.sqlprostudio.com/allapps.html)
-- Exported by jmartin at 19-09-2022 17:09.
-- WARNING: This file may contain descructive statements such as DROPs.
-- Please ensure that you are running the script at the proper location.


-- BEGIN TABLE public.login_request
DROP TABLE IF EXISTS public.login_request CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public.login_request (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	user_id uuid NOT NULL,
	created_at timestamp with time zone DEFAULT now() NOT NULL,
	slug text NOT NULL,
	updated_at timestamp with time zone DEFAULT now(),
	PRIMARY KEY(id)
);

COMMIT;

-- END TABLE public.login_request

-- BEGIN TABLE public.user
DROP TABLE IF EXISTS public."user" CASCADE;
BEGIN;

CREATE TABLE IF NOT EXISTS public."user" (
	id uuid DEFAULT gen_random_uuid() NOT NULL,
	created_at timestamp with time zone DEFAULT now() NOT NULL,
	updated_at timestamp with time zone DEFAULT now() NOT NULL,
	name text NOT NULL,
	email text NOT NULL,
	verified boolean DEFAULT false NOT NULL,
	PRIMARY KEY(id)
);

COMMIT;

-- END TABLE public.user

ALTER TABLE IF EXISTS public.login_request
	ADD CONSTRAINT login_request_user_id_fkey
	FOREIGN KEY (user_id)
	REFERENCES public."user" (id)
	ON DELETE CASCADE
	ON UPDATE RESTRICT;


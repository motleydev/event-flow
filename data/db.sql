--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: secret_slug(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.secret_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.slug :=  md5(NEW.id::text);
   RETURN NEW;
END
$$;


ALTER FUNCTION public.secret_slug() OWNER TO postgres;

--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;


ALTER FUNCTION public.set_current_timestamp_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: login_request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login_request (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    slug text NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.login_request OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: login_request login_request_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_request
    ADD CONSTRAINT login_request_pkey PRIMARY KEY (id);


--
-- Name: login_request login_request_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_request
    ADD CONSTRAINT login_request_slug_key UNIQUE (slug);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: login_request notify_hasura_create_email_trigger_UPDATE; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "notify_hasura_create_email_trigger_UPDATE" AFTER UPDATE ON public.login_request FOR EACH ROW EXECUTE FUNCTION hdb_catalog."notify_hasura_create_email_trigger_UPDATE"();


--
-- Name: user notify_hasura_create_first_session_INSERT; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "notify_hasura_create_first_session_INSERT" AFTER INSERT ON public."user" FOR EACH ROW EXECUTE FUNCTION hdb_catalog."notify_hasura_create_first_session_INSERT"();


--
-- Name: login_request secret_slug_default; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER secret_slug_default BEFORE INSERT ON public.login_request FOR EACH ROW WHEN (((new.slug IS NULL) AND (new.id IS NOT NULL))) EXECUTE FUNCTION public.secret_slug();


--
-- Name: login_request set_public_login_request_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_login_request_updated_at BEFORE UPDATE ON public.login_request FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_login_request_updated_at ON login_request; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_login_request_updated_at ON public.login_request IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: user set_public_user_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER set_public_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_user_updated_at ON "user"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TRIGGER set_public_user_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: login_request login_request_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login_request
    ADD CONSTRAINT login_request_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


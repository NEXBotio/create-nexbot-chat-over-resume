--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Homebrew)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: adAddrsOnNewSub(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."adAddrsOnNewSub"() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$BEGIN
INSERT INTO public.addresses(ownedby,subscription_id,name)
VALUES(NEW.user_id, NEW.id,'');
RETURN NEW;
END;$$;


ALTER FUNCTION public."adAddrsOnNewSub"() OWNER TO postgres;

--
-- Name: addLinkOnAddrs(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public."addLinkOnAddrs"() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$BEGIN
INSERT INTO public.public_links(name)
VALUES(NEW.name);
RETURN NEW;
END;$$;


ALTER FUNCTION public."addLinkOnAddrs"() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    ownedby uuid NOT NULL,
    subscription_id uuid,
    name text DEFAULT ''::text
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: public_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.public_links (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name text
);


ALTER TABLE public.public_links OWNER TO postgres;

--
-- Name: TABLE public_links; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.public_links IS 'all the links users can navigate to';


--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    expiresat timestamp with time zone,
    user_id uuid NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: addresses addresses_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_name_key UNIQUE (name);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: addresses addresses_subscription_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_subscription_id_key UNIQUE (subscription_id);


--
-- Name: public_links public_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_links
    ADD CONSTRAINT public_links_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: users users_authId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_authId_key" UNIQUE (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: addresses AddLinkOnAddrs; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "AddLinkOnAddrs" AFTER INSERT ON public.addresses FOR EACH ROW EXECUTE FUNCTION public."addLinkOnAddrs"();


--
-- Name: subscriptions addAddrsOnSub; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER "addAddrsOnSub" AFTER INSERT ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public."adAddrsOnNewSub"();


--
-- Name: addresses addresses_ownedby_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_ownedby_fkey FOREIGN KEY (ownedby) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: addresses addresses_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public_links public_links_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.public_links
    ADD CONSTRAINT public_links_name_fkey FOREIGN KEY (name) REFERENCES public.addresses(name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: addresses; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

--
-- Name: public_links everyone anywhere can see all links; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "everyone anywhere can see all links" ON public.public_links FOR SELECT TO authenticated, anon USING (true);


--
-- Name: public_links; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.public_links ENABLE ROW LEVEL SECURITY;

--
-- Name: subscriptions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: addresses users can change their addresses; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "users can change their addresses" ON public.addresses FOR UPDATE USING ((auth.uid() = ownedby)) WITH CHECK ((auth.uid() = ownedby));


--
-- Name: addresses users can see their address; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "users can see their address" ON public.addresses FOR SELECT TO authenticated USING ((auth.uid() = ownedby));


--
-- Name: subscriptions users select their subs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "users select their subs" ON public.subscriptions FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION "adAddrsOnNewSub"(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public."adAddrsOnNewSub"() TO anon;
GRANT ALL ON FUNCTION public."adAddrsOnNewSub"() TO authenticated;
GRANT ALL ON FUNCTION public."adAddrsOnNewSub"() TO service_role;


--
-- Name: FUNCTION "addLinkOnAddrs"(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public."addLinkOnAddrs"() TO anon;
GRANT ALL ON FUNCTION public."addLinkOnAddrs"() TO authenticated;
GRANT ALL ON FUNCTION public."addLinkOnAddrs"() TO service_role;


--
-- Name: TABLE addresses; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.addresses TO anon;
GRANT ALL ON TABLE public.addresses TO authenticated;
GRANT ALL ON TABLE public.addresses TO service_role;


--
-- Name: TABLE public_links; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.public_links TO anon;
GRANT ALL ON TABLE public.public_links TO authenticated;
GRANT ALL ON TABLE public.public_links TO service_role;


--
-- Name: TABLE subscriptions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.subscriptions TO anon;
GRANT ALL ON TABLE public.subscriptions TO authenticated;
GRANT ALL ON TABLE public.subscriptions TO service_role;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- PostgreSQL database dump complete
--


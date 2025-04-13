-- Fonction pour vérifier la connexion de base à Supabase
-- Cette fonction retourne simplement le nom de référence du projet
CREATE OR REPLACE FUNCTION get_project_ref()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT current_setting('request.jwt.claim.iss')::text;
$$;

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ldcngwqeqkpzpfsqscsa.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkY25nd3FlcWtwenBmc3FzY3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY1MTg0NTgsImV4cCI6MTk2MjA5NDQ1OH0.B0fsiTr7fwZ6VuUEJLENwLDslEbUvYCsLSVuzsUImRw";


const Supabase = createClient(

    SUPABASE_URL,
  SUPABASE_ANON_KEY,

)


export default Supabase

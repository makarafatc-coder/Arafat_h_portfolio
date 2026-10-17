// assets/js/supabase-client.js
// এখানে তোমার Supabase URL এবং Anon Key বসাও
const SUPABASE_URL = "https://jqreeaborvwfqblhzxbb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcmVlYWJvcnZ3ZnFibGh6eGJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDI0OTUsImV4cCI6MjEwNzgxODQ5NX0.wf0r8iitI0zxYzVLX0OhgJDaxwyi0KUGVP2APjVyDCM";

// Supabase ক্লায়েন্ট তৈরি
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
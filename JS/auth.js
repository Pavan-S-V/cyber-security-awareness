/* =========================================
   CYBERSAFE — SUPABASE AUTHENTICATION
========================================= */

const SUPABASE_URL = "https://wfissxvfwgeiqkkgfubg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bc4aQcy4jmy5BtK4SKeFXg_xIYrNOF9";

let supabaseClient = null;

try {
    if (!window.supabase) {
        throw new Error("Supabase library failed to load.");
    }

    if (
        SUPABASE_URL.includes("YOUR_SUPABASE") ||
        SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE")
    ) {
        throw new Error(
            "Add your Supabase project URL and publishable key in JS/auth.js."
        );
    }

    supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );
    window.supabaseClient = supabaseClient;
} catch (error) {
    console.error("CyberSafe authentication setup:", error.message);
}

function requireSupabase() {
    if (!supabaseClient) {
        throw new Error(
            "Authentication is not configured. Check the Supabase URL and publishable key in JS/auth.js."
        );
    }

    return supabaseClient;
}

async function loginUser(email, password) {
    const client = requireSupabase();

    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
}

async function registerUser(email, password) {
    const client = requireSupabase();

    const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: window.location.origin +
                window.location.pathname
        }
    });

    if (error) throw error;

    return data;
}

async function sendPasswordReset(email) {
    const client = requireSupabase();

    const { data, error } = await client.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: window.location.origin +
                window.location.pathname
        }
    );

    if (error) throw error;

    return data;
}

async function updateAccountPassword(password) {
    const client = requireSupabase();

    const { data, error } = await client.auth.updateUser({
        password
    });

    if (error) throw error;

    return data;
}


async function loginWithGoogle() {
    const client = requireSupabase();

    const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + "/login.html"
        }
    });

    if (error) {
        throw error;
    }

    return data;
}


async function getCurrentUser() {
    const client = requireSupabase();

    const { data, error } = await client.auth.getUser();

    if (error) throw error;

    return data.user || null;
}

async function logoutUser() {
    const client = requireSupabase();

    const { error } = await client.auth.signOut();

    if (error) throw error;
}
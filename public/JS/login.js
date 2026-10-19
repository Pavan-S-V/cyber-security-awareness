
document.addEventListener("DOMContentLoaded", () => {
    const client = window.supabaseClient || supabaseClient;

    if (!client) {
        console.error("Supabase client is unavailable.");
        return;
    }

    function redirectAfterLogin() {
        const next = new URLSearchParams(window.location.search).get("next");

        if (next === "/analyzer.html") {
            const pendingURL = sessionStorage.getItem("cybersafe_pending_url");
            const destination = new URL("/analyzer.html", window.location.origin);

            if (pendingURL) {
                destination.searchParams.set("sharedUrl", pendingURL);
            }

            window.location.replace(destination.toString());
        } else {
            redirectAfterLogin();
        }
    }

    const $ = (id) => document.getElementById(id);

    const form = $("authForm");
    const emailInput = $("email");
    const passwordInput = $("password");
    const submitButton = $("submitButton");
    const submitText = $("submitButtonText");
    const spinner = $("submitSpinner");
    const authMessage = $("authMessage");
    const formTitle = $("formTitle");
    const formSubtitle = $("formSubtitle");
    const forgotButton = $("forgotPassword");
    const switchModeText = $("switchModeText");
    const googleButton = $("googleButton");
    const togglePassword = $("togglePassword");

    const otpPanel = $("otpPanel");
    const otpForm = $("otpForm");
    const otpCode = $("otpCode");
    const otpMessage = $("otpMessage");
    const verifyOtpButton = $("verifyOtpButton");
    const resendOtpButton = $("resendOtpButton");
    const backToAuthButton = $("backToAuthButton");

    let mode = "login";
    let busy = false;
    let pendingEmail = "";

    $("currentYear").textContent = new Date().getFullYear();

    function showMessage(message, type = "info") {
        authMessage.textContent = message;
        authMessage.className = "auth-message " + type;
        authMessage.hidden = false;
    }

    function showOtpMessage(message, type = "info") {
        otpMessage.textContent = message;
        otpMessage.className = "auth-message " + type;
        otpMessage.hidden = false;
    }

    function clearMessage() {
        authMessage.hidden = true;
        authMessage.textContent = "";
    }

    function setBusy(value, label = "") {
        busy = value;
        submitButton.disabled = value;
        googleButton.disabled = value;
        verifyOtpButton.disabled = value;
        resendOtpButton.disabled = value;

        spinner.hidden = !value;
        submitButton.querySelector(".button-arrow").hidden = value;

        submitText.textContent = value
            ? label
            : mode === "register" ? "Create Account" : "Sign In";
    }

    function setOtpBusy(value, label = "Verify Email") {
        verifyOtpButton.disabled = value;
        resendOtpButton.disabled = value;
        verifyOtpButton.textContent = value ? label : "Verify Email";
    }

    function showOtpScreen(email) {
        pendingEmail = email;
        form.hidden = true;
        otpPanel.hidden = false;
        googleButton.hidden = true;
        document.querySelector(".divider").hidden = true;
        switchModeText.hidden = true;
        forgotButton.hidden = true;

        showOtpMessage(
            "A verification code was requested for " + email + ". Check your inbox and spam folder.",
            "success"
        );

        otpCode.focus();
    }

    function showAuthScreen() {
        otpPanel.hidden = true;
        form.hidden = false;
        googleButton.hidden = false;
        document.querySelector(".divider").hidden = false;
        switchModeText.hidden = false;
        forgotButton.hidden = mode === "register";

        otpCode.value = "";
        otpMessage.hidden = true;
        clearMessage();
    }

    function updateMode() {
        clearMessage();

        const registering = mode === "register";

        formTitle.textContent = registering
            ? "Create your account"
            : "Welcome back";

        formSubtitle.textContent = registering
            ? "Create an account using your email and password."
            : "Sign in to continue to CyberSafe.";

        submitText.textContent = registering
            ? "Create Account"
            : "Sign In";

        passwordInput.placeholder = registering
            ? "Create a password (minimum 8 characters)"
            : "Enter your password";

        passwordInput.autocomplete = registering
            ? "new-password"
            : "current-password";

        forgotButton.style.display = registering ? "none" : "";

        switchModeText.innerHTML = registering
            ? 'Already have an account? <button type="button" id="switchModeButton">Sign in</button>'
            : 'Don\'t have an account? <button type="button" id="switchModeButton">Create account</button>';
    }

    // Check for an existing session and OAuth callback.
    async function checkExistingSession() {
        const { data, error } = await client.auth.getSession();

        if (error) {
            console.error("Session check failed:", error.message);
            return;
        }

        if (data.session) {
            redirectAfterLogin();
        }
    }

    checkExistingSession();

    // Switch between Sign In and Create Account.
    switchModeText.addEventListener("click", (event) => {
        if (!event.target.closest("#switchModeButton") || busy) return;

        mode = mode === "login" ? "register" : "login";
        form.reset();
        passwordInput.type = "password";
        togglePassword.setAttribute("aria-label", "Show password");
        updateMode();
    });

    togglePassword.addEventListener("click", () => {
        const showing = passwordInput.type === "text";
        passwordInput.type = showing ? "password" : "text";
        togglePassword.setAttribute(
            "aria-label",
            showing ? "Show password" : "Hide password"
        );
    });

    // Create an account or sign in.
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (busy) return;

        clearMessage();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!emailInput.validity.valid || !email) {
            showMessage("Please enter a valid email address.", "error");
            emailInput.focus();
            return;
        }

        if (password.length < 8) {
            showMessage("Your password must contain at least 8 characters.", "error");
            passwordInput.focus();
            return;
        }

        setBusy(true, mode === "register"
            ? "Creating account..."
            : "Signing in...");

        try {
            if (mode === "register") {
                const { data, error } = await client.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: window.location.origin + "/login.html"
                    }
                });

                if (error) throw error;

                if (data.session) {
                    showMessage("Account created successfully!", "success");
                    redirectAfterLogin();
                    return;
                }

                showOtpScreen(email);
                return;
            }

            const { error } = await client.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            redirectAfterLogin();
        } catch (error) {
            console.error("Authentication error:", error);
            showMessage(friendlyError(error), "error");
        } finally {
            setBusy(false);
        }
    });

    // Verify the email OTP.
    otpForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (busy) return;

        const token = otpCode.value.trim();

        if (!/^\d{6}$/.test(token)) {
            showOtpMessage("Enter the 6-digit code from your email.", "error");
            return;
        }

        setOtpBusy(true, "Verifying...");

        try {
            const { error } = await client.auth.verifyOtp({
                email: pendingEmail,
                token,
                type: "signup"
            });

            if (error) throw error;

            showOtpMessage("Email verified! Your account is ready. Opening CyberSafe...", "success");

            // The signup flow may create a session immediately.
            const { data } = await client.auth.getSession();

            if (data.session) {
                redirectAfterLogin();
            } else {
                mode = "login";
                showAuthScreen();
                updateMode();
                emailInput.value = pendingEmail;
                showMessage("Email verified. Now sign in using your email and password.", "success");
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            showOtpMessage(friendlyError(error), "error");
        } finally {
            setOtpBusy(false);
        }
    });

    // Resend the signup OTP.
    resendOtpButton.addEventListener("click", async () => {
        if (busy || !pendingEmail) return;

        setOtpBusy(true, "Sending code...");

        try {
            const { error } = await client.auth.resend({
                type: "signup",
                email: pendingEmail
            });

            if (error) throw error;

            showOtpMessage("A new verification email has been requested. Check your inbox.", "success");
        } catch (error) {
            console.error("Resend OTP error:", error);
            showOtpMessage(friendlyError(error), "error");
        } finally {
            setOtpBusy(false);
        }
    });

    backToAuthButton.addEventListener("click", () => {
        mode = "login";
        showAuthScreen();
        updateMode();
    });

    // Password reset.

    forgotButton.addEventListener("click", () => {
        window.location.href = "/forgot-password.html";
    });


    // Google OAuth.
    googleButton.addEventListener("click", async () => {
        if (busy) return;

        clearMessage();
        setBusy(true, "Connecting to Google...");

        try {
            const { error } = await client.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin + "/login.html"
                }
            });

            if (error) throw error;
        } catch (error) {
            console.error("Google sign-in error:", error);
            showMessage(friendlyError(error), "error");
            setBusy(false);
        }
    });

    function friendlyError(error) {
        const message = String(error?.message || "").toLowerCase();

        if (message.includes("invalid login credentials")) {
            return "Incorrect email or password.";
        }
        if (message.includes("email not confirmed")) {
            return "Please verify your email before signing in.";
        }
        if (message.includes("user already registered")) {
            return "This email is already registered. Try signing in.";
        }
        if (message.includes("expired") || message.includes("invalid")) {
            return "The code may be invalid or expired. Request a new code and try again.";
        }
        if (message.includes("rate limit") || message.includes("too many requests")) {
            return "Too many attempts. Please wait before trying again.";
        }
        if (message.includes("failed to fetch")) {
            return "Cannot connect to Supabase. Check your project URL and internet connection.";
        }

        return error?.message || "Something went wrong. Please try again.";
    }

    updateMode();
});

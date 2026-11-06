
/* ==========================================
   CYBERSAFE - LOGIN & AUTHENTICATION
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const client = window.supabaseClient;

    if (!client) {
        console.error("CyberSafe: Supabase client is unavailable.");
        return;
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

    if (!form || !emailInput || !passwordInput) {
        console.error("CyberSafe: Required login elements are missing.");
        return;
    }

    let mode = "login";
    let busy = false;
    let pendingEmail = "";
    let redirecting = false;

    const divider = document.querySelector(".divider");

    if ($("currentYear")) {
        $("currentYear").textContent = new Date().getFullYear();
    }

    // Redirect after successful login.
    function redirectAfterLogin() {
        if (redirecting) return;
        redirecting = true;

        const next = new URLSearchParams(
            window.location.search
        ).get("next");

        if (next === "/analyzer.html") {
            const pendingURL = sessionStorage.getItem(
                "cybersafe_pending_url"
            );

            const destination = new URL(
                "/analyzer.html",
                window.location.origin
            );

            if (pendingURL) {
                destination.searchParams.set("sharedUrl", pendingURL);
                sessionStorage.removeItem("cybersafe_pending_url");
            }

            window.location.replace(destination.toString());
        } else {
            window.location.replace("/index.html");
        }
    }

    function showMessage(message, type = "info") {
        if (!authMessage) return;

        authMessage.textContent = message;
        authMessage.className = "auth-message " + type;
        authMessage.hidden = false;
    }

    function showOtpMessage(message, type = "info") {
        if (!otpMessage) return;

        otpMessage.textContent = message;
        otpMessage.className = "auth-message " + type;
        otpMessage.hidden = false;
    }

    function clearMessage() {
        if (!authMessage) return;

        authMessage.hidden = true;
        authMessage.textContent = "";
    }

    function setBusy(value, label = "") {
        busy = value;

        if (submitButton) submitButton.disabled = value;
        if (googleButton) googleButton.disabled = value;
        if (verifyOtpButton) verifyOtpButton.disabled = value;
        if (resendOtpButton) resendOtpButton.disabled = value;

        if (spinner) spinner.hidden = !value;

        const arrow = submitButton?.querySelector(".button-arrow");
        if (arrow) arrow.hidden = value;

        if (submitText) {
            submitText.textContent = value
                ? label
                : mode === "register"
                    ? "Create Account"
                    : "Sign In";
        }
    }

    function setOtpBusy(value, label = "Verify Email") {
        if (verifyOtpButton) {
            verifyOtpButton.disabled = value;
            verifyOtpButton.textContent = value
                ? label
                : "Verify Email";
        }

        if (resendOtpButton) {
            resendOtpButton.disabled = value;
        }
    }

    function showOtpScreen(email) {
        pendingEmail = email;

        form.hidden = true;
        if (otpPanel) otpPanel.hidden = false;
        if (googleButton) googleButton.hidden = true;
        if (divider) divider.hidden = true;
        if (switchModeText) switchModeText.hidden = true;
        if (forgotButton) forgotButton.hidden = true;

        showOtpMessage(
            "A verification code was requested for " +
            email + ". Check your inbox and spam folder.",
            "success"
        );

        if (otpCode) otpCode.focus();
    }

    function showAuthScreen() {
        if (otpPanel) otpPanel.hidden = true;
        form.hidden = false;
        if (googleButton) googleButton.hidden = false;
        if (divider) divider.hidden = false;
        if (switchModeText) switchModeText.hidden = false;
        if (forgotButton) {
            forgotButton.hidden = mode === "register";
        }

        if (otpCode) otpCode.value = "";
        if (otpMessage) otpMessage.hidden = true;

        clearMessage();
    }

    function updateMode() {
        clearMessage();

        const registering = mode === "register";

        if (formTitle) {
            formTitle.textContent = registering
                ? "Create your account"
                : "Welcome back";
        }

        if (formSubtitle) {
            formSubtitle.textContent = registering
                ? "Create an account using your email and password."
                : "Sign in to continue to CyberSafe.";
        }

        if (submitText) {
            submitText.textContent = registering
                ? "Create Account"
                : "Sign In";
        }

        passwordInput.placeholder = registering
            ? "Create a password (minimum 8 characters)"
            : "Enter your password";

        passwordInput.autocomplete = registering
            ? "new-password"
            : "current-password";

        if (forgotButton) {
            forgotButton.style.display = registering ? "none" : "";
        }

        if (switchModeText) {
            switchModeText.innerHTML = registering
                ? 'Already have an account? <button type="button" id="switchModeButton">Sign in</button>'
                : 'Don\'t have an account? <button type="button" id="switchModeButton">Create account</button>';
        }
    }

    // Restore an existing Supabase session.
    async function checkExistingSession() {
        try {
            const { data, error } = await client.auth.getSession();

            if (error) {
                console.error("Session check failed:", error.message);
                return;
            }

            if (data.session) {
                redirectAfterLogin();
            }
        } catch (error) {
            console.error("Could not restore session:", error);
        }
    }

    checkExistingSession();

    // Handle successful authentication events.
    client.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && session) {
            redirectAfterLogin();
        }
    });

    // Switch between login and registration.
    if (switchModeText) {
        switchModeText.addEventListener("click", (event) => {
            if (!event.target.closest("#switchModeButton") || busy) {
                return;
            }

            mode = mode === "login" ? "register" : "login";

            form.reset();
            passwordInput.type = "password";

            if (togglePassword) {
                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }

            updateMode();
        });
    }

    // Show or hide password.
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            const showing = passwordInput.type === "text";

            passwordInput.type = showing ? "password" : "text";

            togglePassword.setAttribute(
                "aria-label",
                showing ? "Show password" : "Hide password"
            );
        });
    }

    // Login and registration.
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
            showMessage(
                "Your password must contain at least 8 characters.",
                "error"
            );
            passwordInput.focus();
            return;
        }

        setBusy(
            true,
            mode === "register"
                ? "Creating account..."
                : "Signing in..."
        );

        try {
            if (mode === "register") {
                const { data, error } = await client.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo:
                            window.location.origin + "/login.html"
                    }
                });

                if (error) throw error;

                if (data.session) {
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

    // Verify signup email OTP.
    if (otpForm) {
        otpForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (busy || !otpCode) return;

            const token = otpCode.value.trim();

            if (!/^\d{6}$/.test(token)) {
                showOtpMessage(
                    "Enter the 6-digit code from your email.",
                    "error"
                );
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

                const { data } = await client.auth.getSession();

                if (data.session) {
                    redirectAfterLogin();
                } else {
                    mode = "login";
                    showAuthScreen();
                    updateMode();

                    emailInput.value = pendingEmail;

                    showMessage(
                        "Email verified. Now sign in using your email and password.",
                        "success"
                    );
                }

            } catch (error) {
                console.error("OTP verification error:", error);
                showOtpMessage(friendlyError(error), "error");
            } finally {
                setOtpBusy(false);
            }
        });
    }

    // Resend signup OTP.
    if (resendOtpButton) {
        resendOtpButton.addEventListener("click", async () => {
            if (busy || !pendingEmail) return;

            setOtpBusy(true, "Sending code...");

            try {
                const { error } = await client.auth.resend({
                    type: "signup",
                    email: pendingEmail
                });

                if (error) throw error;

                showOtpMessage(
                    "A new verification email has been requested. Check your inbox.",
                    "success"
                );

            } catch (error) {
                console.error("Resend OTP error:", error);
                showOtpMessage(friendlyError(error), "error");
            } finally {
                setOtpBusy(false);
            }
        });
    }

    // Return from OTP screen.
    if (backToAuthButton) {
        backToAuthButton.addEventListener("click", () => {
            mode = "login";
            showAuthScreen();
            updateMode();
        });
    }

    // Forgot password.
    if (forgotButton) {
        forgotButton.addEventListener("click", () => {
            window.location.href = "/forgot-password.html";
        });
    }

    // Google login.
    if (googleButton) {
        googleButton.addEventListener("click", async () => {
            if (busy) return;

            clearMessage();
            setBusy(true, "Connecting to Google...");

            try {
                const { error } = await client.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo:
                            window.location.origin + "/login.html"
                    }
                });

                if (error) throw error;

            } catch (error) {
                console.error("Google sign-in error:", error);
                showMessage(friendlyError(error), "error");
                setBusy(false);
            }
        });
    }

    // Friendly error messages.
    function friendlyError(error) {
        const message = String(
            error?.message || ""
        ).toLowerCase();

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

        if (
            message.includes("rate limit") ||
            message.includes("too many requests")
        ) {
            return "Too many attempts. Please wait before trying again.";
        }

        if (message.includes("failed to fetch")) {
            return "Cannot connect to Supabase. Check your internet connection.";
        }

        return error?.message || "Something went wrong. Please try again.";
    }

    updateMode();
});

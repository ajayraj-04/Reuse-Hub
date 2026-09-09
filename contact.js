document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Sending:", name, email, message);

    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const data = await response.json();

        console.log("Server response:", data);

        document.getElementById("successMessage").innerText =
            data.message;

    } catch (error) {
        console.error("ERROR:", error);

        document.getElementById("successMessage").innerText =
            "❌ Backend connection failed";
    }
});
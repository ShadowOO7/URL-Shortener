document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shortenForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const url = formData.get("url");

        fetch("/url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "URL Shortened!",
                    text: `Short ID: ${data.shortId}`,
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => window.location.reload(), 1000);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message || "Something went wrong!"
                });
            }
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message
            });
        });
    });
});
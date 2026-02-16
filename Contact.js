const feedbackForm = document.getElementById('feedbackForm');
const modal = document.getElementById('feedbackModal');
const modalContent = document.querySelector('.modal-content');
const submitBtn = feedbackForm.querySelector('.submit-btn');


// ================= FORM SUBMIT =================
feedbackForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // stop page reload

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const formData = new FormData(feedbackForm);

    try {
        const response = await fetch(feedbackForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // ✅ SUCCESS
        if (response.ok) {
            showModal(
                "Success!",
                "Your vision has been drafted. We will contact you soon.",
                "👍",
                false
            );

            feedbackForm.reset();
        }
        // ❌ SERVER ERROR
        else {
            showModal(
                "Oops!",
                "Something went wrong. Please try again later.",
                "⚠️",
                true
            );
        }

    } catch (error) {
        // ❌ NETWORK ERROR
        showModal(
            "Network Error!",
            "Unable to send feedback. Check your internet connection.",
            "⚠️",
            true
        );
    }

    // Restore button
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Feedback";
});


// ================= SHOW MODAL =================
function showModal(title, message, icon, isError) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('modalIcon').innerText = icon;

    if (isError) {
        modalContent.classList.add('error');
    } else {
        modalContent.classList.remove('error');
    }

    modal.classList.add('active');

    // ✅ Auto close after 3 seconds (optional)
    // setTimeout(closeModal, 3000);
}


// ================= CLOSE MODAL =================
function closeModal() {
    modal.classList.remove('active');
}

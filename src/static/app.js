document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });

  // Initialize app
  fetchActivities();
});

// ...existing code...

// Fetch activities and populate the activity cards
fetch('/activities')
  .then(response => response.json())
  .then(data => {
    const activitiesList = document.getElementById('activities-list');
    activitiesList.innerHTML = ''; // Clear loading message

    Object.keys(data).forEach(activityName => {
      const activity = data[activityName];

      // Create activity card
      const card = document.createElement('div');
      card.classList.add('activity-card');

      // Add activity details
      card.innerHTML = `
        <h4>${activityName}</h4>
        <p>${activity.description}</p>
        <p><strong>Schedule:</strong> ${activity.schedule}</p>
        <p><strong>Max Participants:</strong> ${activity.max_participants}</p>
        <p><strong>Participants:</strong></p>
        <ul class="participants-list">
          ${activity.participants.map(participant => `<li>${participant}</li>`).join('')}
        </ul>
      `;

      activitiesList.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching activities:', error);
  });
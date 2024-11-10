function initializeResumeForm() {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

    const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // Collect input values
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const objective = (document.getElementById("profile-summary") as HTMLInputElement).value;
        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const phone = (document.getElementById("phone") as HTMLInputElement).value;
        const education = (document.getElementById("education-institution") as HTMLInputElement).value;
        const educationDegree = (document.getElementById("degree") as HTMLInputElement).value;
        const educationYears = (document.getElementById("years") as HTMLInputElement).value;
        const jobTitle = (document.getElementById("job-title") as HTMLInputElement).value;
        const company = (document.getElementById("company") as HTMLInputElement).value;
        const jobDescription = (document.getElementById("job-description") as HTMLInputElement).value;
        const skills = (document.getElementById("skills") as HTMLInputElement).value;
        const certifications = (document.getElementById("certifications") as HTMLInputElement).value;
        const language = (document.getElementById("languages") as HTMLInputElement).value;

        // Save form data in localStorage with the username as the key
        const resumeData = { objective, name, email, phone, education, educationDegree, educationYears, jobTitle, company, jobDescription, skills, certifications, language };
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Process the profile image
        const profileImageInput = document.getElementById("profile-image") as HTMLInputElement;
        const file = profileImageInput?.files?.[0];
        if (file) {
            // Read and display the image
            const reader = new FileReader();
            reader.onload = function (e) {
                const profileImageUrl = e.target?.result as string;
                renderResume(profileImageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            renderResume("");
        }

        function renderResume(profileImageUrl: string) {
            const resumeHTML = `<h2><b>Editable Resume</b></h2>
                        <h3>Profile Image</h3>
                        <p contenteditable="true"><img src="${profileImageUrl}" alt="Profile Image" width="100"/></p>

                        <h3>Objective</h3>
                        <p contenteditable="true">${objective}</p>

                        <h3>Personal Information</h3>
                        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
                        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
                        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

                        <h3>Education</h3>
                        <p><b>Education Institution:</b><span contenteditable="true"> ${education}</span></p>
                        <p><b>Degree:</b><span contenteditable="true"> ${educationDegree}</span></p>
                        <p><b>Years:</b> <span contenteditable="true">${educationYears}</span></p>

                        <h3>Experience</h3>
                        <p><b>Job Title:</b> <span contenteditable="true">${jobTitle}</span></p>
                        <p><b>Company:</b> <span contenteditable="true">${company}</span></p>
                        <p><b>Job Description:</b> <span contenteditable="true">${jobDescription}</span></p>

                        <h3>Skills</h3>
                        <p contenteditable="true">${skills}</p>

                        <h3>Certifications</h3>
                        <p contenteditable="true">${certifications}</p>

                        <h3>Language</h3>
                        <p contenteditable="true">${language}</p>`;

            // Display the generated resume
            resumeDisplayElement.innerHTML = resumeHTML;

            // Generate a shareable URL with the username only
            const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

            // Display the shareable link
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        }
    });

    // Handle PDF download
    downloadPdfButton.addEventListener('click', () => {
        window.print();
    });

    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        if (username) {
            // Autofill form if data is found in localStorage
            const savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                const resumeData = JSON.parse(savedResumeData);
                (document.getElementById("username") as HTMLInputElement).value = username;
                (document.getElementById("profile-summary") as HTMLInputElement).value = resumeData.objective;
                (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
                (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
                (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
                (document.getElementById("education-institution") as HTMLInputElement).value = resumeData.education;
                (document.getElementById("degree") as HTMLInputElement).value = resumeData.educationDegree;
                (document.getElementById("years") as HTMLInputElement).value = resumeData.educationYears;
                (document.getElementById("job-title") as HTMLInputElement).value = resumeData.jobTitle;
                (document.getElementById("company") as HTMLInputElement).value = resumeData.company;
                (document.getElementById("job-description") as HTMLInputElement).value = resumeData.jobDescription;
                (document.getElementById("skills") as HTMLInputElement).value = resumeData.skills;
                (document.getElementById("certifications") as HTMLInputElement).value = resumeData.certifications;
                (document.getElementById("languages") as HTMLInputElement).value = resumeData.language;
            }
        }
    });
}

initializeResumeForm();

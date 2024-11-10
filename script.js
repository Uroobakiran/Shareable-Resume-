function initializeResumeForm() {
    var form = document.getElementById('resume-form');
    var resumeDisplayElement = document.getElementById('resume-display');
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    var shareableLinkElement = document.getElementById('shareable-link');
    var downloadPdfButton = document.getElementById('download-pdf');
    // Handle form submission
    form.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault();
        // Collect input values
        var username = document.getElementById("username").value;
        var objective = document.getElementById("profile-summary").value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var education = document.getElementById("education-institution").value;
        var educationDegree = document.getElementById("degree").value;
        var educationYears = document.getElementById("years").value;
        var jobTitle = document.getElementById("job-title").value;
        var company = document.getElementById("company").value;
        var jobDescription = document.getElementById("job-description").value;
        var skills = document.getElementById("skills").value;
        var certifications = document.getElementById("certifications").value;
        var language = document.getElementById("languages").value;
        // Save form data in localStorage with the username as the key
        var resumeData = { objective: objective, name: name, email: email, phone: phone, education: education, educationDegree: educationDegree, educationYears: educationYears, jobTitle: jobTitle, company: company, jobDescription: jobDescription, skills: skills, certifications: certifications, language: language };
        localStorage.setItem(username, JSON.stringify(resumeData));
        // Process the profile image
        var profileImageInput = document.getElementById("profile-image");
        var file = (_a = profileImageInput === null || profileImageInput === void 0 ? void 0 : profileImageInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // Read and display the image
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var profileImageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                renderResume(profileImageUrl);
            };
            reader.readAsDataURL(file);
        }
        else {
            renderResume("");
        }
        function renderResume(profileImageUrl) {
            var resumeHTML = "<h2><b>Editable Resume</b></h2>\n                        <h3>Profile Image</h3>\n                        <p contenteditable=\"true\"><img src=\"".concat(profileImageUrl, "\" alt=\"Profile Image\" width=\"100\"/></p>\n\n                        <h3>Objective</h3>\n                        <p contenteditable=\"true\">").concat(objective, "</p>\n\n                        <h3>Personal Information</h3>\n                        <p><b>Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n                        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n                        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n                        <h3>Education</h3>\n                        <p><b>Education Institution:</b><span contenteditable=\"true\"> ").concat(education, "</span></p>\n                        <p><b>Degree:</b><span contenteditable=\"true\"> ").concat(educationDegree, "</span></p>\n                        <p><b>Years:</b> <span contenteditable=\"true\">").concat(educationYears, "</span></p>\n\n                        <h3>Experience</h3>\n                        <p><b>Job Title:</b> <span contenteditable=\"true\">").concat(jobTitle, "</span></p>\n                        <p><b>Company:</b> <span contenteditable=\"true\">").concat(company, "</span></p>\n                        <p><b>Job Description:</b> <span contenteditable=\"true\">").concat(jobDescription, "</span></p>\n\n                        <h3>Skills</h3>\n                        <p contenteditable=\"true\">").concat(skills, "</p>\n\n                        <h3>Certifications</h3>\n                        <p contenteditable=\"true\">").concat(certifications, "</p>\n\n                        <h3>Language</h3>\n                        <p contenteditable=\"true\">").concat(language, "</p>");
            // Display the generated resume
            resumeDisplayElement.innerHTML = resumeHTML;
            // Generate a shareable URL with the username only
            var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
            // Display the shareable link
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        }
    });
    // Handle PDF download
    downloadPdfButton.addEventListener('click', function () {
        window.print();
    });
    // Prefill the form based on the username in the URL
    window.addEventListener('DOMContentLoaded', function () {
        var urlParams = new URLSearchParams(window.location.search);
        var username = urlParams.get('username');
        if (username) {
            // Autofill form if data is found in localStorage
            var savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                var resumeData = JSON.parse(savedResumeData);
                document.getElementById("username").value = username;
                document.getElementById("profile-summary").value = resumeData.objective;
                document.getElementById("name").value = resumeData.name;
                document.getElementById("email").value = resumeData.email;
                document.getElementById("phone").value = resumeData.phone;
                document.getElementById("education-institution").value = resumeData.education;
                document.getElementById("degree").value = resumeData.educationDegree;
                document.getElementById("years").value = resumeData.educationYears;
                document.getElementById("job-title").value = resumeData.jobTitle;
                document.getElementById("company").value = resumeData.company;
                document.getElementById("job-description").value = resumeData.jobDescription;
                document.getElementById("skills").value = resumeData.skills;
                document.getElementById("certifications").value = resumeData.certifications;
                document.getElementById("languages").value = resumeData.language;
            }
        }
    });
}
initializeResumeForm();

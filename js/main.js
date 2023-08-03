// function getJobData() {
// 	const url = "https://jsearch.p.rapidapi.com/search?query=%3CREQUIRED%3E&page=1&num_pages=1";

// 	fetch(url)
// 	  .then(response => {
// 		if (!response.ok) {
// 		  throw new Error(`HTTP error! Status: ${response.status}`);
// 		}
// 		return response.json();
// 	  })
// 	  .then(data => {
// 		const response = await fetch(url, options);
// 		const result = await response.text();
// 		console.log(job);
// 		const jobListings = document.getElementById('jobListings');

// 		// Process the job data
// 		data.jobs.forEach(job => {
// 		  const jobTitle = job.title;
// 		  const company = job.company;
// 		  const location = job.location;

// 		  // Create job listing elements
// 		  const jobListing = document.createElement('div');
// 		  jobListing.classList.add('job');

// 		  const titleElement = document.createElement('div');
// 		  titleElement.classList.add('job-title');
// 		  titleElement.textContent = jobTitle;

// 		  const companyElement = document.createElement('div');
// 		  companyElement.classList.add('company');
// 		  companyElement.textContent = `Company: ${company}`;

// 		  const locationElement = document.createElement('div');
// 		  locationElement.classList.add('location');
// 		  locationElement.textContent = `Location: ${location}`;

// 		  // Append elements to job listing container
// 		  jobListing.appendChild(titleElement);
// 		  jobListing.appendChild(companyElement);
// 		  jobListing.appendChild(locationElement);

// 		  // Append job listing to the main container
// 		  jobListings.appendChild(jobListing);
// 		});
// 	  })
// 	  .catch(error => {
// 		// Handle any errors that occurred during the request
// 		console.error("Error:", error);
// 	  });
//   }

//   // Call the function to fetch and display the job data
//   getJobData();
const inpUrl = localStorage.getItem("url");
console.log(inpUrl);
const finalQ = inpUrl;
const url = `https://jsearch.p.rapidapi.com/search?query=${finalQ}&page=1&num_pages=1`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ac62d27c56msh0b0850d6b1294fcp1fd66cjsn179a82502093",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  },
};
try {
  const response = await fetch(url, options);
  const result = await response.text();
  const job1 = JSON.parse(result);
  console.log(job1.data);
  const iterateJobs = job1.data;
  iterateJobs.forEach((job) => {
    console.log(job);
    const jobTitle = job.title;
    const company = job.company;
    const location = job.location;
    // Create job listing elements
    const jobListing = document.createElement("div");
    jobListing.classList.add("job");
    //   console.log(jobListing.classList);

    const titleElement = document.createElement("div");
    titleElement.classList.add("job-title");
    titleElement.textContent = job.job_job_title;

    const companyElement = document.createElement("div");
    companyElement.classList.add("company");
    companyElement.textContent = `Company: ${job.employer_name}`;

    const locationElement = document.createElement("div");
    locationElement.classList.add("location");
    const jobDiscToArray = job.job_description.split(" ");
    let count = 0;
    const jobDiscToArrayTillDot = jobDiscToArray.map(function (ele) {
      if (ele != "") {
        count++;
      }
      if (count <= 25) {
        return ele;
      }
    });
    const ranNumber = Math.trunc(Math.random(1) * 5 + 1);
    console.log(ranNumber);
    locationElement.textContent = `Location: ${job.job_city}, ${job.job_country}`;
    const boxTxt = `
				  <div class="card card-${ranNumber}">
	<div></div>
      <p class="card__exit"><i class="fas fa-times"></i></p>
      <h2 class="card__title">${job.job_title}</h2>
	  <p>${String(jobDiscToArrayTillDot.join(" "))}...</p>
      <p class="card__apply">
        <a class="card__link" href="${
          job.job_apply_link
        }">Apply Now <i class="fas fa-arrow-right"></i></a>
      </p>
    </div> 
				  `;
    // const formater = document.createElement("div");
    // formater.classList.add("card card-2");
    // formater.createElement("div");
    document.querySelector(".cards").innerHTML += boxTxt;
  });
} catch (error) {
  console.error(error);
}

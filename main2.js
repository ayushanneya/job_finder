let query = "all";
document?.querySelector(".default-btn").addEventListener("click", function (e) {
  const jobTitleInput = document.querySelector(".job_title").value;
  const jobLocationInput = document.querySelector(".job_location").value;

  const query = String(jobTitleInput + " " + jobLocationInput);
  const queryManOne = query.toLocaleLowerCase();
  const queryManTwo = queryManOne.split(" ");
  const finalQ = queryManTwo.join("%20");
  console.log(finalQ);
  localStorage.removeItem("url");
  localStorage.setItem("url", finalQ);
});
const url = `https://jsearch.p.rapidapi.com/search?query=all&page=1&num_pages=1&date_posted=week`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": 'bc38ef1d1bmsh63d77ad7e2be61ep17a65bjsn52db53e92f44',
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
    const boxTxt = `
    <div class="col-lg-6 col-md-6">
    <div class="row joblist">
      <div class="col-lg-3 col-xl-3 col-md-3 col-3">
        <a href="job/credit-analyst-factoring-861560632"><img src="images/jobicon.png"
            class="img-thumbnail"></a>
      </div>
      <div class="col-lg-7 col-xl-7 col-md-7 col-7 remove-padding">
        <a href="job/credit-analyst-factoring-861560632">
          <h5 class="com-name">${job.employer_name}</h5>
        </a>
        <a href="job/credit-analyst-factoring-861560632">
          <h4 class="job-title">${job.job_title}</h4>
        </a>
        <a href="${job.job_apply_link}" class="list-link"></a>
        <p>${job.job_city}, ${job.job_country}<br>
        </p>
      </div>
      <div class="col-lg-2 col-xl-2 col-md-2 col-2 remove-padding">
        <a href="${job.job_apply_link}" class="btn btn-danger">Apply</a>
      </div>
    </div>
  </div> 
				  `;
    // const formater = document.createElement("div");
    // formater.classList.add("card card-2");
    // formater.createElement("div");
    document.querySelector("#loadmorejobs").innerHTML += boxTxt;
  });
} catch (error) {
  console.error(error);
}

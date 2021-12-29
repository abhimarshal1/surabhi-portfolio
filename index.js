document.addEventListener("DOMContentLoaded", () => {
  fetchDetails();

  const target = document.querySelectorAll(".desc");
  const expTraget = document.getElementById("experience-timeline");
  const skillsTarget = document.getElementById("skills");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { rootMargin: "-200px" }
  );

  target.forEach((el) => {
    observer.observe(el);
  });

  observer.observe(expTraget);
  observer.observe(skillsTarget);
});

const fetchDetails = async () => {
  const response = await fetch(
    "https://polar-depths-11747.herokuapp.com/portfolio/Surabhi"
  );
  const json = await response.json();
  const { introduction, fullname, designation, experience, picture } = json;
  document.getElementById("fullname").innerText = fullname;
  document.getElementById("designation").innerText = designation;
  document.getElementById("intro-text").innerText = introduction;
  document.getElementById("profile").src = picture;

  const experienceTarget = document.getElementById("experience-timeline");

  for (let exp of experience) {
    console.log(exp);
    const { period, role, company, project, highlights } = exp;

    const entry = document.createElement("div");
    entry.className = "entry";

    const title = document.createElement("div");
    title.className = "title";

    const body = document.createElement("div");
    body.className = "body";

    // for title
    const title_h3 = document.createElement("h3");
    title_h3.innerText = period;

    const title_p_role = document.createElement("p");
    title_p_role.className = "role";
    title_p_role.innerText = role;

    const title_p_company = document.createElement("p");
    title_p_company.className = "company";
    title_p_company.innerText = company;

    title.appendChild(title_h3);
    title.appendChild(title_p_role);
    title.appendChild(title_p_company);

    // for body
    const body_p = document.createElement("p");
    body_p.innerText = project;

    const body_ul = document.createElement("ul");

    highlights.forEach((text) => {
      const li = document.createElement("li");
      li.innerText = text;
      body_ul.appendChild(li);
    });

    body.appendChild(body_p);
    body.appendChild(body_ul);

    entry.appendChild(title);
    entry.appendChild(body);

    experienceTarget.appendChild(entry);
    document.getElementById("loader").classList.add("hide");
  }
};

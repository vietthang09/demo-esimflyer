const queryString = window.location.search;
const curHref = window.location.href;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const content = urlParams.get("content");
if (id && content) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `https://n8n.sgp-caprover.travelthru.com/webhook/053c0d32-8362-4177-96ee-bb33cdeed103?id=${id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then(() => {
      window.location.href = content;
    })
    .catch((error) => console.error(error));
}

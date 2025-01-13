const container = document.getElementById("container");
const qrCodeInput = document.getElementById("qr-code-input");
const qrCodeText = document.getElementById("qr-code-text");
const qrCodeLink = document.getElementById("qr-code-link");
const uploadButton = document.getElementById("upload-button");
const qrCodeContent = document.getElementById("qr-code-content");
const newQRCode = document.getElementById("new-qr-code");

const queryString = window.location.search;
const curHref = window.location.href;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const content = urlParams.get("content");
if (id && content) {
  container.style.display = "none";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    `https://script.google.com/macros/s/AKfycbypUIBzzXZR_kUtyM64i9XeD26AuMUBmOBeGI52AmFw5M00ZGyvqBLgdZPsKiB7iFrHzg/exec?driverID=${id}&action=add`,
    requestOptions
  )
    .then((response) => response.text())
    .then(() => {
      console.log(id, content);
      window.location.href = content;
    })
    .catch((error) => console.error(error));
}

uploadButton.addEventListener("click", async () => {
  const file = qrCodeInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch("http://api.qrserver.com/v1/read-qr-code/", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await response.json();
      // const qrCodeString = data[0].symbol[0].data;

      // Generate redirect URL
      const redirectURL = `https://vietthang09.github.io/demo-esimflyer?content=${encodeURIComponent(
        qrCodeLink.value
      )}&id=${qrCodeText.value}`;
      // const redirectURL = `http://127.0.0.1:5500?content=${encodeURIComponent(
      //   qrCodeLink.value
      // )}&id=${qrCodeText.value}`;

      // Generate new QR code
      const newQRCodeResponse = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          redirectURL
        )}&size=200x200`
      );

      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        `https://script.google.com/macros/s/AKfycbwb7WdnI9sYjDcIrVpp6aX8vThaiHEXTUH80QebiIFo-U9jyqyU5SheuBRHe1qc2Gpr4A/exec?driverID=${
          qrCodeText.value
        }&action=create&qrCode=${encodeURIComponent(
          newQRCodeResponse.url
        )}&redirectLink=${encodeURIComponent(redirectURL)}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

      const newQRCodeBlob = await newQRCodeResponse.blob();
      const newQRCodeURL = URL.createObjectURL(newQRCodeBlob);

      // Display new QR code
      const newQRCodeImage = document.createElement("img");
      newQRCodeImage.src = newQRCodeURL;
      newQRCode.appendChild(newQRCodeImage);

      // Display original QR code content
      // qrCodeContent.innerText = qrCodeString;

      // Simulate redirect on click
      newQRCodeImage.addEventListener("click", () => {
        window.location.href = redirectURL;
      });
    } catch (error) {
      qrCodeContent.innerText = "Error decoding QR code.";
      console.error(error);
    }
  }
});

document.getElementById("buyNowForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const oldPrice = document.getElementById("oldPrice").value;
  const newPrice = document.getElementById("newPrice").value;
  const description = document.getElementById("description").value;
  const typeId = document.getElementById("typeId").value;
  const picture = document.getElementById("picture").files[0];

  if (!picture) return alert("Please upload a product image.");

  const formData = new FormData();
  formData.append("Picture", picture);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to perform this action.");
    return;
  }

  const url = `https://visionhub.runasp.net/api/Product?Id=${id}&Name=${encodeURIComponent(name)}&OldPrice=${oldPrice}&NewPrice=${newPrice}&Description=${encodeURIComponent(description)}&TypeId=${typeId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
      body: formData,
    });

    const result = await response.text();

    if (response.ok) {
      alert("Product submitted successfully!");
    } else {
      alert(`Error: ${result}`);
    }
  } catch (err) {
    alert("An error occurred while submitting the product.");
    console.error(err);
  }
});

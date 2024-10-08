document.addEventListener("DOMContentLoaded", () => {
  // Form submission handler for adding products
  document
    .getElementById("productForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const model = document.getElementById("model").value;
      const price = document.getElementById("price").value;
      const repair = document.getElementById("repair").value;

      try {
        const response = await fetch(
          "https://9j78inyh6g.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "submitProduct",
              model,
              price,
              repair,
            }), // Specify type as submitProduct
          }
        );

        const result = await response.json();
        const body = JSON.parse(result.body);
        let fileContent = body.fileContent;

        // Split the content into lines and reverse the order
        const lines = fileContent.split("\n").reverse();

        // Clear the table body
        const tableBody = document.querySelector("#responseTable tbody");
        tableBody.innerHTML = "";

        // Populate the table
        lines.forEach((line) => {
          if (line.trim()) {
            // Skip empty lines
            const [id, date, model, price, repair] = line.split(",");
            const displayId = id ? id : "***"; // Display '***' if id is missing
            if (date && model && price && repair) {
              const [datePart, time24] = date.split(" ");
              const time12 = formatTime24to12(time24); // Convert to 12-hour time
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${displayId}</td>
                <td>${model}</td>
                <td>${repair}</td>
                <td>${price}</td>
                <td>${time12}</td>
                <td>${datePart}</td>
              `;
              tableBody.appendChild(row);
            }
          }
        });
      } catch (error) {
        console.error("Error:", error);
        document.querySelector("#responseTable tbody").innerHTML =
          "<tr><td colspan='6'>Failed to fetch data</td></tr>";
      }
    });

  // Form submission handler for clearing by ID
  document
    .getElementById("clearForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const id = document.getElementById("id").value;

      try {
        const response = await fetch(
          "https://9j78inyh6g.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "deleteProduct",
              id,
            }), // Specify type as deleteProduct
          }
        );

        const result = await response.json();
        const body = JSON.parse(result.body);
        let fileContent = body.fileContent;

        // Split the content into lines and reverse the order
        const lines = fileContent.split("\n").reverse();

        // Clear the table body
        const tableBody = document.querySelector("#responseTable tbody");
        tableBody.innerHTML = "";

        // Populate the table
        lines.forEach((line) => {
          if (line.trim()) {
            // Skip empty lines
            const [id, date, model, price, repair] = line.split(",");
            const displayId = id ? id : "***"; // Display '***' if id is missing
            if (date && model && price && repair) {
              const [datePart, time24] = date.split(" ");
              const time12 = formatTime24to12(time24); // Convert to 12-hour time
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${displayId}</td>
                <td>${model}</td>
                <td>${repair}</td>
                <td>${price}</td>
                <td>${time12}</td>
                <td>${datePart}</td>
              `;
              tableBody.appendChild(row);
            }
          }
        });
      } catch (error) {
        console.error("Error:", error);
        document.querySelector("#responseTable tbody").innerHTML =
          "<tr><td colspan='6'>Failed to fetch data</td></tr>";
      }
    });
});

function showSection(section) {

    document.getElementById("vfx").style.display = "none";
    document.getElementById("green").style.display = "none";

    document.getElementById(section).style.display = "grid";

    document.getElementById("title").innerText =
        section === "vfx" ? "READY TO USE CLIPS" : "GREEN SCREEN TEMPLATES";

    if (section === "vfx") loadClips("vfx", "rdy", 19, 20);
    if (section === "green") loadClips("green", "gt", 15, 20);
}


function loadClips(folder, prefix, price, maxClips) {

    const container = document.getElementById(folder);
    container.innerHTML = "";

    for (let i = 1; i <= maxClips; i++) {

        const videoPath = `clips/${folder}/${prefix}${i}.mp4`;

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <video src="${videoPath}" controls 
                onerror="this.parentElement.style.display='none'">
            </video>
            <h4>${prefix.toUpperCase()} ${i}</h4>
            <button onclick="payNow(${price})">Buy ₹${price}</button>
        `;

        container.appendChild(card);
    }
}


// 💳 PAYMENT
function payNow(amount) {

    var options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: amount * 100,
        currency: "INR",
        name: "FXSTOCK AI",
        description: "VFX Clip Purchase",
        handler: function () {
            alert("Payment Successful ✅");
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}
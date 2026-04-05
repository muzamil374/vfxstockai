function openSection(section) {

    document.getElementById("home").classList.add("hidden");
    document.getElementById("sectionView").classList.remove("hidden");

    const titles = {
        vfx: "READY TO USE CLIPS",
        green: "GREEN SCREEN TEMPLATES"
    };

    document.getElementById("title").innerText = titles[section];

    loadClips(section);
}


// 🔒 LOCKED PANELS
function locked() {
    alert("🔒 This category is locked.\nAdd reels to unlock it.");
}


// 🏠 BACK HOME
function goHome() {
    document.getElementById("sectionView").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}


// 🎬 LOAD CLIPS
function loadClips(folder) {

    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    const config = {
        vfx: { prefix: "rdy", price: 19, count: 20 },
        green: { prefix: "gt", price: 15, count: 20 }
    };

    const data = config[folder];

    for (let i = 1; i <= data.count; i++) {

        const path = `./clips/${folder}/${data.prefix}${i}.mp4`;

        const card = document.createElement("div");
        card.className = "card";

        const video = document.createElement("video");
        video.src = path;
        video.controls = true;

        video.onerror = () => {
            card.style.display = "none";
        };

        const title = document.createElement("h4");
        title.innerText = `${data.prefix.toUpperCase()} ${i}`;

        const btn = document.createElement("button");
        btn.innerText = `Buy ₹${data.price}`;
        btn.onclick = () => payNow(data.price);

        card.appendChild(video);
        card.appendChild(title);
        card.appendChild(btn);

        grid.appendChild(card);
    }
}


// 💳 PAYMENT
function payNow(amount) {

    var options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: amount * 100,
        currency: "INR",
        name: "MorphClip",
        description: "Clip Purchase",
        handler: function () {
            alert("Payment Successful ✅");
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}
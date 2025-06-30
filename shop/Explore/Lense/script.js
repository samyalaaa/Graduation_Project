// Store selected lenses
let selectedLenses = new Set();

// Lens data
const lensData = {
    'magic-blue-cut': {
        name: 'Magic Blue Cut lenses',
    },
    'white-plastic': {
        name: 'White plastic lenses',
    },
    'multi-coated': {
        name: 'Multi-coated lens with reflective coating',
    }
};

function selectLens(lensType) {
    let lensName = "";

    switch (lensType) {
        case "magic-blue-cut":
            lensName = "Magic Blue Cut lenses";
            break;
        case "white-plastic":
            lensName = "White Plastic Lenses";
            break;
        case "multi-coated":
            lensName = "Multi-coated Lens";
            break;
        default:
            lensName = "Unknown Lens";
    }

    // Send POST request to API
    fetch('https://visionhub.runasp.net/api/Brand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'text/plain'
        },
        body: JSON.stringify({
            id: 0,
            name: lensName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("network response was not ok: " );
        }
        return response.text(); // API بيرجع نص
    })
    .then(data => {
        console.log("the lense has been added", data);
        addToSummary(lensName); // Show in UI
    })
    .catch(error => {
        console.error("error:", error);
        alert("failed to add lens: " );
    });
}

// لتحديث ملخص الاختيار في الصفحة
function addToSummary(lensName) {
    const summary = document.getElementById("selectionSummary");
    const list = document.getElementById("selectedLenses");
    const item = document.createElement("li");
    item.textContent = lensName;
    list.appendChild(item);
    summary.style.display = "block";
}

function continueToPurchase() {
    // هنا تقدر تنقل المستخدم لصفحة الدفع أو الخطوة التالية
    window.location.href = "../../../Shoppingcart/cart.html";
}

function goBack() {
    history.back();
}

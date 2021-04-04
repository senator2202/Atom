document.addEventListener("DOMContentLoaded", function () {
    addCoupons(20);

    window.onscroll = function (ev) {
        if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100)) {
            addCoupons(10);
        }
    };

    document.querySelector("#searchInput").addEventListener("keyup", (event) => {
        let text = event.target.value;
        let coupons = document.querySelectorAll(`.coupon`);
        coupons.forEach(function (element, index) {
            if (element.innerHTML.indexOf(`${text}`) === -1) {
                element.style.display = "none";
            } else {
                element.style.display = "";
            }
        })
    })
});

function addCoupons(count) {

    const couponNumber = document.querySelectorAll(".coupon").length;
    const mainContent = document.querySelector(".main-content");

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const coupons = JSON.parse(this.responseText);

            let html = ``;
            for (let i = couponNumber; i < couponNumber + count; i++) {
                const coupon = coupons[i];
                html += `
                  <div class="coupon">
                    <img src="${coupon.imgSource}" alt="grey">
                    <div class="coupon-row">
                      <label>${coupon.couponName}</label>
                      <img src="images/favorite.svg" alt="favorite">
                    </div>
                    <div class="coupon-row">
                      <label>${coupon.briefDescription}</label>
                      <label>exp. in ${coupon.expiresIn} days</label>
                    </div>
                    <div class="coupon-row">
                      <label>${coupon.price}$</label>
                      <button type="button">Add to cart</button>
                    </div>
                  </div>
                `;
            }
            mainContent.innerHTML += html;
        }
    };
    request.open("GET", "json/coupons.json", true);
    request.send();
}
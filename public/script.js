const input = document.querySelector("#longUrl")
const button = document.querySelector("button")
const form = document.querySelector("form")
const after = document.querySelector(".after")
const h1span = document.querySelector("h1 span")
const a_short = document.querySelector(".short_url")

const handleSubmit = async e => {
    e.preventDefault()

    grecaptcha.ready(function () {
        grecaptcha.execute('6LdQ0oQaAAAAAHIc21zgrP4ghZgG2cgdx0X-WCRY', { action: 'submit' })
            .then(async function (token) {
                const data = new FormData(e.target)
                let values = Object.fromEntries(data)
                values.captcha = token

                const res = await fetch("/api/url/shorten", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(values),
                })

                const resdata = await res.json()
                console.log(await resdata);

                if (!resdata.urlCode) {
                    return alert(resdata)
                }

                // alert("Short Url: " + (await resdata).shortUrl)
                a_short.innerHTML = "Short Url: " + window.location.href + (await resdata).urlCode
                a_short.href = window.location.href + (await resdata).urlCode
                a_short.style.pointerEvents = "all"
                a_short.style.opacity = "1"
                input.value = ""
            });
    });
}

form.addEventListener("submit", handleSubmit)

input.addEventListener('focus', () => {
    after.style.width = h1span.offsetWidth + "px"
})
input.addEventListener('focusout', () => {
    after.style.width = "100%"
})
button.addEventListener('focus', () => {
    after.style.width = h1span.offsetWidth + "px"
})
button.addEventListener('focusout', () => {
    after.style.width = "100%"
})

/**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout              
 */
const waitForRecaptchaContainer = (timeout = 0) => {
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const recaptchaContainer = document.querySelector(".grecaptcha-badge").parentElement
            if (recaptchaContainer) {
                clearInterval(timer);
                recaptchaContainer.style.position = "absolute"
                resolve();
            } else if (timeout && now - startTime >= timeout) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

waitForRecaptchaContainer(5000)
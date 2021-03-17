const input = document.querySelector("#longUrl")
const button = document.querySelector("button")
const form = document.querySelector("form")
const after = document.querySelector(".after")
const h1span = document.querySelector("h1 span")

const handleSubmit = async e => {
    e.preventDefault()

    const data = new FormData(e.target)
    const values = Object.fromEntries(data)

    const res = await fetch("/api/url/shorten", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
    })

    const resdata = (await res).json()
    console.log(await resdata);
    alert("Short Url: " + (await resdata).shortUrl)

    input.value = ""
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

// const sectionStyle = e => {
//     console.log("changing bg");
//     e.target.style.background = "linear-gradient(-45deg, #cacaca, #f0f0f0)";
//     // e.target.style.boxShadow = "20px 20px 60px #bebebe,-20px -20px 60px #ffffff";
// }
// section.addEventListener('mouseleave', e => {
//     e.target.style.background = "transparent"
//     // e.target.style.boxShadow = "20px 20px 60px #bebebe,-20px -20px 60px #ffffff, 1px 2px 3px rgba(0, 0, 0, .5)";
// })

// document.styleSheets[0].insertRule(`section:hover .after { width: ${document.querySelector('h1 span').offsetWidth}px;}`, 0);
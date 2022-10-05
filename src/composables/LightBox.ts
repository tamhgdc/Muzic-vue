const createLightBox = (): void => {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    document.body.appendChild(lightbox);
}

const removeLightBox = (): void => {
    const lightbox = document.querySelector(".lightbox");
    lightbox && document.body.removeChild(lightbox);
}

export { createLightBox, removeLightBox };
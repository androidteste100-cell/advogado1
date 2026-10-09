document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = document.getElementById("hero-canvas");
    const context = canvas.getContext("2d");

    const frameCount = 120; 
    const currentFrame = index => `./frames/frame_${String(index + 1).padStart(4, '0')}.webp`;

    const images = [];
    const frameSequence = { frame: 0 };

    function preloadImages() {
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }
    }

    preloadImages();

    function updateCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    }

    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();

    images[0].onload = render;

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let img = images[frameSequence.frame];
        if (img) {
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShiftX = (canvas.width - img.width * ratio) / 2;
            const centerShiftY = (canvas.height - img.height * ratio) / 2;
            
            context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        }
    }

    gsap.to(frameSequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#hero-scroller",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: true
        },
        onUpdate: render
    });
});

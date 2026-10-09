document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("hero-canvas");
    const context = canvas.getContext("2d");

    const frameCount = 240; // Ajuste para o número total de frames da sua pasta

    const currentFrame = (index) => {
        const frameNumber = String(index + 1).padStart(4, '0');
        return `./frames/frame_${frameNumber}.webp`;
    };

    const images = [];
    const frameState = { frame: 0 };
    let imagesLoaded = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (images[frameState.frame] && images[frameState.frame].complete) {
            render();
        }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === 1) {
                render();
            }
        };
        images.push(img);
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[Math.round(frameState.frame)];
        
        if (img && img.complete) {
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            
            const centerShiftX = (canvas.width - img.width * ratio) / 2;
            const centerShiftY = (canvas.height - img.height * ratio) / 2;
            
            context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
        }
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(frameState, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: "#hero-trigger",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            pin: true
        },
        onUpdate: render
    });
});

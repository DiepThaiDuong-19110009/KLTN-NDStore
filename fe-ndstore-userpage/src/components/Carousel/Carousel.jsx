import { MenuNav, Overlay, Slide } from "hero-slider";
import HeroSlider from "hero-slider/dist/HeroSlider";
import React from "react";

const CarouselComponent = () => {
    return (
        <HeroSlider
            width={'100%'}
            height={"50vh"}
            autoplay
            controller={{
                initialSlide: 1,
                slidingDuration: 500,
                slidingDelay: 100,
                onSliding: (nextSlide) =>
                    console.debug("onSliding(nextSlide): ", nextSlide),
                onBeforeSliding: (previousSlide, nextSlide) =>
                    console.debug(
                        "onBeforeSliding(previousSlide, nextSlide): ",
                        previousSlide,
                        nextSlide
                    ),
                onAfterSliding: (nextSlide) =>
                    console.debug("onAfterSliding(nextSlide): ", nextSlide)
            }}
        >
            {/* <Overlay>
                Check out the documentation for more advanced examples.
            </Overlay> */}

            <Slide
                // shouldRenderMask
                label="Ưu đãi học sinh, sinh viên"
                background={{
                    backgroundImageSrc: 'https://lh3.googleusercontent.com/2-2QrEjqAfQPnLqeUBT_bVj4Zbg9IoEk_nfAQcmVQGE6JZ_GCBXLmiNQcW2lT540qrYw6cqCV8l1QNGTm_elc7-XfFsMC1dW=w1920-rw'
                }}
            />

            <Slide
                // shouldRenderMask
                label="Laptop - Lenovo"
                background={{
                    backgroundImageSrc: 'https://lh3.googleusercontent.com/qMzCAwc2541i_uOVjJVOgN8gfJxSC_98C6SrK8i03Q6nC4hZ-5NudPqCHc4Ft4_4Zrr5H5IO-7JLL5kWrwRk98pJKHgVoag=w1920-rw'
                }}
            />

            <Slide
                // shouldRenderMask
                label="Laptop - Acer"
                background={{
                    backgroundImageSrc: 'https://lh3.googleusercontent.com/YSEh7mEEW8a_KbVD42Mut-z-NVGg_x9d8YBLcI8ZHZxX0PPVLz30TqanefsaJITaHRRimZ8W75k2SD6WXoqEogPcpqj4EePL=w1920-rw'
                }}
            />

            <Slide
                // shouldRenderMask
                label="Laptop - LG"
                background={{
                    backgroundImageSrc: 'https://lh3.googleusercontent.com/7fLNK64SX-6-xlW1aHfS0kbJOs8XxPpVPvDJIhL_3PS34Vo9VXTZTzaFRRtdoY38r2_XYbjonorwEmSUQgYkZXnSuVqSTvmB=w1920-rw'
                }}
            />

            <MenuNav />
        </HeroSlider>
    );
}
export default CarouselComponent;

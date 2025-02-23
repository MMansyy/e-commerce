import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MainSlider.css";

const slides = [
    { id: 1, title: "Yeeze", image: "https://fashion-slider.uiinitiative.com/images/yeeze.jpg" },
    { id: 2, title: "Puma", image: "https://fashion-slider.uiinitiative.com/images/puma.jpg" },
    { id: 3, title: "Nike", image: "https://fashion-slider.uiinitiative.com/images/nike.jpg" }
];

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
};

const FashionSlider = () => {
    return (
        <div className="w-full h-[80vh] overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="h-[80vh] relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-4 text-4xl font-bold">
                            {slide.title}
                        </div>
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full  object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FashionSlider;

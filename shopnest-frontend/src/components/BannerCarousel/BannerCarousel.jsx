import AliceCarouselModule from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
const AliceCarousel = AliceCarouselModule.default;
import styles from "./BannerCarousel.module.css";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.webp";
import img5 from "../../assets/img5.jpg";

const BannerCarousel = () => {
  const slides = [
    {
      image: img1,
      alt: "ShopNest fashion spotlight",
      eyebrow: "Fresh Picks",
      title: "Season-ready styles for everyday shopping",
      subtitle: "Discover standout essentials, clean fits, and easy upgrades.",
    },
    {
      image: img2,
      alt: "ShopNest trending products",
      eyebrow: "Trending Now",
      title: "Top looks curated for comfort and confidence",
      subtitle: "Browse the pieces everyone is adding to cart this week.",
    },
    {
      image: img3,
      alt: "ShopNest latest arrivals",
      eyebrow: "New Arrivals",
      title: "Bring fresh energy into your wardrobe",
      subtitle: "Modern picks designed to keep your style feeling current.",
    },
    {
      image: img4,
      alt: "ShopNest exclusive offers",
      eyebrow: "Smart Deals",
      title: "Premium looks with better prices",
      subtitle: "Save more while shopping the styles you actually want to wear.",
    },
    {
      image: img5,
      alt: "ShopNest daily essentials",
      eyebrow: "Daily Essentials",
      title: "Built for repeat wear, styled for every plan",
      subtitle: "Easy favorites for workdays, weekends, and everything between.",
    },
  ];

  const items = [
    ...slides.map((slide, index) => (
      <div key={index} className={styles.slide}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{slide.eyebrow}</span>
          <h2 className={styles.title}>{slide.title}</h2>
          <p className={styles.subtitle}>{slide.subtitle}</p>
        </div>

        <div className={styles.imageShell}>
          <img
            src={slide.image}
            className={styles.carouselImage}
            alt={slide.alt}
          />
        </div>
      </div>
    )),
  ];

  return (
    <div className={styles.carouselContainer}>
      <AliceCarousel
        items={items}
        autoPlay
        infinite
        autoPlayInterval={2800}
        animationDuration={900}
        mouseTracking
        disableButtonsControls
      />
    </div>
  );
};

export default BannerCarousel;

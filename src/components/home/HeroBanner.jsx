import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import { bannerLists } from '../../utils';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroBanner = () => {
    return (
        <div className='relative w-full h-[80vh] md:h-screen overflow-hidden bg-background'>
            <Swiper
                grabCursor={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                modules={[Pagination, EffectFade, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className="h-full w-full"
            >
                {bannerLists.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative w-full h-full flex items-center pt-20 overflow-hidden">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]" 
                                    src={item.image} 
                                    alt={item.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 max-w-screen-2xl mx-auto px-8 md:px-12 w-full grid grid-cols-1 md:grid-cols-2">
                                <motion.div 
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="flex flex-col gap-6 md:gap-8 items-start"
                                >
                                    <span className="label-md uppercase tracking-[0.3em] text-primary font-bold text-xs">
                                        {item.title || "ESTABLISHED 2024"}
                                    </span>
                                    <h1 className="font-headline text-5xl md:text-8xl leading-[1.1] tracking-tight text-on-surface">
                                        {item.subtitle || "Artistry in"} <br/>
                                        <span className="italic font-light opacity-90">{item.description || "Every Strand."}</span>
                                    </h1>
                                    <p className="text-secondary text-lg max-w-md leading-relaxed font-body">
                                        A boutique sanctuary where editorial precision meets effortless beauty. We curate looks that define identities.
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <Link 
                                            to="/products"
                                            className="bg-primary hover:bg-on-primary-container text-on-primary px-10 py-5 rounded-sm transition-all duration-300 font-bold tracking-[0.2em] text-xs uppercase shadow-xl shadow-primary/10"
                                        >
                                            EXPLORE COLLECTION
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Swiper Pagination Styling */}
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background: var(--color-primary) !important;
                    opacity: 0.3;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 24px;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}

export default HeroBanner;
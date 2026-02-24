"use client"
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const HorizontalScrollCarousel = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }: { card: CardType }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[450px] w-[450px] overflow-hidden rounded-xl"
        >
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>
            <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-linear-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}
                </p>
            </div>
        </div>
    );
};

export default HorizontalScrollCarousel;

type CardType = {
    url: string;
    title: string;
    id: number;
};

const cards: CardType[] = [
    {
        url: "https://i.pinimg.com/736x/56/79/31/567931a6b291d7f7a7a165a33ff916bc.jpg",
        title: "Title 1",
        id: 1,
    },
    {
        url: "https://i.pinimg.com/736x/37/56/34/375634d41668c94750007153e3e3959f.jpg",
        title: "Title 2",
        id: 2,
    },
    {
        url: "https://i.pinimg.com/1200x/77/c3/f3/77c3f3c3b6bebf337452fbf25db2ab44.jpg",
        title: "Title 3",
        id: 3,
    },
    {
        url: "https://i.pinimg.com/736x/7c/c7/9b/7cc79b0d3dd5d2c8a4ab981e3d449f07.jpg",
        title: "Title 4",
        id: 4,
    }
];
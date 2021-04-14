import React, {useState, useEffect} from 'react';
import {Link} from "gatsby";
import {motion} from "framer-motion"

//scroll observer
import {useInView} from "react-intersection-observer";
import {useAnimation} from "framer-motion"

// assets
import FeatureVideo from "../../assets/video/featured-video.mp4"

// styles
import { Container, Flex } from "../../styles/globalStyles"
import { FeaturedContent, HomeFeaturedSection, FeaturedVideo, FeaturedProject } from "../../styles/homeStyles"

const HomeFeature = ({onCursorHover}) => {
    const [hovered, setHovered] = useState(false)

    const animation = useAnimation();
    const [featuredRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-300px"
    });

    useEffect(() => {
        if(inView) {
            animation.start("visible")
        }
        
    }, [animation, inView])

    return (
        <HomeFeaturedSection
            ref={featuredRef}
            animate={animation}
            initial="hidden"
            variants={{
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: .6,
                        ease: [.6,.05,-.01, .9]
                    }
                },
                hidden: {
                    opacity: 0,
                    y: 72
                }

            }}
        >
            <Container>
                <Link>
                    <FeaturedContent onHoverStart={() => setHovered(!hovered)} onHoverEnd={() => setHovered(!hovered)} onMouseEnter={() => onCursorHover("hovered")} onMouseLeave={onCursorHover}>
                        <Flex spaceBetween>
                            <h3>Featured Projects</h3>
                            <motion.div 
                                animate={{opacity: hovered ? 1 : 0}}
                                transition={{
                                    duration: .6,
                                    ease: [.6,.05,-.01, .9]
                                }} className="meta">
                                <h4>PEI Seafood</h4>
                                <h4>2021</h4>
                            </motion.div>
                        </Flex>
                        <h2 className="featured-title">
                            NOT <br/> HUMBLE
                            <span className="arrow">
                                <motion.svg
                                    animate={{x: hovered ? 48 : 0}}
                                    transition={{
                                        duration: .6,
                                        ease: [.6,.05,-.01, .9]
                                    }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 101 57"
                                    >
                                        <path
                                            d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                            fill="#FFF"
                                            fillRule="evenodd"
                                        ></path>
                                </motion.svg>
                            </span>
                        </h2>
                    </FeaturedContent>
                    <FeaturedVideo>
                        <video loop autoPlay muted src={FeatureVideo}></video>
                    </FeaturedVideo>
                </Link>
            </Container>
            <Container>
                <FeaturedProject>
                    <Flex flexEnd>
                        <button>
                            <span>All Projects</span>
                        </button>
                    </Flex>
                </FeaturedProject>
            </Container>
        </HomeFeaturedSection>
    )
}

export default HomeFeature

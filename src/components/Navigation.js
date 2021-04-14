import React, {useState} from 'react';
import {Link} from "gatsby"
import {motion, AnimatePresence} from "framer-motion"

//styles
import {Container, Flex} from "../styles/globalStyles";
import {Nav, CloseNav, NavHeader, NavFooter, NavList, NavVideos} from "../styles/navigationStyles";

// videos
import FeaturedVideo from "../assets/video/featured-video.mp4"
import EasyVideo from "../assets/video/easy.mp4"
import MakeItZeroVideo from "../assets/video/make-it-zero.mp4"
import ItTakesAnIslandVideo from "../assets/video/it-takes-an-island.mp4"
import BeachesVideo from "../assets/video/50-beaches.mp4"



const navRoutes = [
    {
        id: 0, title: "not humble", path: "/not-humble", video: FeaturedVideo
    },

    {
        id: 1, title: "bleeping easy", path: "/bleeping-easy", video: EasyVideo
    },

    {
        id: 2, title: "make it zero", path: "/make-it-zero", video: MakeItZeroVideo
    },

    {
        id: 3, title: "it takes an island", path: "/it-takes-an-island", video: ItTakesAnIslandVideo
    },

    {
        id: 4, title: "50 beaches", path: "/50-beaches", video: BeachesVideo
    }
]

const Navigation = ({toggleMenu, setToggleMenu, onCursorHover}) => {

    const [revealVideo, setRevealVideo] = useState({
        show: false,
        video: FeaturedVideo,
        key: "0"
    })


    return (
        <AnimatePresence>
            {
                toggleMenu && 
                <Nav initial={{x: "-100%"}} exit={{x: "-100%"}} animate={{x: toggleMenu ? 0: "-100%"}} transition={{duration: .8, ease: [0.6,0.05, -0.01, 0.9]}} >
                    <Container>
                        <NavHeader>
                            <Flex spaceBetween noHeight>
                                <h2>Projects</h2>
                                <CloseNav onClick={() => setToggleMenu(!toggleMenu)} onMouseEnter={() => onCursorHover("pointer")} onMouseLeave={onCursorHover}>
                                    <button>
                                        <span></span>
                                        <span></span>
                                    </button>
                                </CloseNav>
                            </Flex>
                        </NavHeader>

                        <NavList>
                            <ul>
                                {
                                    navRoutes.map(route => 
                                        <motion.li key={route.id} 
                                            onMouseEnter={() => onCursorHover("pointer")} onMouseLeave={onCursorHover}
                                            onHoverStart={() => setRevealVideo({
                                            show: true,
                                            video: route.video,
                                            key: route.id
                                        })}
                                            onHoverEnd={() => setRevealVideo({
                                                show: false
                                            })} >
                                            <Link to={`/projects/${route.path}`}>
                                                <motion.div initial={{x: -60}} whileHover={{x: -20, transition: {
                                                    duration: 0.4,
                                                    ease: [0.6,0.05, -0.01, 0.9]
                                                }}} className="link">
                                                    <span className="arrow">
                                                        <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 101 57"
                                                        >
                                                            <path
                                                                d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                                                fill="#FFF"
                                                                fillRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    {route.title}
                                                </motion.div>
                                            </Link>
                                        </motion.li>
                                    )
                                }
                                
                            </ul>

                        </NavList>

                        <NavFooter>

                        </NavFooter>

                        <NavVideos>
                            <motion.div animate={{width: revealVideo.show ? "0" : "100%"}} className="reveal">
                            </motion.div>
                            <div className="video">
                                <AnimatePresence initial={false} exitBeforeEnter>
                                    <motion.video key={revealVideo.key}
                                    initial={{opacity: 0}}
                                    exit={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut"
                                    }}
                                    src={revealVideo.video}
                                        loop
                                        autoPlay
                                        muted
                                    >
                                    </motion.video>
                                </AnimatePresence>
                            </div>
                        </NavVideos>
                    </Container>
                
                </Nav>
            }
        </AnimatePresence>
        
    )
}

export default Navigation

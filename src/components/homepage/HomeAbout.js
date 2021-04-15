import React, {useState, useEffect} from 'react'
import {motion, useAnimation} from "framer-motion"
import {useInView} from "react-intersection-observer";

// context
import {useGlobalStateContext} from "../../context/globalContext"

// styles
import { Container, Flex } from "../../styles/globalStyles"
import { HomeAboutSection, About, Services, AccordionHeader, AccordionIcon, AccordionContent } from "../../styles/homeStyles"

// Accordion Data
const accordionIds = [
    {
      id: 0,
      title: "Pre-Production",
      results: [
        "Creative Development",
        "Writing",
        "Creative Development",
        "Writing",
        "Storyboards",
        "Art Direction",
        "Creative Direction",
        "Location Scouting",
        "Casting",
      ],
    },
    {
      id: 1,
      title: "Video Production",
      results: [
        "Principle Photography",
        "Production Management",
        "Crew",
        "Dailies",
        "LTO-Archiving",
      ],
    },
    {
      id: 2,
      title: "Post-Production",
      results: [
        "Colour correction",
        "Offline editing",
        "Online editing",
        "VFX",
        "Animation and motion graphics",
        "Closed captioning and subtitles",
        "Descriptive video",
        "Dailies",
        "Quality control",
        "LTO Archiving",
      ],
    },
    {
      id: 3,
      title: "Audio Post-Production",
      results: [
        "We work with some amazing partners who provide:",
        "Sound Design",
        "SFX",
        "Music",
        "Sound Mix",
      ],
    },
  ]


const HomeAbout = ({onCursorHover}) => {

    const animation = useAnimation();
    const [aboutRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-300px"
    })

    useEffect(() => {
        if(inView) {
            animation.start("visible")
        }
        
    }, [animation, inView])

    const [expanded, setExpanded] = useState(0);

    return (
        <HomeAboutSection 
            ref={aboutRef}
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
                <Flex alignTop>
                    <About>
                        <h2>
                            Furrow is an integrated, full service creative studio offering
                            video production, creative development, and post-production services.
                        </h2>
                        <p>
                            Everybody’s got a story. And we don’t stop until we’ve uncovered
                            what makes yours worth telling. Whether it’s working directly with
                            you, an agency partner, or putting the finishing touches on
                            something special, we’re ready to dig in and get our hands
                            dirty—are you?
                        </p>
                    </About>
                    <Services>
                        <h3>Services</h3>
                        {
                            accordionIds.map((details, index) => <Accordion key={index} details={details} expanded={expanded} setExpanded={setExpanded} onCursorHover={onCursorHover} />)
                        }
                        
                    </Services>
                </Flex>
            </Container>
            
        </HomeAboutSection>
    )
}

const Accordion = ({details, expanded, setExpanded, onCursorHover}) => {

    const isOpen = details.id === expanded;
    const [hovered, setHovered] = useState(false);
    const {currentTheme} = useGlobalStateContext();

    return (
        <>
            <AccordionHeader 
                onMouseEnter={() => onCursorHover("hovered")} 
                onMouseLeave={onCursorHover} 
                onClick={() => setExpanded(isOpen ? false : details.id)}
                onHoverStart={() => setHovered(!hovered)}
                onHoverEnd={() => setHovered(!hovered)}
                whileHover={{
                    color: currentTheme === "dark" ? "#ffffff" : "#000000"
                }}
            >
                <AccordionIcon>
                    <motion.span
                        animate={{rotate: isOpen || hovered ? 0: 45, x: 3}}
                        transition={{duration: .2, ease: [.6,.05,-.01, .9]}}
                    ></motion.span>
                    <motion.span
                        animate={{rotate: isOpen || hovered ? 0: -45, x: -3}}
                        transition={{duration: .2, ease: [.6,.05,-.01, .9]}}
                    ></motion.span>
                </AccordionIcon>
                {details.title}
            </AccordionHeader>

            <AccordionContent key="content" animate={{height: isOpen ? "100%" : "0"}} transition={{duration: .8, ease: [.6,.05,-.01, .9]}}>
                {details.results.map((detail, index) => <span key={index}>{detail}</span>)}
            </AccordionContent>
        </>
    )
}

export default HomeAbout

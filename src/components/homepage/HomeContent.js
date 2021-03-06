import React, {useEffect} from 'react';

//scroll behaviour
import {useInView} from "react-intersection-observer";
import {useAnimation} from "framer-motion"

// styles
import { Container } from "../../styles/globalStyles"
import { Content, HomeContentSection } from "../../styles/homeStyles"

const HomeContent = () => {

    const animation = useAnimation();
    const [contentRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-300px"
    });

    useEffect(() => {
        if(inView) {
            animation.start("visible")
        }
        
    }, [animation, inView])

    return (
        <HomeContentSection 
            ref={contentRef}
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
                <Content>
                Great stories don’t just happen— <br /> they need to be uncovered. And
                we dig deep to discover the great stories that lie just below the
                surface. Dirt under our fingernails and all.
                </Content>
            </Container>
        </HomeContentSection>
    )
}

export default HomeContent;

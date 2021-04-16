import React, {useEffect, useRef} from 'react';
import {FooterNav, FooterContent, FooterSocial} from "../styles/footerStyles"
import {Container, Flex} from "../styles/globalStyles"

// Scroll Animations
import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"

//icons
import {Instagram, Facebook, Vimeo } from "../assets/svg/social-icons"

//hooks
import useElementPosition from "../hooks/useElementPosition"


const Footer = ({onCursorHover, setHamburgerPosition}) => {

    const instagramRef = useRef(null);
    const facebookRef = useRef(null);
    const vimeoRef = useRef(null);

    const IgPosition = useElementPosition(instagramRef)
    const FbPosition = useElementPosition(facebookRef)
    const VmPosition = useElementPosition(vimeoRef)

    const animation = useAnimation()
    const [footerRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-50px",
    })

    useEffect(() => {
        if (inView) {
        animation.start("visible")
        }
    }, [animation, inView])

    const footerSocialHover = x => {
        onCursorHover("locked")
        setHamburgerPosition({ x: x })
      }

    return (
        <FooterNav
            ref={footerRef}
            animate={animation}
            initial="hidden"
            variants={{
                visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] },
                },
                hidden: { opacity: 0, y: 72 },
            }}
        >
            <Container>
                <Flex spaceBetween>
                    <FooterContent>
                        <p>0706.789.4583</p>
                        <p>adeoluayangade@yahoo.com</p>
                    </FooterContent>
                    <FooterContent wider>
                        <p>8 Ifeoluwa Est, Magodo</p>
                        <p>Lagos, Nigeria</p>
                    </FooterContent>
                    <FooterSocial>
                        <a ref={instagramRef} href="/" onMouseEnter={() => footerSocialHover(IgPosition.x)} onMouseLeave={onCursorHover} >
                            <Instagram />
                        </a>

                        <a ref={facebookRef} href="/" onMouseEnter={() => footerSocialHover(FbPosition.x)} onMouseLeave={onCursorHover}>
                            <Facebook />
                        </a>

                        <a ref={vimeoRef} href="/" onMouseEnter={() => footerSocialHover(VmPosition.x)} onMouseLeave={onCursorHover}>
                            <Vimeo />
                        </a>
                    </FooterSocial>
                </Flex>
            </Container>
        </FooterNav>
    )
}

export default Footer;

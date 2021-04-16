import { motion } from "framer-motion";
import styled, {css} from "styled-components";

export const FooterNav = styled(motion.div)`
    height: 150px;
    margin-top: 296px;
`

export const FooterContent = styled.div`
    color: ${props => props.theme.red};
    font-size: 1.2rem;
    font-weight: 600;
    line-height: .5rem;
    flex: 1;

    ${props => props.wider && css`
        flex: 2;
    `}
`

export const FooterSocial = styled.div`
    display: flex;
    position: relative;
    a {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        padding: 10px;

        svg {
            width: 100%;
            height: 100%;
        }
    }
`
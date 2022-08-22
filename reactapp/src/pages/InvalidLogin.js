import {StyledFormArea, StyledTitle, colors, TextLink, StyledContainer} from './../components/Styles'
import React from 'react';
import { errormsg } from './Login';

const InvalidLogin = () => {
    return(
        <StyledContainer>
        <div>
            <StyledFormArea>
                <StyledTitle color={colors.theme} size={25}>
                    {errormsg}
                </StyledTitle>
                <StyledTitle color={colors.dark2} size={15}>
                    New Member ? <TextLink to="/signup">Signup</TextLink>
                </StyledTitle>
                <StyledTitle color={colors.dark2} size={15}>
                    Already have an account ? <TextLink to="/login">Login</TextLink>
                </StyledTitle>
            </StyledFormArea>
        </div>
        </StyledContainer>
    )
}
export default InvalidLogin;
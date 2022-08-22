import {StyledFormArea, StyledTitle, colors, ExtraText, TextLink, StyledContainer} from './../components/Styles'
import React from 'react';
import { errormsg } from './Signup';

const UsernotAdded = () => {
    return(
        <StyledContainer>
        <div>
            <StyledFormArea>
                <StyledTitle color={colors.theme} size={30}>
                    {errormsg}
                </StyledTitle>
                <ExtraText>
                    Please continue with <TextLink to="/login">Login</TextLink>
                </ExtraText>
            </StyledFormArea>
        </div>
        </StyledContainer>
    )
}
export default UsernotAdded;
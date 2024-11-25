import React from 'react'
import { useState, useRef } from 'react';
import { verifyEmailApi, verifyOTPApi } from '../../api/handleRegister';
import ChooseBttn from '../ui/ChooseBttn';

const moveFocusTo = (e, inputRefs, index) => {
    const prevInputRef = inputRefs.current[index - 1];
    const nextInputRef = inputRefs.current[index + 1];
    const maxLength = parseInt(e.target.maxLength, 10);
    const currentLength = e.target.value.length;
    const key = e.keyCode || e.charCode;

    if (key === 8 && currentLength === 0 && prevInputRef) {
        prevInputRef.focus();
    } else if (currentLength >= maxLength && nextInputRef) {
        nextInputRef.focus();
    } else if (key === 37) {
        prevInputRef?.focus();
    } else if (key === 39) {
        nextInputRef?.focus();
    } 
};

const handleCodeInputChange = (index, value, curCode, setCode) => {
    const newOtpCode = [...curCode];
    newOtpCode[index] = value;
    setCode(newOtpCode);
};

const OTPverification = ({ navigate, email, setOTP, user, OTP, setNotifMessage, setInputErrors }) => {
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']); 
    const inputRefs = useRef([]);
    const handleVerifyOTP = () => {
        const verificationCode = otpCode.join('');
        const payload = {
            verificationCode: verificationCode,
            email: email,
            setOTP: setOTP,
            setNotifMessage: setNotifMessage
        }
        verifyOTPApi(payload);
    };
    
    const handleSendNewVerificationCode = (event) => {
        event.preventDefault();
        const payload = {
          setOTP,
          user,
          setNotifMessage,
          setInputErrors
        }

        verifyEmailApi(payload)
    }

    return (
        <>
            <div className='form_container otp_verification'>
                {OTP.registered ? (<>
                    <h1>Registered</h1>
                    <p>New user registed successfully</p>
                    <ChooseBttn 
                      singleBttn={true} 
                      singleBttnLabel={"Proceed"}
                      singleBttnFunc={() => navigate("/")}
                    />
                </>) : (<>
                    <h1>OTP Verification</h1>
                    <p>Please enter the code we have sent to your email "{email}"</p>
                    <div className="OTP_input_fields">
                    {otpCode.map((digit, index) => {
                        return (
                        <input
                            key={index}
                            placeholder='-'
                            type="tel"
                            maxLength="1"
                            value={digit}
                            ref={el => inputRefs.current[index] = el}
                            onChange={(e) => handleCodeInputChange(index, e.target.value, otpCode, setOtpCode)}
                            onKeyUp={(e) => moveFocusTo(e, inputRefs, index)}
                        />
                        )
                    })}
                    </div>
                    <p>Didn't receive the code? <a href="" onClick={handleSendNewVerificationCode}>Resend</a></p>
                    <ChooseBttn 
                        doubleBttn={true}
                        leftBttnLabel={"Clear"} 
                        rightBttnLabel={"Verify"} 
                        leftBttnFunc={() => setOtpCode(['', '', '', '', '', ''])} 
                        rightBttnFunc={handleVerifyOTP} 
                    />
                </>)}
            </div>
        </>
    );
};

export default OTPverification;


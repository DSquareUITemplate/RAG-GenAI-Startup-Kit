import React, { useState, useEffect, useRef } from 'react';
import Styles from './Chat.module.css';
import send from '../../../../src/Assets/Group 41777.svg';
import likeIcon from '../../../Assets/Like 1.svg';
import dislikeIcon from '../../../Assets/Dis_Like.svg';
import regenerateIcon from '../../../Assets/Try_Again 1.svg'; 
import Copy from '../../../Assets/Copy 1.svg'; 
import inputIcon from '../../../Assets/Message.svg';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { BASE_URL_1 } from '../../../api';

const ChatComponent = ({ onFaqdataChange, onSelectFaqPath, inputText, setInputText, messages, setMessages, previousResponse, setPreviousResponse}) => {

    const [liked, setLiked] = useState(0); 
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef(null);
    
    const scrollToBottom = () => {
        if(messageEndRef.current){
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async()  => {
        setLoading(true);
   
        const userMessage =  { 
            text: inputText, 
            sender: 'user', 
        }

        if(inputText.trim() !== "") {
            setMessages(prevMessages => [...prevMessages, userMessage]);
        }

        const userMessages = messages.filter(msg => msg.sender === 'user');
        const currentAndPreviousPrompts = [...userMessages.map((msg) => msg.text), inputText];


        setTimeout(async () => {
        try{  
            const userInfo = {    
                "user": "GENAI",     
                "timestamp": "213234144",  
                // "timestamp": new Date().toLocaleTimeString(),   
                "prompt": currentAndPreviousPrompts,     
                "areaOfIntrest": "AI",
                "source_path": onSelectFaqPath?.length==0 ? '' : onSelectFaqPath,
                "previous_response": previousResponse
            }; 
            const queryParams =  JSON.stringify(userInfo) ;
            const url = `${BASE_URL_1}/chat?message=${queryParams}`;
            console.log(url)
            const response = await axios.get(url, { headers: { "Content-Type" : "application/json"}})
            console.log('chat response**********',response.data);
            onFaqdataChange(response.data);
            
            if(response.data.status !== 'EXCEPTION') {
                const botMessage = response.data.message.description;
                setMessages(prevMessages => [...prevMessages, {text: botMessage, sender: 'bot'}])

                setPreviousResponse({ result: response.data.message.result })
                // console.log("prev response",userInfo.previous_response)

            
            }
        }
        catch(error){
            console.log(error);
        } finally {
            setLoading(false);
        }
    });

        setInputText('');
    };



    const handlekeyPress = (e) => {
        if(e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    }

    const handleLike = () => {
        setLiked(liked + 1);
    };

    const handleDislike = () => {
        // Handle dislike functionality
    };

    const handleRegenerate = () => {
        // const text = generateRandomText();
        // setMessages(prevMessages => [...prevMessages, 
        //     { text, sender: 'bot' }
        // ]);
    };

    const handleCopy = async (index) => {         
        
        if(index >= 0 && index < messages.length) {
            const textToCopy = messages[index].text;
            try {             
                // Use the Clipboard API to copy the text            
                await navigator.clipboard.writeText(textToCopy);             
                console.log('Text successfully copied to clipboard');         
            } catch (err) {             
                console.error('Unable to copy text', err);         
            } 
        }    
    };


    return (
        <div className={Styles.container}>
            <div className={Styles.messageContainer}>
                {messages.map((message, index) => (
                    <div key={index} className={Styles.message}>
                        {message.sender === 'user' ? (
                            <span className={Styles.userMessage}>{message.text}</span>
                            ) :  (
                            <div>
                                {message.text && (
                                    <div>
                                        <div className={Styles.botMessage}>
                                            <span className={ Styles.botMessageContent}>{message.text}</span>
                                        </div>
                                        <div className={Styles.reactions}>
                                            <img src={regenerateIcon} alt="regenerate" onClick={handleRegenerate} className={Styles.regenerate} data-toggle="tooltip"  title='Try again'/>
                                            <img src={Copy} alt="copy" onClick={() => handleCopy(index)} className={Styles.copy} data-toggle="tooltip"  title='Copy Text'/>
                                            <img src={likeIcon} alt="like" onClick={handleLike} className={Styles.like} data-toggle="tooltip"  title='Helpful'/>
                                            <img src={dislikeIcon} alt="dislike" onClick={handleDislike} className={Styles.dislike} data-toggle="tooltip"  title='Not Helpful'/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))} 
                <div ref={messageEndRef}/> 
            </div>
            <div className={Styles.inputContainer}>
                <img src={inputIcon} alt='chat icon' className={Styles.inputIcon}/>
                <input type="text" 
                    value={inputText} 
                    onKeyDown={handlekeyPress} 
                    onChange={(e) => setInputText(e.target.value)} 
                    placeholder="Please give the prompt here..." 
                    className={Styles.inputField}></input>

                    {loading ? (
                    <div className={Styles.loader}>
                    <ClipLoader
                        color='#000048'
                        loading={loading}
                        // cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"/>
                    </div>
                ) : (
                <img src={send} alt="send" 
                    onClick={handleSendMessage} 
                    className={`${Styles.sendIcon} ${inputText.trim()==='' ? Styles.disabled: ''}`} 
                    data-toggle="tooltip"  
                    title='Send Message'/>
                )}
            </div>
        </div>

    );
};
export default ChatComponent;
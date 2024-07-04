import React, { useState, useEffect, useRef } from 'react';  
import Styles from './Chat.module.css';  
import send from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Group 41777.svg';  
import likeIcon from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Like 1.svg';  
import dislikeIcon from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Dis_Like.svg';  
import regenerateIcon from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Try_Again 1.svg';   
import Copy from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Copy 1.svg';   
import inputIcon from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/Assets/Message.svg';  
import axios from 'axios';  
import ClipLoader from "react-spinners/ClipLoader";  
import { BASE_URL_1 } from 'C:/Users/909663/Downloads/genaiui_sample/genaiui_sample/Genai_UI/src/api';  

const ChatComponent = ({ selectedFilesText,onFaqdataChange, onSelectFaqPath, inputText,setInputText,  previousResponse, setPreviousResponse}) => {  
    const [selectedFilesForComparison, setSelectedFilesForComparison] = useState([]);    
    //const [selectedFilesText, setSelectedFilesText] = useState([]); 
    const [liked, setLiked] = useState(0);   
    const [loading, setLoading] = useState(false);  
    const messageEndRef = useRef(null);  
    const [messages, setMessages] = useState([]);  

    const scrollToBottom = () => {  
        if(messageEndRef.current){  
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });  
        }  
    }  
  
    useEffect(() => {  
        scrollToBottom();  
    }, [messages]);  
  
    /*const handleSendMessage = async()  => {  
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
  
                //setPreviousResponse({ result: response.data.message.result })  
                 console.log("prev response",userInfo.previous_response)  
  
              
            }  
        }  
        catch(error){  
            console.log(error);  
        } finally {  
            setLoading(false);  
        }  
    });  
  
        setInputText('');  
    };*/  
    
                
    const handleSendMessage = async () => {      
            setLoading(true); 
            //alert(`${selectedFilesText}`);     
            //const allText = selectedFilesText.join(' ') + ' ' + inputText;
            const trimmedInputText = typeof inputText === "string" ? inputText.trim() : "";
            if (trimmedInputText !== "") {  
            const userMessage = {      
                text: trimmedInputText,      
                sender: 'user',      
            };  
            setMessages(prevMessages => [...prevMessages, userMessage]);      
        };
            
            // if (trimmedInputText !== "") {      
            //     setMessages(prevMessages => [...prevMessages, userMessage]);      
            // }                 
            setInputText(''); // Clear input text      
            //setSelectedFilesText([]);
                
        try {  
            const formData = new FormData(); 
            formData.append('question', trimmedInputText);       
        formData.append('pdf1', selectedFilesText);   
        console.log(selectedFilesText.name);      
        console.log(formData); 
            //const response = await fetch('http://127.0.0.1:5000/chat', { // Adjust the URL/port based on your Flask app  
            const response = await fetch('https://sampleapp.azurewebsites.net/chat', { // Adjust the URL/port based on your Flask app      
            method: 'POST' ,
                body: formData,
                //headers: { "Content-Type": "application/json" }, 
            });  
            console.log(response);   
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }    
           
            // const result=await response.text();  
            // console.log(result);
            // setApiData(result); 
            const result = await response.text(); 
            //const parsedResult = JSON.parse(result);  
            //console.log(parsedResult); 
            console.log(result);
            //setSelectedFilesText([]);
            if (result) {  
                const botMessage = {  
                    text: result,  
                    sender: 'bot'  
                };  
                setMessages(prevMessages => [...prevMessages, botMessage]);  
            }              
            // if (result.data && result.data.message) {    
            //     const botMessage = result.data.message;    
            //     setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);    
            // }   
                // if (response.data && response.data.message) {    
                //     const botMessage = response.data.message;    
                //     setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);    
                // }    
            } catch (error) {      
                console.error('Error calling Azure OpenAI:', error);    
                alert(`Error calling Azure OpenAI: ${error.message}`);    
            } finally {      
                setLoading(false);      
            }      
        
        //setLoading(true); 
        // console.log(selectedFilesText.length);
        // if(selectedFilesText.length !== 1) {
        //     alert(`NO`);   
        // } 
        // else{
        //     alert('YES');
        // }

        //const allText = selectedFilesText.join(' ') + ' ' + inputText;
        // const trimmedInputText = typeof inputText === "string" ? inputText.trim() : "";
        // const userMessage = {      
        //     text: trimmedInputText,      
        //     sender: 'user',      
        // };      
        
        // if (trimmedInputText !== "") {      
        //     setMessages(prevMessages => [...prevMessages, userMessage]);      
        // }      
        
        // setInputText(''); // Clear input text      
        // setSelectedFilesText([]);
        // try {     
        //     const response = await axios.post(    
        //         'http://127.0.0.1:5000/chat', // URL of the Flask API    
        //         { inputText: trimmedInputText},    
        //         { headers: { "Content-Type": "application/json" } }    
        //     );    
        
        //     if (response.data && response.data.message) {    
        //         const botMessage = response.data.message;    
        //         setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);    
        //     }    
        // } catch (error) {      
        //     console.error('Error calling Azure OpenAI:', error);    
        //     alert(`Error calling Azure OpenAI: ${error.message}`);    
        // } finally {      
        //     setLoading(false);      
        // }      
    };      
      
    /*const handleSendMessage = async () => {    
        setLoading(true);    
       
        const userMessage = {    
            text: inputText,    
            sender: 'user',    
        };    
        
        if (inputText.trim() !== "") {    
            setMessages(prevMessages => [...prevMessages, userMessage]);    
        }    
        
        setInputText(''); // Clear input text    
        
        try {   
               
            const azureOpenAIEndpoint = "https://bosonopenai.openai.azure.com/";    
            const apiKey = "5a8ad82e5db04ec293b62db643a518f2";    
            const prompt = inputText;    
              
            const response = await axios.post(    
                `${azureOpenAIEndpoint}`,    
                {    
                    model:"Sampleapp",  
                    prompt: prompt,    
                    temperature: 0.7,    
                    max_tokens: 150,    
                    top_p: 1.0,    
                    frequency_penalty: 0.0,    
                    presence_penalty: 0.0,    
                },    
                {    
                    headers: {    
                        "Content-Type": "application/json",    
                        "Authorization": `Bearer ${apiKey}`    
                    }    
                }   
                  
            );   
              
        
            console.log('Azure OpenAI response:', response.data);    
        
            // Assuming the response contains the text in response.data.choices[0].text    
            if (response.data && response.data.choices && response.data.choices.length > 0) {    
                const botMessage = response.data.choices[0].text;    
                setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);    
            }    
        } catch (error) {    
            //alert('Error calling Azure OpenAI:', error);    
            alert(`Error calling Azure OpenAI: ${error.message}`);  
        } finally {    
            setLoading(false);    
        }    
    };*/    
      
  
  
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
  const handleSendMessage1 = async () => {  
        // Example usage of selectedFilesText, checking if it exists  
        if (selectedFilesText) {  
            // If selectedFilesText is defined, you might want to do something with it  
            console.log("Selected file for the chat:", selectedFilesText.name);  
  
            // Here you can implement the logic to use the file's content or data  
            // For example, sending its name or content to an API, or processing it in some way  
  
        } else {  
            // Handle the case where no file has been selected  
            console.log("No file selected for the chat.");  
        }  
    };
  
    return (  
        <div className={Styles.container}>  
            <div className={Styles.messageContainer}>  
                {messages?.map((message, index) => (   
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
                                            {/* <img src={regenerateIcon} alt="regenerate" onClick={handleRegenerate} className={Styles.regenerate} data-toggle="tooltip"  title='Try again'/>   */}
                                            <img src={Copy} alt="copy" onClick={() => handleCopy(index)} className={Styles.copy} data-toggle="tooltip"  title='Copy Text'/>  
                                            {/* <img src={likeIcon} alt="like" onClick={handleLike} className={Styles.like} data-toggle="tooltip"  title='Helpful'/>  
                                            <img src={dislikeIcon} alt="dislike" onClick={handleDislike} className={Styles.dislike} data-toggle="tooltip"  title='Not Helpful'/>   */}
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
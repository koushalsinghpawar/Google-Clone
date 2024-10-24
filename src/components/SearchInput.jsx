// import { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import { IoMdClose } from "react-icons/io";
// import { useNavigate, useParams } from "react-router-dom";

// import MicIcon from "../assets/mic.svg";
// import ImageIcon from "../assets/image.svg";

// const SearchInput = () => {
//     const  { query } = useParams();
//     const [searchQuery, setSearchQuery] = useState(query || "")
//     const navigate = useNavigate();
//     // OnKeyUp Method
//     const searchQueryHandler = (event) =>{
//       if(event.key === "Enter" && searchQuery.length > 0){
//         navigate(`/${searchQuery}/${1}`)
//       }
//     }
//   return (
//     <div
//       id="searchBox"
//       className="h-[46px] w-full md:w-[584px] flex items-center gap-3 px-4 border-[#dfe1e5] rounded-3xl hover:bg-white hover:shadow-c hover:border-0 focus-within:shadow-c focus-within:border-0"
//     >
//       <AiOutlineSearch size={18} color="#9aa0a6" />
//       <input
//         type="text"
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyUp={searchQueryHandler}
//         value={searchQuery}
//         autoFocus
//         className="grow outline-0 text-black/[0.87]"
//       />
//       <div className="flex items-center gap-3">
//         {
//             searchQuery  && (
//                 <IoMdClose size={24} color="#70757a" className="cursor-pointer" onClick={() => setSearchQuery("")} />
//             )
//         }
//         <img className="h-6 w-6 cursor-pointer" src={MicIcon}  alt="" />
//         <img className="h-6 w-6 cursor-pointer" src={ImageIcon} alt="" />
//       </div>
//     </div>
//   );
// };

// export default SearchInput;
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import MicIcon from "../assets/mic.svg";
import ImageIcon from "../assets/image.svg";

const SearchInput = () => {
    const { query: urlQuery } = useParams(); // Get the query parameter from the URL
    const [searchQuery, setSearchQuery] = useState(urlQuery || ""); // Initialize searchQuery with the query parameter
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        setSearchQuery(urlQuery || ""); // Update searchQuery when the query parameter changes
        if (inputRef.current) {
            inputRef.current.focus(); // Ensure focus on input field
        }
    }, [urlQuery]);

    useEffect(() => {
        // Update searchQuery with transcript when speech stops and transcript has content
        if (!listening && transcript) {
            setSearchQuery(transcript);
        }
    }, [transcript, listening]);

    const handleMicClick = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: false });
        }
    };

    const searchQueryHandler = (event) => {
        const { value } = event.target;
        setSearchQuery(value); // Update searchQuery on user typing
        if (event.key === "Enter" && value.length > 0) {
            navigate(`/${value}/${1}`); // Navigate to search results with the searched query
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div
            id="searchBox"
            className="h-[46px] w-full md:w-[584px] flex items-center gap-3 px-4 border-[#dfe1e5] rounded-3xl hover:bg-white hover:shadow-c hover:border-0 focus-within:shadow-c focus-within:border-0"
        >
            <AiOutlineSearch size={18} color="#9aa0a6" />
            <input
                type="text"
                ref={inputRef}
                onChange={searchQueryHandler}
                onKeyUp={searchQueryHandler}
                value={searchQuery}
                autoFocus
                className="grow outline-0 text-black/[0.87]"
            />
            <div className="flex items-center gap-3">
                {searchQuery && (
                    <IoMdClose size={24} color="#70757a" className="cursor-pointer" onClick={() => setSearchQuery("")} />
                )}
                <img className="h-6 w-6 cursor-pointer" src={MicIcon} onClick={handleMicClick} alt="Microphone" />
                <img className="h-6 w-6 cursor-pointer" src={ImageIcon} alt="Image" />
            </div>
        </div>
    );
};

export default SearchInput;

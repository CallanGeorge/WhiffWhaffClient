import css from "./Modal.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Modal = () => {
  const [isOpen, setOpen] = useState(false);
  const [question, setQuestion] = useState<string>();
  const [response, setResponse] = useState<string>();
  const [conversation, setConversation] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [conversation, isOpen]);

  const handleOpen = () => {
    isOpen === false ? setOpen(true) : setOpen(false);
  };

  const emailCheck = (question: string) => {
    const emailRegex = /[\w.-]+@[\w.-]+\.[\w.-]+/;
    let extractedEmail = question.match(emailRegex);
    if (extractedEmail) {
      setResponse("Thank you for providing your email!");
      setUserEmail(extractedEmail[0]);
      return extractedEmail;
    }

    return null;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsDisabled(true);

    //@ts-ignore
    setConversation((prevConversation) => [...prevConversation, question]);

    //@ts-ignore
    let email = emailCheck(question);

    axios
      .post(
        // "https://wqwofk2jyb.execute-api.eu-north-1.amazonaws.com/default/WhiffWhaffAnswer",
        "http://127.0.0.1:5000/api/answer",
        {
          question: question,
          email: email,
          conversation: [...conversation, question],
        }
      )
      .then((res) => {
        setResponse(res.data.answer);
        //@ts-ignore
        setConversation((prevConversation) => [
          ...prevConversation,
          res.data.answer,
        ]);
        setQuestion("");
        setIsDisabled(false);
      });
  };

  if (!isOpen) {
    return ReactDOM.createPortal(
      <button className={css.modalContainer} onClick={handleOpen}>
        <p className={css.text}>
          Hi! Any Questions about Whiffwhaff? Click Me!
        </p>
        <div className={css.botIcon}>
          <span>🏓</span>
        </div>
      </button>,
      //@ts-ignore
      document.getElementById("modal")
    );
  } else
    return ReactDOM.createPortal(
      <div className={css.openModal}>
        <div className={css.modalHead}>
          WhiffWhaff Bot <button onClick={handleOpen}>X</button>
        </div>
        <div className={css.modalBody} ref={scrollContainerRef}>
          {conversation ? (
            conversation?.map((msg: string, i: number) => (
              <div key={i} className={i % 2 === 0 ? css.user : css.bot}>
                <h5>{i % 2 === 0 ? "You" : "WhiffWhaff Bot"}</h5>
                <p>{msg}</p>
              </div>
            ))
          ) : (
            <p>This is the start of your conversation!</p>
          )}
          {isDisabled && <span className={css.loader}></span>}
        </div>
        <div className={css.modalInput}>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/*//@ts-ignore */}
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit" disabled={isDisabled}>
              SEND
            </button>
          </form>
        </div>
      </div>,
      //@ts-ignore
      document.getElementById("modal")
    );
};

export default Modal;

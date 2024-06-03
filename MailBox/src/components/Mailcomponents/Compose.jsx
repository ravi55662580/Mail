import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { sendRequestToMail } from '../../Store/Mail-Slice/mail-slice';
import { LoaderActions } from '../../Store/UI-Slice/loader-slice';

const Compose = () => {
    const [show, setShow] = useState(false);
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const senderMail = localStorage.getItem('email');
    const dispatch = useDispatch();
    const emailRef = useRef();
    const subjectRef = useRef();

    const closeModalPortal = () => {
        setShow(false);
        dispatch(LoaderActions.openPortal());
    };

    const sendEmailHandler = (e) => {
        e.preventDefault();
        const toMailId = emailRef.current.value;
        const subject = subjectRef.current.value;
        const messageState = body;
        
        const messageData = {
            to: toMailId,
            subject: subject,
            message: messageState,
            senderEmail: senderMail,
            timestamp: Date.now()
        };
        console.log(messageData)

        dispatch(sendRequestToMail(messageData));
        closeModalPortal();
    };

    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setShow(true)}>
                Compose
            </button>
            {show && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Compose Email</h2>
                        <form onSubmit={sendEmailHandler}>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Recipient"
                                    ref={emailRef}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    ref={subjectRef}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <textarea
                                    placeholder="Body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                                    rows="6"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Compose;

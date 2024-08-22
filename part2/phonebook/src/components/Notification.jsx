const Notification = ({message, errorMessage}) =>{
    if(message === null && errorMessage === null){
        return null;
    }


    return(
    <div className={message ? 'notification' : 'error'}>
        {message || errorMessage}
    </div>
    );
};

export default Notification;
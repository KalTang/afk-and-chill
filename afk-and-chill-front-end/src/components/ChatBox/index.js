import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    CardHeader,
    Card,
    CardContent,
    CircularProgress,
} from '@material-ui/core';
import ChatDrawer from './ChatDrawer';
import MessageForm from './MessageForm';
import UserMessage from './UserMessage';
import ChillerItem from './ChillerItem';
import { getMsges } from '../../network';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Vazir, sans-serif ',
    },
    AFKChat: {
        display: 'flex',
        margin: 30,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    chatBox: {
        width: '60%',
        height: 650,
        display: 'flex',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 0,
        },
    },
    avatar: {
        margin: '3%',
    },
    title: {
        fontFamily: 'Josefin Sans, cursive',
    },
    chatHeader: {
        background: '#F8F8F8',
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        width: '100%',
    },
    messageForm: {
        margin: 20,
    },
    message: {
        margin: '10px 0',
    },
    fullList: {
        width: 'auto',
    },
}));

export default function ChatBox({ onClickChatItem, chatboxes, cognitoId }) {
    const classes = useStyles();
    const [chatboxId, setChatboxId] = useState('');
    const [messages, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [matchedChiller, setMatchedChiller] = useState({});
    const [rerender, setRerender] = useState(false);

    // CDU get messages
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                if (chatboxId) {
                    const messageResult = await getMsges({
                        chatboxId: chatboxId,
                    });
                    setMessage(messageResult.messages);
                }
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [chatboxId, rerender]);

    //----------------------------Submit Message---------------------------------------//
    const onChatItem = (chatItem) => {
        console.log(chatItem.user_one.cognito_id);
        // Check user_one or user_two is the matched chiller
        if (chatItem.user_one.cognito_id === cognitoId) {
            setMatchedChiller(chatItem.user_two);
        } else {
            setMatchedChiller(chatItem.user_one);
        }
        setChatboxId(chatItem._id);
        // onClickChatItem(chatItem._id);
    };

    return (
        <div>
            <ChatDrawer
                cognitoId={cognitoId}
                chatboxes={chatboxes}
                onChatItem={onChatItem}
            />
            <section className={classes.AFKChat}>
                <ChillerItem
                    cognitoId={cognitoId}
                    chatboxes={chatboxes}
                    onChatItem={onChatItem}
                />
                {/*----------------------------chat header-----------------------*/}
                <Card className={classes.chatBox}>
                    <div className={classes.chat}>
                        <div className={classes.chatHeader}>
                            <CardHeader
                                classes={{
                                    title: classes.title,
                                }}
                                avatar={
                                    <Avatar
                                        alt="userIcon"
                                        src={matchedChiller.photo_url}
                                        className={classes.avatar}
                                    />
                                }
                                titleTypographyProps={{
                                    variant: 'h6',
                                    color: 'white',
                                }}
                                title={matchedChiller.name}
                            />
                        </div>
                        {/*----------------------------message box---------------------------------------*/}
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <div style={{ overflow: 'auto' }}>
                                <CardContent className={classes.message}>
                                    {messages.map((message) => (
                                        <UserMessage
                                            key={message._id}
                                            className={classes.message}
                                            message={message}
                                            cognitoId={cognitoId}
                                        ></UserMessage>
                                    ))}
                                </CardContent>
                            </div>
                        )}
                        <div className={classes.messageForm}>
                            <MessageForm
                                setRerender={setRerender}
                                chatboxId={chatboxId}
                            ></MessageForm>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}

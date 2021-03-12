import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    CardHeader,
    Card,
    CardActions,
    CardContent,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import MessageForm from '../MessageForm';
import UserMessage from '../UserMessage';

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        margin: 30,
    },
    chatBox: {
        // maxWidth: 1200,
        width: '50%',
        height: 650,
        display: 'flex',
        margin: 10,
        // marginBottom: 20,
        // marginTop: 20,
    },
    chillerItem: {
        width: '50%',
        margin: 10,
    },
    otherData: {
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
        // margin: '0 10px',
        width: '100%',
    },
    messageForm: {
        margin: 20,
    },
    message: {
        margin: '10px 0',
    },
    messages: {
        overflowY: 'scroll',
    },
});

export default function ChatBox({ message, submitMessage }) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sx'));

    const onMessage = (data) => {
        submitMessage({ chatId: message._id, text: data.message });
    };

    return (
        <section className={classes.wrapper}>
            <div className={classes.chillerItem}>
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {message.chiller[0]}
                            </Avatar>
                        }
                        title={message.chiller}
                    />
                </Card>
            </div>
            <Card className={classes.chatBox}>
                <div className={classes.otherData}>
                    <CardHeader
                        avatar={
                            <Avatar className={classes.avatar}>
                                {message.username[0]}
                            </Avatar>
                        }
                        title={message.username}
                    />
                    <CardContent className={classes.message}>
                        {message.messages.map((message) => (
                            <UserMessage
                                key={message._id}
                                className={classes.message}
                                message={message}
                            ></UserMessage>
                        ))}
                    </CardContent>
                    <div className={classes.messageForm}>
                        <CardActions></CardActions>
                        <MessageForm onSubmit={onMessage}></MessageForm>
                    </div>
                </div>
            </Card>
        </section>
    );
}

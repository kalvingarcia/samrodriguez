import React from 'react';
import {tss} from '../components/common/theme';
import Form from "../components/common/form";
import TextField from "../components/common/text-field";
import TextArea from "../components/common/text-area";
import Button from '../components/common/button';
import {Body, Subtitle, Title} from '../components/common/typography';

const useStyles = tss.create(({theme}) => ({
    section: {
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
    },
    content: {
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        gap: "20px",

        "@media (max-width: 1080px)": {
            flexDirection: "column",
            gap: "20px"
        }
    },
    left: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        maxWidth: "500px"
    },
    form: {
        margin: "auto",
        padding: "20px",
        width: "100%",
        maxWidth: "500px",
        height: "fit-content",
        backgroundColor: theme.neutral.container.hex(),
        borderRadius: "20px 0px",

        "& .submit": {
            alignSelf: "flex-end"
        }
    }
}));

export default function Contact({}) {
    const validate = async event => {
        event.preventDefault();

        const userIP = await fetch("https://ipinfo.io/json") 
                .then(response => response.json())
                .then(response => response.ip)
                .catch(() => undefined);

        const form = document.getElementById("contact-form");
        const data = new FormData(form);
        const spamCheck = await fetch(`http://api.stopforumspam.org/api?ip=${userIP?? ""}&email=${data.get("Email")}&json`, {method: "GET"})
            .then(response => response.json());

        if(!(spamCheck.email.appears || spamCheck.ip.appears) && !spamCheck.email.error)
            fetch("https://script.google.com/macros/s/AKfycbwbQkVagBCDvywt_KQrXJyEQX9QkPwnYTF1IV9chdv_m5gBrlWFCc8dIhfYiJzfJnMi7Q/exec", {
                method: "POST",
                body: data
            });

        window.location.reload();
    };

    const {classes} = useStyles({});
    return (
        <section id="contact" className={classes.section}>
            <Title>contact me!</Title>
            <div className={classes.content}>
                <div className={classes.left}>
                    <Subtitle>any inquiries!</Subtitle>
                    <Body>send any inquiries about my availablility or my projects to contact@samrodriguez.co.</Body>
                </div>
                <div className={classes.form}>
                    <Form id="contact-form">
                        <TextField label="name" placeholder="john doe" required />
                        <TextField label="email" placeholder="sample@email.com" required />
                        <TextField label="phone (optional)" placeholder="123-456-7890" />
                        <TextArea  label="message" placeholder="write your message here!" required />
                        <Button className="submit" icon="send" onClick={validate}>submit</Button>
                    </Form>
                </div>
            </div>
        </section>
    );
}
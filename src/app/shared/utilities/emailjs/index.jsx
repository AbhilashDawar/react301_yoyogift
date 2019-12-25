const template = (receiver, sender, message, link) => {
    return `
    <div style="
            border-radius: 20px 20px 0px 0px;
            background: rgb(2,0,36);
            background: radial-gradient(circle, rgba(2,0,36,1) 12%, rgba(0,104,255,1) 35%, rgba(63,79,182,1) 51%);
            padding: 40px 50px;
            font-family: sans-serif"
    >
        <div style="max-width:700px;margin:auto">
            <div style="background:#f6fbf3;padding:15px 30px 25px 30px;border-radius:5px">
                <div style="text-align:center;margin:20px 0 40px; font-size: 45px">
                    <span style="font-weight: bold; color: #4c64ea">YoYo<span style="color: #cc9511">Gift</span></span>
                </div>
                <p>Hello <span style="color: #333333">${receiver.name}</span>,</p>
                <p>Your friend, <span style="color: #333333">${sender.name}</span>, gifted you a coupon. Please press the following link to view and redeem.<br></p>
                <a href="#">${link}</a>
                <p>A message from <span style="color: #333333">${sender.name}</span></p>
                <div style="
                        border: solid 2px black;
                        text-align: center;
                        align-items: center;
                        min-width: 250px;
                        min-height: 50px;
                        display: grid;
                        word-break: break-word;
                        padding: inherit;"
                >
                        <span style="color: #cc9511">${message}</span>
                </div>
                <p style="margin-top:40px">Best regards,<br>
                <span style="font-size: 20px; color: #4c64ea">YoYo<span style="color: #cc9511">Gift</span></span></p>
            </div>
        </div>
    </div>
    <div style="background:rgb(17, 10, 10);font-size:12px;padding:30px 10px 30px 10px;border-radius: 0px 0px 20px 20px;">
        <div style="max-width:600px;margin:auto;text-align:center">
            <hr style="border:1px solid #757575">
            <p style="font-style:italic;color:#cc9511">Copyright © 2019 YoYoGift, All rights reserved.</p>
            <hr style="border:1px solid #757575">
        </div>
    </div>
    `;
}

const sendEmail = (receiver, sender, message, link) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const templateParams = {
        recieverEmail: receiver.email,
        sender: sender.email,
        html: template(receiver, sender, message, link)
    };

    const payload = {
        service_id: 'yoyogift',
        template_id: 'template_TGCkRBEP',
        user_id: 'user_HEtZGCiRzuLTZnB6NcN75',
        template_params: templateParams
    }

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: 'POST', body: JSON.stringify(payload), headers: myHeaders
    }).then((response) => {
        console.log(response)
        alert('Your gift is sent successfully!');
    }).catch((error) => {
        console.log(error)
        alert('Sorry! We are unable to process your request at the moment. Please try later.');
    })
}

export default sendEmail;

const submitButton = document.getElementById('signup-btn')
const userName = document.getElementById('userName');
const userPassword = document.getElementById('userPassword');
const confirmUserPassword = document.getElementById('confirmUserPassword');
const userEmail = document.getElementById('userEmail');

//Send POST to API to add gas report
async function signup(e)
{
    e.preventDefault();

    if(userName.value =='' || userPassword.value ==''|| userEmail == '')
    {
        alert('Please fill in fields');
    }
    else if (userPassword.value != confirmUserPassword.value){
        alert('Your passwords do not match! type in correct passwords')
    }
    else if (userPassword.value.length < 7){
        alert('Your password length must be longer than 7 or more character')
    }
    else
    {
        const sendBody = {
            name : userName.value,
            email : userEmail.value,
            password: userPassword.value
        }
    
        try {
            const res = await fetch('/users/signup', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'
               } ,
               body: JSON.stringify(sendBody)
            });
    
            if(res.status === 400){
                throw Error('Something went wrong! Please try again! ')
            }

            alert('You have successfully signed up!');
            window.location.href = '/index.html';

    
        } catch (err) {
            alert(err);
            return;
        }
    }


}

submitButton.addEventListener('click', signup);